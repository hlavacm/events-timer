import { expect, test } from '@playwright/test'

test.describe('Events Timer', () => {
  test('loads with default countdown', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('countdown-display')).toHaveText('00:30:00')
  })

  test('start and pause change the countdown', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('start-button').click()
    await page.waitForTimeout(1100)
    const runningText = await page.getByTestId('countdown-display').textContent()
    expect(runningText).not.toBe('00:30:00')

    await page.getByTestId('pause-button').click()
    const pausedValue = await page.getByTestId('countdown-display').textContent()
    await page.waitForTimeout(1100)
    await expect(page.getByTestId('countdown-display')).toHaveText(pausedValue ?? '')
  })

  test('reset restores configured countdown after confirmation', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('start-button').click()
    await page.waitForTimeout(1100)
    await page.getByTestId('reset-button').click()
    await page.getByRole('button', { name: 'OK' }).click()
    await expect(page.getByTestId('countdown-display')).toHaveText('00:30:00')
  })

  test('space toggles start and pause when modals are closed', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Space')
    await page.waitForTimeout(1100)
    const runningText = await page.getByTestId('countdown-display').textContent()
    expect(runningText).not.toBe('00:30:00')

    await page.keyboard.press('Space')
    const pausedValue = await page.getByTestId('countdown-display').textContent()
    await page.waitForTimeout(1100)
    await expect(page.getByTestId('countdown-display')).toHaveText(pausedValue ?? '')
  })

  test('escape resets while running', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('start-button').click()
    await page.waitForTimeout(500)
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: 'OK' }).click()
    await expect(page.getByTestId('countdown-display')).toHaveText('00:30:00')
  })

  test('quick settings can set five minutes', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('settings-button').click()
    await page.getByRole('button', { name: 'Quick' }).click()
    await page.getByTestId('quick-time-5').click()
    await page.getByRole('button', { name: 'OK' }).click()
    await expect(page.getByTestId('countdown-display')).toHaveText('00:05:00')
  })

  test('quick settings can set one hour', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('settings-button').click()
    await page.getByRole('button', { name: 'Quick' }).click()
    await page.getByTestId('quick-time-60').click()
    await page.getByRole('button', { name: 'OK' }).click()
    await expect(page.getByTestId('countdown-display')).toHaveText('01:00:00')
  })

  test('settings modal uses dark surface in dark color scheme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await page.getByTestId('settings-button').click()
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()
    const bg = await dialog.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).not.toBe('rgb(255, 255, 255)')
  })

  test('font size buttons respect limits', async ({ page }) => {
    await page.goto('/')
    const initialFontSize = await page.getByTestId('countdown-display').evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize)
    )

    await page.getByTestId('font-zoom-in').click()
    const increased = await page.getByTestId('countdown-display').evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize)
    )
    expect(increased).toBeGreaterThan(initialFontSize)

    while (!(await page.getByTestId('font-zoom-in').isDisabled())) {
      await page.getByTestId('font-zoom-in').click()
    }
    await expect(page.getByTestId('font-zoom-in')).toBeDisabled()
    await expect(page.getByTestId('font-zoom-out')).toBeEnabled()
  })
})

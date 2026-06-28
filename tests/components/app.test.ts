import { flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App.vue'
import { useConfirm } from '@/composables/useConfirm'
import { resetTimerStoreForTests, useTimerStore } from '@/stores/timer'
import { mountAttached } from '../helpers/mount'
import { setupPinia } from '../helpers/pinia'

describe('App', () => {
  beforeEach(() => {
    resetTimerStoreForTests()
    setupPinia()
    const { answer } = useConfirm()
    answer(false)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('toggles the timer when the main area is clicked', async () => {
    const wrapper = mountAttached(App)
    const timerStore = useTimerStore()

    await wrapper.get('#app-content').trigger('click')
    expect(timerStore.status).toBe('running')

    await wrapper.get('#app-content').trigger('click')
    expect(timerStore.status).toBe('paused')

    wrapper.unmount()
  })

  it('opens settings and closes the modal', async () => {
    const wrapper = mountAttached(App)

    await wrapper.get('[data-testid="settings-button"]').trigger('click')
    await flushPromises()
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()

    document.body.querySelector('[aria-label="Close"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flushPromises()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()

    wrapper.unmount()
  })

  it('does not reset when escape closes an open settings modal', async () => {
    const wrapper = mountAttached(App)
    const timerStore = useTimerStore()
    const onReset = vi.fn()
    window.addEventListener('timer:reset-request', onReset)

    timerStore.start()
    await wrapper.get('[data-testid="settings-button"]').trigger('click')
    await flushPromises()

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }))
    await flushPromises()

    expect(onReset).not.toHaveBeenCalled()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()

    window.removeEventListener('timer:reset-request', onReset)
    wrapper.unmount()
  })

  it('opens credits and closes with footer button', async () => {
    const wrapper = mountAttached(App)

    await wrapper.get('[data-testid="credits-button"]').trigger('click')
    await flushPromises()
    expect(document.body.textContent).toContain('Credits 3.1.0')

    const okButton = [...document.body.querySelectorAll('button')].find(
      (button) => button.textContent === 'OK'
    )
    okButton?.click()
    await flushPromises()
    expect(document.body.textContent).not.toContain('Credits 3.1.0')

    wrapper.unmount()
  })
})

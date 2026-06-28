import { spawn } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(root, 'public/static/screenshot.png')
const baseURL = 'http://127.0.0.1:4173'

async function waitForServer (preview, getStderr, timeoutMs = 30_000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    if (preview.exitCode !== null) {
      throw new Error(`Preview server exited early:\n${getStderr()}`)
    }

    try {
      const response = await fetch(baseURL)
      if (response.ok) {
        return
      }
    } catch {
      // Preview server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`Preview server did not start at ${baseURL}:\n${getStderr()}`)
}

function startPreviewServer () {
  return spawn(
    'npm',
    ['run', 'preview', '--', '--port', '4173', '--host', '127.0.0.1'],
    {
      cwd: root,
      stdio: ['ignore', 'ignore', 'pipe']
    }
  )
}

const preview = startPreviewServer()
let previewStderr = ''
preview.stderr?.on('data', (chunk) => {
  previewStderr += chunk.toString()
})

try {
  await waitForServer(preview, () => previewStderr.trim())

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2
  })

  await page.goto(baseURL)
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  await page.getByTestId('settings-button').click()
  await page.getByRole('button', { name: 'Quick' }).click()
  await page.getByTestId('quick-time-25').click()
  await page.getByRole('button', { name: 'OK' }).click()
  await page.getByTestId('start-button').click()
  await page.waitForTimeout(1100)

  await page.screenshot({
    path: outputPath,
    type: 'png'
  })

  await browser.close()
  console.log(`Saved screenshot to ${outputPath}`)
} finally {
  preview.kill('SIGTERM')
}

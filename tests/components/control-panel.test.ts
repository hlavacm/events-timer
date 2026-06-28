import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import { useConfirm } from '@/composables/useConfirm'
import { resetTimerStoreForTests, useTimerStore } from '@/stores/timer'
import { setupPinia } from '../helpers/pinia'

describe('ControlPanel', () => {
  beforeEach(() => {
    resetTimerStoreForTests()
    setupPinia()
    const { answer } = useConfirm()
    answer(false)
  })

  it('starts, pauses, and opens modals', async () => {
    const timerStore = useTimerStore()
    const wrapper = mount(ControlPanel)

    await wrapper.get('[data-testid="start-button"]').trigger('click')
    expect(timerStore.status).toBe('running')

    await wrapper.get('[data-testid="pause-button"]').trigger('click')
    expect(timerStore.status).toBe('paused')

    await wrapper.get('[data-testid="settings-button"]').trigger('click')
    await wrapper.get('[data-testid="credits-button"]').trigger('click')
    expect(wrapper.emitted('openSettings')).toHaveLength(1)
    expect(wrapper.emitted('openCredits')).toHaveLength(1)

    wrapper.unmount()
  })

  it('stays paused when reset is cancelled', async () => {
    const timerStore = useTimerStore()
    const wrapper = mount(ControlPanel, {
      global: {
        stubs: { Teleport: true }
      },
      attachTo: document.body
    })
    mount(ConfirmDialog, { attachTo: document.body })

    timerStore.start()
    timerStore.pause()
    await wrapper.get('[data-testid="reset-button"]').trigger('click')
    await flushPromises()
    document.body.querySelector('button.text-slate-700')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flushPromises()

    expect(timerStore.status).toBe('paused')
    wrapper.unmount()
  })

  it('resumes when reset is cancelled', async () => {
    const timerStore = useTimerStore()
    const wrapper = mount(ControlPanel, {
      global: {
        stubs: { Teleport: true }
      },
      attachTo: document.body
    })
    mount(ConfirmDialog, { attachTo: document.body })

    timerStore.start()
    await wrapper.get('[data-testid="reset-button"]').trigger('click')
    await flushPromises()
    document.body.querySelector('button.text-slate-700')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flushPromises()

    expect(timerStore.status).toBe('running')
    wrapper.unmount()
  })

  it('handles escape reset requests', async () => {
    const timerStore = useTimerStore()
    const wrapper = mount(ControlPanel, {
      global: {
        stubs: { Teleport: true }
      },
      attachTo: document.body
    })
    mount(ConfirmDialog, { attachTo: document.body })

    timerStore.start()
    window.dispatchEvent(new Event('timer:reset-request'))
    await flushPromises()
    document.body.querySelector('button.bg-red-600')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flushPromises()

    expect(timerStore.status).toBe('idle')
    wrapper.unmount()
  })

  it('toggles the mobile menu container classes', async () => {
    const wrapper = mount(ControlPanel)
    const controls = wrapper.find('[data-testid="start-button"]').element.parentElement

    expect(controls?.className).toContain('hidden')

    await wrapper.get('[aria-label="Toggle menu"]').trigger('click')
    expect(controls?.className).toContain('flex')

    wrapper.unmount()
  })
})

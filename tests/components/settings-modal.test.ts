import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import TimeInput from '@/components/ui/TimeInput.vue'
import { useConfirm } from '@/composables/useConfirm'
import { useSettingsStore } from '@/stores/settings'
import { resetTimerStoreForTests, useTimerStore } from '@/stores/timer'
import { mountAttached } from '../helpers/mount'
import { setupPinia } from '../helpers/pinia'

describe('SettingsModal', () => {
  beforeEach(() => {
    resetTimerStoreForTests()
    setupPinia()
    const { answer } = useConfirm()
    answer(false)
  })

  function mountModal (open = true) {
    return mountAttached(SettingsModal, {
      props: { open }
    })
  }

  async function clickTab (label: string) {
    const tab = [...document.body.querySelectorAll('button')].find(
      (button) => button.textContent === label
    )
    tab?.click()
    await flushPromises()
  }

  it('renders all quick time presets', async () => {
    const wrapper = mountModal()
    await clickTab('Quick')

    const quickButtons = document.body.querySelectorAll('[data-testid^="quick-time-"]')
    expect(quickButtons).toHaveLength(14)

    wrapper.unmount()
  })

  it('recalculates warning and pulse times when countdown changes', async () => {
    const wrapper = mountModal()
    await clickTab('Custom')

    const countdown = wrapper.findAllComponents(TimeInput)[0]
    await countdown.find('input').setValue('01:00:00')
    await countdown.find('input').trigger('input')

    const timeInputs = wrapper.findAllComponents(TimeInput)
    expect(timeInputs[1]?.props('modelValue')).toBe('00:06:00')
    expect(timeInputs[2]?.props('modelValue')).toBe('00:03:00')

    wrapper.unmount()
  })

  it('syncs values from the store when reopened', async () => {
    const settingsStore = useSettingsStore()
    settingsStore.$patch({ baseSeconds: 600, lastSettingsTabIndex: 2 })

    const wrapper = mountAttached(SettingsModal, { props: { open: false } })
    await wrapper.setProps({ open: true })
    await flushPromises()

    expect(document.body.textContent).toContain('Visual Notification')
    const fontSizeInput = document.body.querySelector('input[type="number"]') as HTMLInputElement
    expect(fontSizeInput.value).toBe('25')

    wrapper.unmount()
  })

  it('applies settings after confirmation', async () => {
    const timerStore = useTimerStore()
    const wrapper = mountModal()
    mount(ConfirmDialog, {
      global: { stubs: { Teleport: true } },
      attachTo: document.body
    })

    const applyButton = [...document.body.querySelectorAll('button')].find(
      (button) => button.textContent === 'Apply'
    )
    applyButton?.click()
    await flushPromises()
    document.body.querySelector('button.bg-red-600')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flushPromises()

    expect(timerStore.countdownSeconds).toBe(useSettingsStore().baseSeconds)
    wrapper.unmount()
  })

  it('updates pulse percentage when pulse time changes', async () => {
    const wrapper = mountModal()
    await clickTab('Custom')

    const pulseInput = wrapper.findAllComponents(TimeInput)[2]
    await pulseInput?.find('input').setValue('00:03:00')
    await pulseInput?.find('input').trigger('input')
    await flushPromises()

    const percentageInputs = document.body.querySelectorAll('input[type="number"]')
    expect((percentageInputs[1] as HTMLInputElement).value).toBe('10')

    wrapper.unmount()
  })
})

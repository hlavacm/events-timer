import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Countdown from '@/components/Countdown.vue'
import { useSettingsStore } from '@/stores/settings'
import { useTimerStore } from '@/stores/timer'
import { setupPinia } from '../helpers/pinia'

describe('Countdown', () => {
  it('renders the formatted countdown with configured font size', () => {
    setupPinia()
    const settingsStore = useSettingsStore()
    settingsStore.$patch({ fontSize: 30, currentFormat: 'mm:ss' })
    const timerStore = useTimerStore()
    timerStore.$patch({ countdownSeconds: 125, pulseActive: true })

    const wrapper = mount(Countdown)

    expect(wrapper.get('[data-testid="countdown-display"]').text()).toBe('02:05')
    expect(wrapper.get('[data-testid="countdown-display"]').classes()).toContain('pulsar')
    expect(wrapper.get('[data-testid="countdown-display"]').attributes('style')).toContain('30vw')
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Stopwatch from '@/components/Stopwatch.vue'
import { useSettingsStore } from '@/stores/settings'
import { useTimerStore } from '@/stores/timer'
import { setupPinia } from '../helpers/pinia'

describe('Stopwatch', () => {
  it('shows elapsed time when enabled', () => {
    setupPinia()
    useSettingsStore().$patch({ stopwatchEnabled: true })
    useTimerStore().$patch({ stopwatchSeconds: 65 })

    const wrapper = mount(Stopwatch)

    expect(wrapper.get('[data-testid="stopwatch"]').text()).toContain('01:05')
    expect(wrapper.get('[data-testid="stopwatch"]').isVisible()).toBe(true)
  })

  it('hides elapsed time when disabled', () => {
    setupPinia()
    useSettingsStore().$patch({ stopwatchEnabled: false })

    const wrapper = mount(Stopwatch)

    expect(wrapper.get('[data-testid="stopwatch"]').isVisible()).toBe(false)
  })
})

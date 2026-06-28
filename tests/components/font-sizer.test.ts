import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FontSizer from '@/components/FontSizer.vue'
import { useSettingsStore } from '@/stores/settings'
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from '@/utils/time'
import { setupPinia } from '../helpers/pinia'

describe('FontSizer', () => {
  it('zooms font size through timer store actions', async () => {
    setupPinia()
    const settingsStore = useSettingsStore()
    settingsStore.$patch({ fontSizerEnabled: true, fontSize: 20 })

    const wrapper = mount(FontSizer)

    await wrapper.get('[data-testid="font-zoom-in"]').trigger('click')
    expect(settingsStore.fontSize).toBe(21)

    await wrapper.get('[data-testid="font-zoom-out"]').trigger('click')
    expect(settingsStore.fontSize).toBe(20)
  })

  it('disables zoom buttons at limits', async () => {
    setupPinia()
    const settingsStore = useSettingsStore()
    settingsStore.$patch({ fontSizerEnabled: true, fontSize: MAX_FONT_SIZE })

    const wrapper = mount(FontSizer)
    expect(wrapper.get('[data-testid="font-zoom-in"]').attributes('disabled')).toBeDefined()

    settingsStore.$patch({ fontSize: MIN_FONT_SIZE })
    await wrapper.vm.$nextTick()
    expect(wrapper.get('[data-testid="font-zoom-out"]').attributes('disabled')).toBeDefined()
  })
})

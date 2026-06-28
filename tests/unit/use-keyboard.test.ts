import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useKeyboard } from '@/composables/useKeyboard'
import { resetTimerStoreForTests, useTimerStore } from '@/stores/timer'
import { setupPinia } from '../helpers/pinia'

const KeyboardHarness = defineComponent({
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    useKeyboard(() => props.modalOpen)
    return () => h('div')
  }
})

describe('useKeyboard', () => {
  let wrapper: ReturnType<typeof mount> | null = null

  beforeEach(() => {
    resetTimerStoreForTests()
    setupPinia()
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it('toggles the timer on space when no modal is open', () => {
    wrapper = mount(KeyboardHarness)
    const timerStore = useTimerStore()

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }))
    expect(timerStore.status).toBe('running')

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }))
    expect(timerStore.status).toBe('paused')
  })

  it('ignores space when a modal is open', () => {
    wrapper = mount(KeyboardHarness, { props: { modalOpen: true } })
    const timerStore = useTimerStore()

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }))
    expect(timerStore.status).toBe('idle')
  })

  it('ignores escape when a modal is open', () => {
    wrapper = mount(KeyboardHarness, { props: { modalOpen: true } })
    const timerStore = useTimerStore()
    const onReset = vi.fn()
    window.addEventListener('timer:reset-request', onReset)

    timerStore.start()
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }))

    expect(onReset).not.toHaveBeenCalled()
    window.removeEventListener('timer:reset-request', onReset)
  })

  it('dispatches reset request on escape while running', () => {
    wrapper = mount(KeyboardHarness)
    const timerStore = useTimerStore()
    const onReset = vi.fn()
    window.addEventListener('timer:reset-request', onReset)

    timerStore.start()
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }))

    expect(onReset).toHaveBeenCalledTimes(1)
    window.removeEventListener('timer:reset-request', onReset)
  })
})

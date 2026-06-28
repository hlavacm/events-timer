import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppTooltip from '@/components/ui/AppTooltip.vue'

describe('AppTooltip', () => {
  it('supports top-start placement on focus', async () => {
    const wrapper = mount(AppTooltip, {
      attachTo: document.body,
      props: {
        text: 'Left aligned',
        placement: 'top-start'
      },
      slots: {
        default: '<button type="button">Trigger</button>'
      }
    })

    await wrapper.get('button').trigger('focusin')
    await flushPromises()
    await flushPromises()

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toBe('Left aligned')
    wrapper.unmount()
  })

  it('hides on focusout', async () => {
    const wrapper = mount(AppTooltip, {
      attachTo: document.body,
      props: { text: 'Temporary hint' },
      slots: {
        default: '<button type="button">Trigger</button>'
      }
    })

    await wrapper.get('button').trigger('focusin')
    await flushPromises()
    await flushPromises()
    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull()

    await wrapper.get('button').trigger('focusout')
    await flushPromises()
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull()

    wrapper.unmount()
  })
})

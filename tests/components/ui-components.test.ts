import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import AppTabs from '@/components/ui/AppTabs.vue'
import TimeInput from '@/components/ui/TimeInput.vue'
import { mountAttached } from '../helpers/mount'

describe('ui components', () => {
  it('renders AppButton variants and emits click', async () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'success', title: 'Start' },
      slots: { default: 'Go' }
    })

    expect(wrapper.text()).toBe('Go')
    expect(wrapper.attributes('title')).toBe('Start')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('switches tabs through AppTabs', async () => {
    const wrapper = mount(AppTabs, {
      props: {
        tabs: ['One', 'Two'],
        modelValue: 0
      },
      slots: {
        'tab-0': '<p>First tab</p>',
        'tab-1': '<p>Second tab</p>'
      }
    })

    expect(wrapper.text()).toContain('First tab')
    await wrapper.findAll('button')[1]?.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it('toggles AppSwitch value', async () => {
    const wrapper = mount(AppSwitch, {
      props: {
        modelValue: false,
        label: 'Warning'
      }
    })

    await wrapper.get('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('emits updates from TimeInput', async () => {
    const wrapper = mount(TimeInput, {
      props: { modelValue: '00:30:00' }
    })

    const input = wrapper.get('input')
    await input.setValue('00:25:00')
    await input.trigger('input')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['00:25:00'])
    expect(wrapper.emitted('change')?.length).toBeGreaterThan(0)
  })

  it('opens and closes AppModal', async () => {
    const wrapper = mountAttached(AppModal, {
      props: {
        open: true,
        title: 'Settings'
      },
      slots: {
        default: '<p>Body</p>',
        footer: '<button type="button">Apply</button>'
      }
    })

    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog?.className).toContain('dark:bg-slate-900')
    expect(document.body.textContent).toContain('Settings')
    document.body.querySelector('[aria-label="Close"]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }))
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])

    wrapper.unmount()
  })
})

import { flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useConfirm } from '@/composables/useConfirm'
import { mountAttached } from '../helpers/mount'

describe('ConfirmDialog', () => {
  beforeEach(() => {
    const { answer } = useConfirm()
    answer(false)
  })

  it('renders dialog content and resolves confirmation', async () => {
    const { confirm } = useConfirm()
    const wrapper = mountAttached(ConfirmDialog)
    const pending = confirm({
      title: 'Reset',
      message: 'Are you sure?',
      confirmText: 'Yes',
      cancelText: 'No',
      variant: 'danger'
    })

    await flushPromises()

    expect(document.body.textContent).toContain('Reset')
    document.body.querySelector('button.bg-red-600')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await expect(pending).resolves.toBe(true)

    wrapper.unmount()
  })

  it('resolves cancellation from the dialog', async () => {
    const { confirm } = useConfirm()
    const wrapper = mountAttached(ConfirmDialog)
    const pending = confirm({
      title: 'Apply Settings',
      message: 'Continue?'
    })

    await flushPromises()
    document.body.querySelector('button.text-slate-700')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await expect(pending).resolves.toBe(false)

    wrapper.unmount()
  })
})

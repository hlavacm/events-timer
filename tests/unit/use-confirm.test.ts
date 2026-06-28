import { describe, expect, it } from 'vitest'
import { useConfirm } from '@/composables/useConfirm'

describe('useConfirm', () => {
  it('opens a dialog and resolves true on confirm', async () => {
    const { confirm, answer, confirmState } = useConfirm()
    const pending = confirm({
      title: 'Reset',
      message: 'Are you sure?',
      confirmText: 'Yes',
      cancelText: 'No',
      variant: 'danger'
    })

    expect(confirmState.value?.title).toBe('Reset')
    expect(confirmState.value?.variant).toBe('danger')

    answer(true)
    await expect(pending).resolves.toBe(true)
    expect(confirmState.value).toBeNull()
  })

  it('resolves false on cancel', async () => {
    const { confirm, answer } = useConfirm()
    const pending = confirm({
      title: 'Apply Settings',
      message: 'Continue?'
    })

    answer(false)
    await expect(pending).resolves.toBe(false)
  })

  it('ignores answer when no dialog is open', () => {
    const { answer, confirmState } = useConfirm()
    answer(true)
    expect(confirmState.value).toBeNull()
  })
})

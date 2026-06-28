import { ref } from 'vue'

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'default'
}

interface ConfirmState extends ConfirmOptions {
  resolve: (confirmed: boolean) => void
}

const confirmState = ref<ConfirmState | null>(null)

export function useConfirm () {
  function confirm (options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      confirmState.value = {
        confirmText: 'OK',
        cancelText: 'Cancel',
        variant: 'default',
        ...options,
        resolve
      }
    })
  }

  function answer (confirmed: boolean) {
    const current = confirmState.value
    if (!current) {
      return
    }
    confirmState.value = null
    current.resolve(confirmed)
  }

  return {
    confirmState,
    confirm,
    answer
  }
}

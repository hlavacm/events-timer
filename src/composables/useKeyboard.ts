import { onMounted, onUnmounted } from 'vue'
import { useTimerStore } from '@/stores/timer'

export function useKeyboard (isShortcutBlocked: () => boolean) {
  const timerStore = useTimerStore()

  function handleKey (event: KeyboardEvent) {
    if (isShortcutBlocked()) {
      return
    }

    if (event.code === 'Space') {
      event.preventDefault()
      timerStore.toggle()
      return
    }

    if (event.code === 'Escape' && timerStore.isRunning) {
      event.preventDefault()
      window.dispatchEvent(new CustomEvent('timer:reset-request'))
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKey, { capture: true })
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey, { capture: true })
  })
}

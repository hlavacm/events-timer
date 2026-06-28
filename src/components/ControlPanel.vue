<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  Info,
  Menu,
  Pause,
  Play,
  RotateCcw,
  Settings
} from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import FontSizer from '@/components/FontSizer.vue'
import Stopwatch from '@/components/Stopwatch.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useConfirm } from '@/composables/useConfirm'
import { useTimerStore } from '@/stores/timer'

const emit = defineEmits<{
  openSettings: []
  openCredits: []
}>()

const timerStore = useTimerStore()
const { canStart, canPause, canReset } = storeToRefs(timerStore)
const { confirm } = useConfirm()
const menuOpen = ref(false)

async function handleReset () {
  const wasRunning = timerStore.isRunning
  timerStore.pause()
  const confirmed = await confirm({
    title: 'Reset',
    message:
      'Are you sure you want to reset your application? (= cancel countdown and restore default state)',
    confirmText: 'OK',
    cancelText: 'Cancel',
    variant: 'danger'
  })
  if (confirmed) {
    timerStore.completeReset()
  } else if (wasRunning) {
    timerStore.start()
  }
}

function onResetRequest () {
  void handleReset()
}

onMounted(() => {
  window.addEventListener('timer:reset-request', onResetRequest)
})

onUnmounted(() => {
  window.removeEventListener('timer:reset-request', onResetRequest)
})
</script>

<template>
  <nav class="w-full" data-testid="control-panel">
    <div class="flex items-center justify-between gap-3 py-3">
      <div class="flex min-w-0 items-center gap-3">
        <Stopwatch />
        <button
          type="button"
          class="rounded-md p-2 md:hidden"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <Menu class="h-5 w-5" />
        </button>
      </div>

      <div
        class="items-center gap-2"
        :class="menuOpen ? 'flex flex-wrap justify-end' : 'hidden md:flex'"
      >
        <FontSizer />
        <AppButton
          title="Start"
          variant="success"
          :disabled="!canStart"
          data-testid="start-button"
          @click="timerStore.start()"
        >
          <Play class="h-4 w-4" />
        </AppButton>
        <AppButton
          title="Stop"
          variant="neutral"
          :disabled="!canPause"
          data-testid="pause-button"
          @click="timerStore.pause()"
        >
          <Pause class="h-4 w-4" />
        </AppButton>
        <AppButton
          title="Reset"
          variant="neutral"
          :disabled="!canReset"
          data-testid="reset-button"
          @click="handleReset"
        >
          <RotateCcw class="h-4 w-4" />
        </AppButton>
        <span class="mx-1 hidden h-6 w-px bg-white/20 md:inline" />
        <AppButton title="Settings" variant="link" data-testid="settings-button" @click="emit('openSettings')">
          <Settings class="h-4 w-4" />
        </AppButton>
        <AppButton title="Credits" variant="info" data-testid="credits-button" @click="emit('openCredits')">
          <Info class="h-4 w-4" />
        </AppButton>
      </div>
    </div>
  </nav>
</template>

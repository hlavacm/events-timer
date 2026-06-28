<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import Countdown from '@/components/Countdown.vue'
import CreditsModal from '@/components/CreditsModal.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import { useConfirm } from '@/composables/useConfirm'
import { useKeyboard } from '@/composables/useKeyboard'
import { useTimerStore } from '@/stores/timer'
import type { VisualState } from '@/types/timer'

const timerStore = useTimerStore()
const { visualState } = storeToRefs(timerStore)

const settingsOpen = ref(false)
const creditsOpen = ref(false)
const { confirmState } = useConfirm()

const visualClasses = computed<Record<VisualState, string>>(() => ({
  idle: 'bg-slate-900 text-white',
  running: 'bg-emerald-700 text-white',
  warning: 'bg-amber-500 text-black',
  danger: 'bg-red-700 text-white',
  paused: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
}))

useKeyboard(
  () =>
    settingsOpen.value ||
    creditsOpen.value ||
    confirmState.value !== null
)

function toggleState () {
  timerStore.toggle()
}
</script>

<template>
  <div id="app" class="min-h-screen" :class="visualClasses[visualState]">
    <section class="flex min-h-screen flex-col">
      <header class="px-4">
        <ControlPanel
          @open-settings="settingsOpen = true"
          @open-credits="creditsOpen = true"
        />
      </header>
      <main
        id="app-content"
        class="flex flex-1 cursor-pointer items-center justify-center px-4"
        @click="toggleState"
      >
        <Countdown />
      </main>
    </section>

    <SettingsModal v-model:open="settingsOpen" />
    <CreditsModal v-model:open="creditsOpen" />
    <ConfirmDialog />
  </div>
</template>

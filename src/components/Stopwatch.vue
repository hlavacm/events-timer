<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { useTimerStore } from '@/stores/timer'

const timerStore = useTimerStore()
const settingsStore = useSettingsStore()
const { stopwatchTime } = storeToRefs(timerStore)
const { stopwatchEnabled } = storeToRefs(settingsStore)
</script>

<template>
  <div v-show="stopwatchEnabled" class="text-sm font-medium opacity-90" data-testid="stopwatch">
    Elapsed time: {{ stopwatchTime }}
  </div>
</template>

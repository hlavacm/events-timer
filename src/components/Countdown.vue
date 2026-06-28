<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { useTimerStore } from '@/stores/timer'

const timerStore = useTimerStore()
const settingsStore = useSettingsStore()
const { countdownTime, pulseActive } = storeToRefs(timerStore)
const { fontSize } = storeToRefs(settingsStore)
</script>

<template>
  <span
    data-testid="countdown-display"
    class="font-bold tabular-nums tracking-tight"
    :class="{ pulsar: pulseActive }"
    :style="{ fontSize: `${fontSize}vw` }"
  >
    {{ countdownTime }}
  </span>
</template>

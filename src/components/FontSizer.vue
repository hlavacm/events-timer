<script setup lang="ts">
import { computed } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import AppButton from '@/components/ui/AppButton.vue'
import { useSettingsStore } from '@/stores/settings'
import { useTimerStore } from '@/stores/timer'
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from '@/utils/time'

defineProps<{
  inverted?: boolean
}>()

const timerStore = useTimerStore()
const settingsStore = useSettingsStore()
const { fontSizerEnabled, fontSize } = storeToRefs(settingsStore)

const zoomInDisabled = computed(() => fontSize.value >= MAX_FONT_SIZE)
const zoomOutDisabled = computed(() => fontSize.value <= MIN_FONT_SIZE)
</script>

<template>
  <div
    v-show="fontSizerEnabled"
    class="hidden items-center gap-2 md:flex"
    data-testid="font-sizer"
  >
    <AppButton
      title="Increase font size"
      variant="neutral"
      :disabled="zoomInDisabled"
      data-testid="font-zoom-in"
      @click="timerStore.zoomIn()"
    >
      <Plus class="h-4 w-4" />
    </AppButton>
    <AppButton
      title="Decrease font size"
      variant="neutral"
      :disabled="zoomOutDisabled"
      data-testid="font-zoom-out"
      @click="timerStore.zoomOut()"
    >
      <Minus class="h-4 w-4" />
    </AppButton>
  </div>
</template>

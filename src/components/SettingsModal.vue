<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import AppTabs from '@/components/ui/AppTabs.vue'
import AppTooltip from '@/components/ui/AppTooltip.vue'
import TimeInput from '@/components/ui/TimeInput.vue'
import { useConfirm } from '@/composables/useConfirm'
import { useSettingsStore } from '@/stores/settings'
import { useTimerStore } from '@/stores/timer'
import type { TimerSettings } from '@/types/timer'
import {
  clampNumber,
  getMaxSecondsForFormat,
  LONG_TIME_FORMAT,
  normalizeTimeInput,
  parseTimeInput,
  percentageToSeconds,
  secondsToPercentage,
  secondsToTimeInput,
  SHORT_TIME_FORMAT
} from '@/utils/time'

const QUICK_TIME_MINUTES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 90, 120] as const

const open = defineModel<boolean>('open', { required: true })

const settingsStore = useSettingsStore()
const timerStore = useTimerStore()
const { confirm } = useConfirm()

const currentTabIndex = ref(settingsStore.lastSettingsTabIndex)
const countdownTime = ref(settingsStore.countdownTime)
const warningTime = ref(settingsStore.warningLongTime)
const warningPercentage = ref(
  secondsToPercentage(settingsStore.warningSeconds, settingsStore.baseSeconds)
)
const pulseTime = ref(settingsStore.pulseLongTime)
const pulsePercentage = ref(
  secondsToPercentage(settingsStore.pulseSeconds, settingsStore.baseSeconds)
)
const stopwatchEnabled = ref(settingsStore.stopwatchEnabled)
const warningEnabled = ref(settingsStore.warningEnabled)
const pulseEnabled = ref(settingsStore.pulseEnabled)
const currentFormat = ref(settingsStore.currentFormat)
const fontSize = ref(settingsStore.fontSize)
const fontSizerEnabled = ref(settingsStore.fontSizerEnabled)

const tabs = ['Quick', 'Custom', 'Advanced']

const maxCountdownSeconds = computed(() =>
  getMaxSecondsForFormat(currentFormat.value)
)

function syncFromStore () {
  currentTabIndex.value = settingsStore.lastSettingsTabIndex
  countdownTime.value = settingsStore.countdownTime
  warningTime.value = settingsStore.warningLongTime
  warningPercentage.value = secondsToPercentage(
    settingsStore.warningSeconds,
    settingsStore.baseSeconds
  )
  pulseTime.value = settingsStore.pulseLongTime
  pulsePercentage.value = secondsToPercentage(
    settingsStore.pulseSeconds,
    settingsStore.baseSeconds
  )
  stopwatchEnabled.value = settingsStore.stopwatchEnabled
  warningEnabled.value = settingsStore.warningEnabled
  pulseEnabled.value = settingsStore.pulseEnabled
  currentFormat.value = settingsStore.currentFormat
  fontSize.value = settingsStore.fontSize
  fontSizerEnabled.value = settingsStore.fontSizerEnabled
}

watch(open, (isOpen) => {
  if (isOpen) {
    syncFromStore()
  }
})

function countdownChanged () {
  warningPercentageChanged()
  pulsePercentageChanged()
}

function warningPercentageChanged () {
  warningTime.value = secondsToTimeInput(
    percentageToSeconds(warningPercentage.value, parseTimeInput(countdownTime.value))
  )
}

function warningTimeChanged () {
  warningPercentage.value = secondsToPercentage(
    parseTimeInput(warningTime.value),
    parseTimeInput(countdownTime.value)
  )
}

function pulsePercentageChanged () {
  pulseTime.value = secondsToTimeInput(
    percentageToSeconds(pulsePercentage.value, parseTimeInput(countdownTime.value))
  )
}

function pulseTimeChanged () {
  pulsePercentage.value = secondsToPercentage(
    parseTimeInput(pulseTime.value),
    parseTimeInput(countdownTime.value)
  )
}

function applyQuickTime (minutes: number) {
  countdownTime.value = secondsToTimeInput(minutes * 60)
  warningPercentage.value = 10
  pulsePercentage.value = 5
  countdownChanged()
  void applySettings()
}

function buildSettings (): TimerSettings {
  const baseSeconds = parseTimeInput(
    normalizeTimeInput(countdownTime.value, 60, maxCountdownSeconds.value)
  )
  return {
    lastSettingsTabIndex: currentTabIndex.value,
    baseSeconds,
    stopwatchEnabled: stopwatchEnabled.value,
    warningSeconds: parseTimeInput(
      normalizeTimeInput(warningTime.value, 0, baseSeconds)
    ),
    warningEnabled: warningEnabled.value,
    pulseSeconds: parseTimeInput(
      normalizeTimeInput(pulseTime.value, 0, baseSeconds)
    ),
    pulseEnabled: pulseEnabled.value,
    currentFormat: currentFormat.value,
    fontSize: clampNumber(fontSize.value, 1, 50),
    fontSizerEnabled: fontSizerEnabled.value
  }
}

async function applySettings () {
  const confirmed = await confirm({
    title: 'Apply Settings',
    message:
      'Changes in settings will reset your application. Do you want to continue?',
    confirmText: 'OK',
    cancelText: 'Cancel',
    variant: 'danger'
  })
  if (!confirmed) {
    open.value = false
    return
  }
  timerStore.applySettings(buildSettings())
  open.value = false
}
</script>

<template>
  <AppModal v-model:open="open" title="Settings" data-testid="settings-modal">
    <AppTabs v-model="currentTabIndex" :tabs="tabs">
      <template #tab-0>
        <p class="mb-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Try one of the common durations:
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <AppButton
            v-for="minutes in QUICK_TIME_MINUTES"
            :key="minutes"
            variant="info"
            :data-testid="`quick-time-${minutes}`"
            @click="applyQuickTime(minutes)"
          >
            {{ secondsToTimeInput(minutes * 60) }}
          </AppButton>
        </div>
      </template>

      <template #tab-1>
        <div class="space-y-4">
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Countdown Time
            <TimeInput
              v-model="countdownTime"
              class="mt-1"
              min="00:01:00"
              max="23:59:59"
              step="300"
              @change="countdownChanged"
            />
            <span class="mt-1 block text-xs font-normal text-slate-500 dark:text-slate-400">
              Min. 00:01:00 and max. 00:59:59 or 23:59:59 by the current format
            </span>
          </label>

          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Warning Time (of the Countdown)
            <div class="mt-1 grid gap-2 sm:grid-cols-2">
              <TimeInput
                v-model="warningTime"
                :disabled="!warningEnabled"
                step="5"
                @change="warningTimeChanged"
              />
              <div class="relative">
                <input
                  v-model.number="warningPercentage"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-md border border-slate-300 bg-white py-2 pr-8 pl-3 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  :disabled="!warningEnabled"
                  @change="warningPercentageChanged"
                >
                <span
                  class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500 dark:text-slate-400"
                  aria-hidden="true"
                >
                  %
                </span>
              </div>
            </div>
          </label>

          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Pulse Time (of the Countdown)
            <div class="mt-1 grid gap-2 sm:grid-cols-2">
              <TimeInput
                v-model="pulseTime"
                :disabled="!pulseEnabled"
                step="5"
                @change="pulseTimeChanged"
              />
              <div class="relative">
                <input
                  v-model.number="pulsePercentage"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full rounded-md border border-slate-300 bg-white py-2 pr-8 pl-3 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  :disabled="!pulseEnabled"
                  @change="pulsePercentageChanged"
                >
                <span
                  class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500 dark:text-slate-400"
                  aria-hidden="true"
                >
                  %
                </span>
              </div>
            </div>
          </label>
        </div>
      </template>

      <template #tab-2>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Time Format</p>
            <div class="flex flex-wrap gap-2">
              <AppTooltip text="Countdown long time format with seconds">
                <AppButton
                  :variant="currentFormat === LONG_TIME_FORMAT ? 'info' : 'neutral'"
                  @click="currentFormat = LONG_TIME_FORMAT"
                >
                  HH:mm:ss
                </AppButton>
              </AppTooltip>
              <AppTooltip text="Countdown short time format without seconds">
                <AppButton
                  :variant="currentFormat === SHORT_TIME_FORMAT ? 'info' : 'neutral'"
                  @click="currentFormat = SHORT_TIME_FORMAT"
                >
                  mm:ss
                </AppButton>
              </AppTooltip>
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Font Size</p>
            <div class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <AppTooltip text="Countdown font size in VW" placement="top-start" class="w-full">
                <div class="relative w-full">
                  <input
                    v-model.number="fontSize"
                    type="number"
                    min="1"
                    max="50"
                    class="w-full rounded-md border border-slate-300 bg-white py-2 pr-10 pl-3 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  >
                  <span
                    class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    vw
                  </span>
                </div>
              </AppTooltip>
              <AppTooltip
                text="Font Size +/- buttons in the top-left corner"
                placement="top-end"
                class="shrink-0"
              >
                <AppSwitch v-model="fontSizerEnabled" label="Sizer" />
              </AppTooltip>
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Visual Notification</p>
            <div class="flex flex-wrap gap-4">
              <AppTooltip text="Orange background after the Warning time" placement="top-start">
                <AppSwitch v-model="warningEnabled" label="Warning" />
              </AppTooltip>
              <AppTooltip text="Countdown pulsing after the Pulse time">
                <AppSwitch v-model="pulseEnabled" label="Pulse" />
              </AppTooltip>
              <AppTooltip text="Elapsed time in the top-left corner" placement="top-end">
                <AppSwitch v-model="stopwatchEnabled" label="Elapsed" />
              </AppTooltip>
            </div>
          </div>
        </div>
      </template>
    </AppTabs>

    <template #footer>
      <AppButton variant="success" data-testid="settings-apply" @click="applySettings">
        Apply
      </AppButton>
      <AppButton variant="neutral" @click="open = false">
        Storno
      </AppButton>
    </template>
  </AppModal>
</template>

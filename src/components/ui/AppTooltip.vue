<script setup lang="ts">
import { nextTick, ref } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  text: string
  placement?: 'top' | 'top-start' | 'top-end'
}>()

const visible = ref(false)
const positioned = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const tooltipStyle = ref({ top: '0px', left: '0px' })

async function updatePosition () {
  const trigger = triggerRef.value
  const tooltip = tooltipRef.value
  if (!trigger || !tooltip) {
    return
  }

  const triggerRect = trigger.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const margin = 8
  const gap = 6
  const placement = props.placement ?? 'top'

  let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
  if (placement === 'top-start') {
    left = triggerRect.left
  } else if (placement === 'top-end') {
    left = triggerRect.right - tooltipRect.width
  }

  let top = triggerRect.top - tooltipRect.height - gap

  left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin))
  top = Math.max(margin, top)

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`
  }
}

async function show () {
  positioned.value = false
  visible.value = true
  await nextTick()
  await updatePosition()
  positioned.value = true
}

function hide () {
  visible.value = false
  positioned.value = false
}
</script>

<template>
  <span
    ref="triggerRef"
    v-bind="$attrs"
    class="inline-flex"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
  </span>
  <Teleport to="body">
    <span
      v-if="visible"
      ref="tooltipRef"
      role="tooltip"
      class="pointer-events-none fixed z-[100] w-max max-w-[min(16rem,calc(100vw-1rem))] rounded-md bg-slate-800 px-2 py-1 text-xs leading-snug font-normal whitespace-normal text-white shadow-lg transition-opacity"
      :class="positioned ? 'opacity-100' : 'opacity-0'"
      :style="tooltipStyle"
    >
      {{ text }}
    </span>
  </Teleport>
</template>

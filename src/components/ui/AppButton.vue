<script setup lang="ts">
defineProps<{
  title?: string
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'info' | 'link'
  disabled?: boolean
  type?: 'button' | 'submit'
}>()

defineEmits<{
  click: []
}>()

const variantClasses: Record<string, string> = {
  success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
  warning: 'bg-amber-500 hover:bg-amber-400 text-black',
  danger: 'bg-red-600 hover:bg-red-500 text-white',
  neutral: 'bg-slate-700 hover:bg-slate-600 text-white',
  info: 'bg-sky-600 hover:bg-sky-500 text-white',
  link: 'bg-indigo-600 hover:bg-indigo-500 text-white'
}
</script>

<template>
  <button
    :type="type ?? 'button'"
    :title="title"
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
    :class="variantClasses[variant ?? 'neutral']"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

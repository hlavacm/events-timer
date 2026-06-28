<script setup lang="ts">
defineProps<{
  modelValue: string
  disabled?: boolean
  min?: string
  max?: string
  step?: string | number
}>()

defineEmits<{
  'update:modelValue': [value: string]
  change: []
}>()
</script>

<template>
  <input
    type="time"
    class="w-full rounded-md border border-slate-300 px-3 py-2 text-base"
    :value="modelValue"
    :disabled="disabled"
    :min="min"
    :max="max"
    :step="step"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value); $emit('change')"
  >
</template>

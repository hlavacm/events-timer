<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      class="relative h-6 w-11 rounded-full transition disabled:opacity-50"
      :class="modelValue ? 'bg-sky-600' : 'bg-slate-300'"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition"
        :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
      />
    </button>
    <span>{{ label }}</span>
  </label>
</template>

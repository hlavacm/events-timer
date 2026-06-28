<script setup lang="ts">
defineProps<{
  tabs: string[]
  modelValue: number
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<template>
  <div>
    <div class="mb-4 flex flex-wrap gap-2">
      <button
        v-for="(tab, index) in tabs"
        :key="tab"
        type="button"
        class="rounded-full px-4 py-2 text-sm font-semibold transition"
        :class="modelValue === index
          ? 'bg-sky-600 text-white'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
        @click="$emit('update:modelValue', index)"
      >
        {{ tab }}
      </button>
    </div>
    <slot :name="`tab-${modelValue}`" />
  </div>
</template>

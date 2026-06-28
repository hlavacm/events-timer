<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function close () {
  emit('update:open', false)
}

function onKeydown (event: KeyboardEvent) {
  if (event.code === 'Escape' && props.open) {
    event.stopPropagation()
    close()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      v-bind="$attrs"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="close"
    >
      <div
        class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <header class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <h2 class="text-lg font-bold">{{ title }}</h2>
          <button
            type="button"
            class="rounded-md px-2 py-1 text-2xl leading-none text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Close"
            @click="close"
          >
            &times;
          </button>
        </header>
        <section class="overflow-y-auto px-5 py-4">
          <slot />
        </section>
        <footer
          v-if="$slots.footer"
          class="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 dark:border-slate-700"
        >
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

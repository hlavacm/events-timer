<script setup lang="ts">
import { useConfirm } from '@/composables/useConfirm'

const { confirmState, answer } = useConfirm()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="confirmState"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
    >
      <div class="w-full max-w-md rounded-lg bg-white p-5 text-slate-900 shadow-2xl">
        <h3 class="text-lg font-bold">{{ confirmState.title }}</h3>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ confirmState.message }}</p>
        <div class="mt-5 flex justify-end gap-3">
          <button
            type="button"
            class="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            @click="answer(false)"
          >
            {{ confirmState.cancelText }}
          </button>
          <button
            type="button"
            class="rounded-md px-4 py-2 text-sm font-semibold text-white"
            :class="confirmState.variant === 'danger' ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'"
            @click="answer(true)"
          >
            {{ confirmState.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

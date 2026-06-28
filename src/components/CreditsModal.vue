<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'

const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <AppModal v-model:open="open" title="Credits 3.1.0" data-testid="credits-modal">
    <div class="space-y-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
      <p>
        This is a simple countdown application with two time dependent notifications.
      </p>
      <p>
        The application's main target group are speakers at events, conferences, etc.
      </p>
      <p>
        Copyright &copy;
        <a href="http://hlavacm.net" target="_blank" rel="noreferrer" class="text-sky-700 underline dark:text-sky-400">
          Martin Hlaváč
        </a>
        2017-2026
      </p>
      <div class="text-xs text-slate-500 dark:text-slate-400">
        <p>Used:</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li><a href="https://vuejs.org/" target="_blank" rel="noreferrer" class="underline">Vue.js</a></li>
          <li><a href="https://vitejs.dev/" target="_blank" rel="noreferrer" class="underline">Vite</a></li>
          <li><a href="https://pinia.vuejs.org/" target="_blank" rel="noreferrer" class="underline">Pinia</a></li>
          <li><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer" class="underline">Tailwind CSS</a></li>
          <li><a href="https://lucide.dev/" target="_blank" rel="noreferrer" class="underline">Lucide Icons</a></li>
          <li><a href="https://pages.github.com" target="_blank" rel="noreferrer" class="underline">GitHub Pages</a></li>
        </ul>
      </div>
    </div>

    <template #footer>
      <AppButton variant="neutral" @click="open = false">OK</AppButton>
    </template>
  </AppModal>
</template>

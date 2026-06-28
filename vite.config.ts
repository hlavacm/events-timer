import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

function copyDeployFiles (): { name: string; closeBundle: () => void } {
  return {
    name: 'copy-deploy-files',
    closeBundle () {
      const root = resolve(__dirname)
      for (const file of ['CNAME', '404.html']) {
        copyFileSync(resolve(root, file), resolve(root, 'dist', file))
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), copyDeployFiles()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        'src/main.ts',
        'src/types/**',
        'src/styles/**'
      ],
      thresholds: {
        lines: 90,
        functions: 84,
        branches: 90,
        statements: 90
      }
    }
  }
})

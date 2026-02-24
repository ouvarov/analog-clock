import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/shared' as *;\n`,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

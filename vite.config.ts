import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  build: {
    lib: {
      formats: ["cjs", "es"],
      entry: {
        ['main']: path.join(__dirname, '/src/main.ts'),
        ['preload']: path.join(__dirname, '/src/preload.ts'),
        ['renderer']: path.join(__dirname, '/src/renderer.ts'),
      }
    },
    rollupOptions: {
      external: ['electron','express','fs','path'],
      plugins: []
    }
  }
})

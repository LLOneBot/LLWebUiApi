import { defineConfig } from 'vite'
import path from 'node:path'
import cp from 'vite-plugin-cp';
export default defineConfig({
  build: {
    lib: {
      formats: ['cjs', 'es'],
      entry: {
        ['main']: path.join(__dirname, '/src/main.ts'),
        ['preload']: path.join(__dirname, '/src/preload.ts'),
        ['renderer']: path.join(__dirname, '/src/renderer.ts'),
      }
    },
    rollupOptions: {
      external: ['electron', 'express', "node:v8", "node:vm", "node:fs", "node:path", "fs", "path"],
    }
  },
  plugins: [cp({ targets: [{ src: './package.json', dest: 'dist' }, { src: './manifest.json', dest: 'dist' }] })]
})

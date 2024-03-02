import cp from 'vite-plugin-cp';
export default {
  main: {
    build: {
      outDir: "dist/main",
      emptyOutDir: true,
      lib: {
        formats: ["cjs"],
        entry: { "main": "src/main.ts" },
      }
    },
    plugins: [cp({ targets: [{ src: './manifest.json', dest: 'dist' }] })]
  },
  preload: {
    build: {
      outDir: "dist/preload",
      emptyOutDir: true,
      lib: {
        formats: ["cjs"],
        entry: { "preload": "src/preload.ts" },
      },
      rollupOptions: {
        input: "src/preload.ts",
      }
    },
    resolve: {
    }
  },
  renderer: {
    build: {
      outDir: "dist/renderer",
      emptyOutDir: true,
      lib: {
        formats: ["es"],
        entry: { "renderer": "src/renderer.ts" },
      },
      rollupOptions: {
        input: "src/renderer.ts",
      }
    },
    resolve: {
    }
  }
}
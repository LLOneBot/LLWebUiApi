import { defineConfig } from 'vite'
import { build } from "vite";
import cp from 'vite-plugin-cp';
/*
inlineDynamicImports: false,
experimentalMinChunkSize: 999999999,
manualChunks: (id) => {
  return library;
}*/
const externalAll = ["fs", "path", "electron", "express", /node:/];
export function BuildPlugin() {
  const librarys = ["main", "preload"];

  librarys.forEach(async (library) => {
    await build({
      configFile: false,
      build: {
        lib: {
          formats: ["cjs"],
          entry: { [library]: `src/${library}.ts` }
        },
        emptyOutDir: false,
        rollupOptions: {
          external: externalAll,
        }
      }
    });
  });
}

BuildPlugin();

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      formats: ['es'],
      entry: { ["renderer"]: `src/renderer.ts` },
    },
    rollupOptions: {
      external: externalAll
    }
  },
  plugins: [cp({ targets: [{ src: './package.json', dest: 'dist' }, { src: './manifest.json', dest: 'dist' }] })]
})

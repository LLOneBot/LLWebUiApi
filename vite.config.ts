import { defineConfig } from 'vite'
import path from 'node:path'
import { build } from "vite";
import cp from 'vite-plugin-cp';
// make library list, the name for folder
export function BuildPlugin() {
  const librarys = ["main", "preload", "renderer"];


  librarys.forEach(async (library) => {
    await build({
      configFile: false,
      build: {
        lib: {
          formats: ["cjs", "es"],
          entry: { [library]: `src/${library}.ts` }
        },
        assetsDir: "",
        emptyOutDir: false,
        rollupOptions: {
          external: ['electron', 'express', "node:v8", "node:vm", "node:fs", "node:path", "fs", "path"],
          output: {
            /*inlineDynamicImports: false,
            experimentalMinChunkSize: 999999999,
            manualChunks: (id) => {
              return library;
            }*/
          }
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
      formats: ['cjs', 'es'],
      entry: path.join(__dirname, '/script/build.ts'),
    },
    rollupOptions: {
      external: ["node:v8", "node:vm", "node:fs", "node:path", "fs", "path"]
    }
  },
  plugins: [cp({ targets: [{ src: './package.json', dest: 'dist' }, { src: './manifest.json', dest: 'dist' }] })]
})

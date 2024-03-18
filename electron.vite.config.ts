import { resolve } from 'path';
import cp from 'vite-plugin-cp';
import PreprocessorDirectives from 'unplugin-preprocessor-directives/vite';
const ExternalModule = ['ws'];
const BuildExternalModulePath = (moduleName: string) => {
	return {
		src: `./node_modules/${moduleName}`,
		dest: `dist/node_modules/${moduleName}`,
		flatten: false,
	};
};
const BaseOption = {
	resolve: {
		alias: {
			'@static': resolve(__dirname, './static'),
			'@': resolve(__dirname, './src'),
		}
	}
};

export default {
	main: {
		...BaseOption,
		build: {
			outDir: 'dist/main',
			emptyOutDir: true,
			lib: {
				formats: ['cjs'],
				entry: { 'main': 'src/main.ts' },
			},
			rollupOptions: {
				external: ExternalModule,
				input: 'src/main.ts',
			}
		},
		plugins: [
			PreprocessorDirectives(),
			cp({
				targets: [
					...ExternalModule.map(BuildExternalModulePath),
					{ src: './manifest.json', dest: 'dist' },
					// { src: './static', dest: 'dist/static', flatten: false },
				]
			}),
		]
	},
	preload: {
		...BaseOption,
		build: {
			outDir: 'dist/preload',
			lib: {
				formats: ['cjs'],
				entry: { 'preload': 'src/preload.ts' },
			},
			rollupOptions: {
				input: 'src/preload.ts',
			}
		},
	},
	renderer: {
		...BaseOption,
		build: {
			outDir: 'dist/renderer',
			lib: {
				formats: ['es'],
				entry: { 'renderer': 'src/renderer.ts' },
			},
			rollupOptions: {
				input: 'src/renderer.ts',
			}
		},
	}
};

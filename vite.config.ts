import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { SvelteKitPWA } from '@vite-pwa/sveltekit'

const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line

export default defineConfig(({ mode }) => {

	const config = {
		plugins: [sveltekit(), imagetools(), SvelteKitPWA()],
		resolve: {
			alias: {
				$stores: resolve(__dirname, './src/stores'),
				$components: resolve(__dirname, './src/lib/shared/components'),
				$ui: resolve(__dirname, './src/lib/shared/ui'),
				$layouts: resolve(__dirname, './src/lib/layouts'),
				$shared: resolve(__dirname, './src/lib/shared'),
				$models: resolve(__dirname, './src/lib/models'),
				$data: resolve(__dirname, './src/lib/data'),
				$core: resolve(__dirname, './src/lib/core'),
				$utils: resolve(__dirname, './src/lib/utils'),
				$environment: resolve(__dirname, './src/environments'),
				$src: resolve(__dirname, './src'),
			},
		},
		build: {
			ssr: true,
			rollupOptions: {
				output: {
					// https://rollupjs.org/configuration-options/#output-manualchunks
					// to improve the speed of page loading, we can manually split chunks
					manualChunks: undefined
				}
			},
			cssMinify: true,
		},
		define: {
			"globalThis.process.env.NODE_ENV": `'${process.env.NODE_ENV}'`,
		},
		envPrefix: ['VITE_', 'SVELTEKIT_STARTER_'],
		optimizeDeps: {
			include: ['ethers'],
			entries: ['markdown-to-text'],
		},
		ssr: {
			optimizeDeps: {
				include: ['ethers', 'markdown-to-text'],
			},
			external: ['is-buffer', '@milkdown/*', 'extend', 'debug', 'fs', '@toast-ui/*', 'lodash',],
		}
	};

	return config;
});

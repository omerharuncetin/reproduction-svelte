/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* jshint esversion: 9 */

// command env properties
const hasAdapter = process.env.ADAPTER;
const adapt = hasAdapter ? hasAdapter : 'node';
//const isAMP = process.env.AMP ? true : false;

// Imports
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Adapters
import staticAdapter from '@sveltejs/adapter-static';
import nodeAdapter from '@sveltejs/adapter-node';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

// Custom require function as replacement for the require from the commonJS in ES Module

// Custom __dirname as replacement for the __dirname from the commonJS in ES Module
const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line

const options = JSON.stringify(process.env.OPTIONS || '{}');

const getAdapters = (adapt) => {
	switch (adapt) {
		case 'node':
			return nodeAdapter;
		case 'static':
			return staticAdapter;
		case 'netlify':
			return netlifyAdapter;
		case 'vercel':
			return vercelAdapter;
		default:
			return nodeAdapter;
	}
};

const adapter = getAdapters(adapt);

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// preprocess: [
	// 	preprocess({
	// 		postcss: true,
	// 		scss: {
	// 			prependData: `@import 'src/styles/variables/index.scss';`,
	// 			outputStyle: 'compressed',
	// 		},
	// 		preserve: ['ld+json'],
	// 	}),
	// ],
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			'$stores': resolve(__dirname, './src/stores'),
			'$components': resolve(__dirname, './src/lib/shared/components'),
			'$ui': resolve(__dirname, './src/lib/shared/ui'),
			'$layouts': resolve(__dirname, './src/lib/layouts'),
			'$shared': resolve(__dirname, './src/lib/shared'),
			'$models': resolve(__dirname, './src/lib/models'),
			'$data': resolve(__dirname, './src/lib/data'),
			'$core': resolve(__dirname, './src/lib/core'),
			'$utils': resolve(__dirname, './src/lib/utils'),
			'$environment': resolve(__dirname, './src/environments'),
			'$src': resolve(__dirname, './src'),
			"$appLib": resolve(__dirname, './src/lib'),
		},
		files: {
			serviceWorker: 'src/service-worker.ts'
		},
		serviceWorker: {
			register: false
		}
		//target: '#starter',
		//ssr: true,
		//amp: isAMP,
		//hydrate: true,
		// serviceWorker: {
		// 	files: (resolve(__dirname, './src/service-worker')),
		// 	register: true
		// },
		// typescript: {
		// 	config: resolve(__dirname, './tsconfig.json')
		// },
		// prerender: {
		// 	crawl: false,
		// 	enabled: true,
		// 	onError: 'fail',
		// 	entries: [
		// 		'/',
		// 		'/topics',
		// 		'/topics/[slug]',
		// 		'/profile',
		// 		'/profile/[slug]',
		// 		'/posts',
		// 		'/posts/[slug]',
		// 		'/earnings',
		// 		'/convert',
		// 		'/mint',
		// 		'/about',
		// 		'/settings',
		// 	],
		// },
		// vite: () => ({
		// 	resolve: {
		// 		alias: {
		// 			$stores: resolve(__dirname, './src/stores'),
		// 			$components: resolve(__dirname, './src/lib/shared/components'),
		// 			$ui: resolve(__dirname, './src/lib/shared/ui'),
		// 			$layouts: resolve(__dirname, './src/lib/layouts'),
		// 			$shared: resolve(__dirname, './src/lib/shared'),
		// 			$models: resolve(__dirname, './src/lib/models'),
		// 			$data: resolve(__dirname, './src/lib/data'),
		// 			$core: resolve(__dirname, './src/lib/core'),
		// 			$utils: resolve(__dirname, './src/lib/utils'),
		// 			$environment: resolve(__dirname, './src/environments'),
		// 			$src: resolve(__dirname, './src'),
		// 		},
		// 	},
		// 	build: {
		// 		rollupOptions: {
		// 			output: {
		// 				manualChunks: undefined,
		// 			},
		// 		},
		// 	},
		// 	define: {
		// 		"globalThis.process.env.NODE_ENV": `'${process.env.NODE_ENV}'`
		// 	},
		// 	envPrefix: ['VITE_', 'SVELTEKIT_STARTER_'],
		// 	plugins: [imagetools({ force: true }),],
		// 	optimizeDeps: {
		// 		include: ['ethers'],
		// 	},
		// 	ssr: {
		// 		external: ['is-buffer', '@milkdown/*', 'extend', 'debug', 'fs', '@toast-ui/*', 'lodash'],
		// 	},
		// }),
	},
};

if (hasAdapter) {
	config.kit.adapter = adapter(options);
}

export default config;

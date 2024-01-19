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
	},
};

if (hasAdapter) {
	config.kit.adapter = adapter(options);
}

export default config;

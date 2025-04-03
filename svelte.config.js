import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
		adapter: adapter({
		    pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),

        paths: {
            relative: false,
            base: process.env.NODE_ENV == 'development' ? '' : '/zygon'
        },

        alias: {
            $r: path.resolve('src/routes'),
            $index: path.resolve('src/routes/(index)')
        }
    }

};

export default config;

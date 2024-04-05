import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        scss: {
            prependData: `@import './src/app.scss';`
        }
    }),

    kit: {
        adapter: adapter(),
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

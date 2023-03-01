import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { optimizeCarbonImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), optimizeCarbonImports()],
	kit: {
		adapter: adapter(),
		alias: {
			lib: './src/lib',
			flow: './src/lib/flow'
		}
	}
};

export default config;

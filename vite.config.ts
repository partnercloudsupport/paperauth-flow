import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import inject from '@rollup/plugin-inject';

const config: UserConfig = {
	define: {
		global: 'globalThis'
	},
	plugins: [
		nodePolyfills({
			protocolImports: true
		}),
		sveltekit()
	],
	resolve: {
		alias: {
			'node-fetch': './node_modules/node-fetch/browser.js'
		}
	},
	build: {
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })]
		}
	}
};
export default config;

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import svelteEmailTailwind from 'svelte-email-tailwind/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss({
			safelist: {
				greedy: [/^cds-/],
			},
		}),
		svelteEmailTailwind({
			pathToEmailFolder: '/src/lib/components/email/**'
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
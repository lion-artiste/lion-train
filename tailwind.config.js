// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './skeleton-theme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
  ],
  theme: {
    extend: {
      colors: {
        "main": 'var(--main-color)',
        "secondary": 'var(--secondary-color)',
      },
      fontFamily: {
        "sstv": ["Super Smash TV", "sans-serif"],
        "gaming": ["Minecraft Standard", "sans-serif"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    skeleton({
      themes: { custom: [
				myCustomTheme
			] }
    })
  ],
}
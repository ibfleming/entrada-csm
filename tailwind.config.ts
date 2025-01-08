import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			primary: '#4b916e',
			secondary: '#6cb7a0',
			tertiary: '#8fd6c3',
			border: '#b4e9d5',
			background: '#ffffff'
		},
		extend: {}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;

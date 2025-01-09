import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: { DEFAULT: '#4b916e', dark: '#376B51' },
				'primary-hover': '#26915B',
				secondary: '#6cb7a0',
				tertiary: '#8fd6c3',
				border: '#b4e9d5',
				background: { DEFAULT: '#ffffff', card: '#D6D3D1' }
			},
			fontFamily: {
				funnel: ['Funnel Display Variable', 'sans-serif'],
				ibm: ['IBM Plex Sans', 'sans-serif'],
				inter: ['Inter Variable', 'sans-serif']
			}
		}
	},
	plugins: [typography, forms, containerQueries]
} satisfies Config;

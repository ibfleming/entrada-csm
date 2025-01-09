<script lang="ts">
	export let title: string = 'Application Title';
</script>

<header class="flex items-center justify-between p-4">
	<h1 class="text-lg font-bold text-primary">{title}</h1>
	<div
		class="flex h-8 w-1/4 items-center justify-items-start gap-1.5 rounded-md border border-gray-300 px-2 text-gray-600 focus-within:ring-1 focus-within:ring-primary hover:cursor-text"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="size-5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>
		<input
			type="text"
			id="search"
			autocomplete="off"
			autocorrect="off"
			spellcheck="false"
			class="m-0 w-full border-0 border-none p-0 text-sm shadow-none transition duration-200 ease-in-out focus:outline-none focus:ring-0"
		/>
	</div>
</header>

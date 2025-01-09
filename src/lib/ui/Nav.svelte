<script lang="ts">
	import Breadcrumbs from './Breadcrumbs.svelte';
	const navItems = [
		{ name: 'Dashboard', url: '/' },
		{ name: 'Residents', url: '/residents' },
		{ name: 'Leads', url: '/leads' },
		{ name: 'Tools', url: '/tools' }
	];
</script>

<nav class="font-ibm rounded-t-md bg-primary text-white">
	<ul class="flex">
		{#each navItems as item, index}
			<li
				class=" hover:bg-primary-dark border-r-2 border-background text-sm outline-none ring-0 transition-colors duration-300 ease-in-out {index ===
				0
					? 'rounded-tl-md'
					: ''}"
			>
				<a
					class="block px-8 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50 focus-visible:ring-offset-2
							{index === 0 ? 'focus:rounded-tl-md' : ''}"
					href={item.url}
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

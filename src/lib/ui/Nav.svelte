<script lang="ts">
	const navItems = [
		{ name: 'Dashboard', url: '/dashboard' },
		{ name: 'Residents', url: '/residents' },
		{ name: 'Leads', url: '/leads' },
		{ name: 'Tools', url: '/tools' },
		{ name: '404', url: '/404' }
	];
</script>

<nav class="rounded-t-md bg-primary font-inter text-white">
	<ul class="flex">
		{#each navItems as item, index}
			<li
				class=" border-r-2 border-background text-sm outline-none ring-0 transition-colors duration-300 ease-in-out hover:bg-primary-dark {index ===
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

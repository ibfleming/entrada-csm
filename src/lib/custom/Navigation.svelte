<script lang="ts">
	const navItems = [
		{ name: 'Dashboard', url: '/dashboard' },
		{ name: 'Leads', url: '/leads' },
		{ name: 'Residents', url: '/residents' },
		{ name: 'Tools', url: '/tools' }
	];
</script>

<nav class="rounded-t-md bg-primary text-white">
	<ul class="flex">
		{#each navItems as item, index}
			<li
				class=" border-r-2 border-background text-sm outline-none ring-0 transition-colors duration-300 ease-in-out hover:bg-green-700 {index ===
				0
					? 'rounded-tl-md'
					: ''}"
			>
				<a
					class="default-ring block px-8 py-2.5 focus:outline-none focus:ring-offset-1
							{index === 0 ? 'focus:rounded-tl-md' : ''}"
					href={item.url}
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

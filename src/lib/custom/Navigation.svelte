<script lang="ts">
	const navItems = [
		{ name: 'Dashboard', url: '/dashboard' },
		{ name: 'Leads', url: '/leads' },
		{ name: 'Residents', url: '/residents' },
		{ name: 'Tools', url: '/tools' }
	];
</script>

<nav class="@lg:rounded-t-md bg-primary text-white">
	<ul class="flex">
		{#each navItems as item, index}
			<li
				class="@lg:flex-none flex-1 border-r-2 border-background text-sm outline-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#509a75] {index ===
				0
					? '@lg:rounded-tl-md'
					: ''}"
			>
				<a
					class="button-focus-visible @lg:px-8 @lg:py-2.5 block py-2.5 text-center
							{index === 0 ? '@lg:focus:rounded-tl-md' : ''}"
					href={item.url}
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

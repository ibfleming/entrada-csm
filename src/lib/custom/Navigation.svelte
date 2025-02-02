<script lang="ts">
	const navItems = [
		{ name: 'Dashboard', url: '/dashboard' },
		{ name: 'Leads', url: '/leads' },
		{ name: 'Residents', url: '/residents' },
		{ name: 'Tools', url: '/tools' }
	];
</script>

<nav class="bg-primary text-white @lg:rounded-t-md">
	<ul class="flex">
		{#each navItems as item, index}
			<li
				class="flex-1 border-r-2 border-background text-sm outline-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#509a75] @lg:flex-none {index ===
				0
					? '@lg:rounded-tl-md'
					: ''}"
			>
				<a
					class="button-focus-visible block py-2.5 text-center @lg:px-8 @lg:py-2.5
							{index === 0 ? '@lg:focus:rounded-tl-md' : ''}"
					href={item.url}
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

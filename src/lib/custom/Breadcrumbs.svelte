<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';

	let breadcrumbs: { name: string; href: string }[] = [];

	function updateBreadcrumbs() {
		breadcrumbs = [...generateBreadcrumbs(page.url.pathname)];
	}

	function generateBreadcrumbs(pathname: string): { name: string; href: string }[] {
		const segments = pathname.split('/').filter(Boolean);
		return segments.map((segment, index) => ({
			name: segment.charAt(0).toUpperCase() + segment.slice(1),
			href: `/${segments.slice(0, index + 1).join('/')}`
		}));
	}

	updateBreadcrumbs();

	afterNavigate(updateBreadcrumbs);
</script>

<nav class="flex items-center justify-start gap-3 px-4 py-1.5 text-xs text-gray-500">
	{#if breadcrumbs.length === 0}
		<a href="/" class="outline-none ring-0">/</a>
	{/if}
	{#each breadcrumbs as crumb, i}
		{#if i == 0}
			<a href="/" class="outline-none ring-0">/</a>
		{/if}
		<a href={crumb.href} class="outline-none ring-0 hover:underline">
			{crumb.name}
		</a>
		<span>/</span>
	{/each}
</nav>

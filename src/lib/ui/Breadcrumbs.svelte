<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';

	let breadcrumbs: { name: string; href: string }[] = [];

	function updateBreadcrumbs() {
		breadcrumbs = [...generateBreadcrumbs(page.url.pathname)];
	}

	function generateBreadcrumbs(pathname: string): { name: string; href: string }[] {
		if (pathname === '/') return [{ name: 'Dashboard', href: '/' }];

		const segments = pathname.split('/').filter(Boolean);
		console.log(pathname[3]);
		return segments.map((segment, index) => ({
			name: segment.charAt(0).toUpperCase() + segment.slice(1),
			href: `/${segments.slice(0, index + 1).join('/')}`
		}));
	}

	updateBreadcrumbs();

	afterNavigate(updateBreadcrumbs);
</script>

<nav class="font-inter flex items-center justify-start gap-3 px-4 py-1.5 text-xs text-gray-500">
	{#each breadcrumbs as crumb, i}
		{#if i == 0}
			<span>/</span>
		{/if}
		<a href={crumb.href} class="outline-none ring-0 hover:underline">
			{crumb.name}
		</a>
		<span>/</span>
	{/each}
</nav>

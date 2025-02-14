<script lang="ts">
	import Header from '$lib/custom/Header.svelte';
	import Breadcrumbs from '$lib/custom/Breadcrumbs.svelte';
	import Navigation from '$lib/custom/Navigation.svelte';
	let { data, children } = $props();
</script>

<main class="font-inter @container">
	<div class="@lg:px-4">
		<Header title="Zion Leasing LLC" {...data} />
		<Navigation />
		<Breadcrumbs />
		<div class="relative -z-10 h-4 w-full bg-primary drop-shadow-md @lg:rounded-b-md"></div>
	</div>
	{@render children()}
</main>

<script lang="ts">
	import Header from '$lib/custom/Header.svelte';
	import Breadcrumbs from '$lib/custom/Breadcrumbs.svelte';
	import Navigation from '$lib/custom/Navigation.svelte';
	let { data, children } = $props();
</script>

<main class="font-inter">
	<div class="px-4">
		<Header title="Zion" user={data.user} />
		<Navigation />
		<Breadcrumbs />
		<div class="h-4 w-full rounded-b-md bg-primary drop-shadow-md"></div>
	</div>
	{@render children()}
</main>

<!-- +layout.svelte -->
<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/funnel-display';
	import '@fontsource/ibm-plex-sans';
	import '@fontsource-variable/inter';
	import { page } from '$app/state';
	import Header from '$lib/ui/Header.svelte';
	import Nav from '$lib/ui/Nav.svelte';
	import Breadcrumbs from '$lib/ui/Breadcrumbs.svelte';
	let { children } = $props();
</script>

<Header title="Zion Housing" />

<div class="h-full w-full px-8">
	<div class="block h-full w-full">
		<Nav />
		<Breadcrumbs />
		<div class="h-4 w-full rounded-b-md bg-primary drop-shadow-md"></div>
	</div>
</div>

{@render children()}

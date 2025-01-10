<script lang="ts">
	import Logo from '$lib/ui/Logo.svelte';
	import Nav from '$lib/ui/Nav.svelte';
	import Breadcrumbs from '$lib/ui/Breadcrumbs.svelte';
</script>

<Logo title="ZION" />

<div class="h-full w-full px-8">
	<div class="block h-full w-full">
		<Nav />
		<Breadcrumbs />
		<div class="h-4 w-full rounded-b-md bg-primary drop-shadow-md"></div>
	</div>
</div>

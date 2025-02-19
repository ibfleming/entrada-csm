<script lang="ts">
	import Header from '$lib/custom/Header.svelte';
	import Breadcrumbs from '$lib/custom/Breadcrumbs.svelte';
	import Navigation from '$lib/custom/Navigation.svelte';
	import { setLeads, setResidents } from '$lib/stores';

	let { data, children } = $props();

	let title = 'Zion Leasing LLC';

	$effect(() => {
		if (data.leads) {
			setLeads(data.leads);
		}
		if (data.residents) {
			setResidents(data.residents);
		}
	});
</script>

<main class="font-inter @container">
	<div class="@lg:px-4">
		<!-- Header -->
		<Header {title} user={data.user} />

		<!-- Navigation -->
		<Navigation />

		<!-- Breadcrumbs -->
		<Breadcrumbs />

		<!-- Divider -->
		<div class="relative -z-10 h-4 w-full bg-primary drop-shadow-md @lg:rounded-b-md"></div>
	</div>
	{@render children()}
</main>

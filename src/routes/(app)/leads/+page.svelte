<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { Lead } from '$lib/types.js';
	import { invalidate, invalidateAll } from '$app/navigation';

	let { data } = $props();

	let leads = $state(data.leads);

	$effect(() => {
		setInterval(() => {
			invalidateAll();
		}, 1000);
	});
</script>

<svelte:head>
	<title>Leads</title>
</svelte:head>

<DataTable {leads} />

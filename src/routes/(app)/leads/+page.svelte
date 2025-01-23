<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { Lead } from '$lib/types.js';

	let { data } = $props();
	const leads: Lead[] = data.leads;
</script>

<svelte:head>
	<title>Leads</title>
</svelte:head>

<DataTable {leads} />

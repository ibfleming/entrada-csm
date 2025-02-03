<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { Lead } from '$lib/types';

	let { data } = $props();
	let leads = $state(data.leads);

	// Expose a function to update leads that can be called from child components
	function updateLeads(updatedLeads: Lead[]) {
		leads = updatedLeads;
	}
</script>

<svelte:head>
	<title>Leads</title>
</svelte:head>

<DataTable {leads} {updateLeads} />

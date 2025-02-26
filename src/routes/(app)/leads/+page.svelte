<script lang="ts">
	import DataTable from './LeadDataTable.svelte';
	import type { Lead } from '$lib/types';

	let { data } = $props();
	let leads = $state(data.leads);

	// Expose a function to update leads that can be called from child components
	function updateLeads(updatedLeads: Lead[]) {
		leads = updatedLeads;
	}
</script>

<svelte:head>
	<title>Leasing CMS - Leads</title>
</svelte:head>

<DataTable {leads} {updateLeads} form={data.form} />

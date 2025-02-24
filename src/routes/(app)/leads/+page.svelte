<script lang="ts">
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import DataTable from './data-table.svelte';
	import type { CreateLeadFormSchema, Lead } from '$lib/types';

	let { data } = $props();
	let leads = $state(data.leads);
	const form = data.form;

	// Expose a function to update leads that can be called from child components
	function updateLeads(updatedLeads: Lead[]) {
		leads = updatedLeads;
	}
</script>

<svelte:head>
	<title>Leasing CMS - Leads</title>
</svelte:head>

<DataTable {leads} {updateLeads} {form} />

<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { Resident } from '$lib/types.js';

	let { data } = $props();
	let residents = $state(data.residents);

	// Expose a function to update residents that can be called from child components
	function updateResidents(updatedResidents: Resident[]) {
		residents = updatedResidents;
	}
</script>

<svelte:head>
	<title>Leasing CMS - Residents</title>
</svelte:head>

<DataTable {residents} {updateResidents} />

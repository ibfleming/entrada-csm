<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { Resident } from '$lib/types.js';

	let { data } = $props();
	const residents: Resident[] = data.residents;
</script>

<svelte:head>
	<title>Residents</title>
</svelte:head>

<DataTable {residents} />

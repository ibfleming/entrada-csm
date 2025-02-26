<script lang="ts">
	import ResidentTable from './ResidentDataTable.svelte';

	let { data } = $props();
	let residents = $state(data.residents);
</script>

<svelte:head>
	<title>Leasing CMS - Residents</title>
</svelte:head>

<ResidentTable {residents} form={data.form} />

<script lang="ts">
	import LeadTable from './LeadDataTable.svelte';

	let { data } = $props();
	let leads = $state(data.leads);
</script>

<svelte:head>
	<title>Leasing CMS - Leads</title>
</svelte:head>

<LeadTable {leads} form={data.form} />

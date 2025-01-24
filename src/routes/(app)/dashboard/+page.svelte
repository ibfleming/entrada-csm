<script lang="ts">
	import Chart from '$lib/custom/Chart.svelte';
	import type { Lead, Resident } from '$lib/types.js';

	let { data } = $props();

	const leads: Lead[] = data.leads;
	const residents: Resident[] = data.residents;

	const totalLeads = leads.length;
	const totalResidents = residents.length;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex p-8">
	<!-- 	<div>
		<h1 class="font-black">Leads ({totalLeads})</h1>
		<ul>
			{#each leads as lead}
				<li>{lead.firstName} {lead.lastName}</li>
			{/each}
		</ul>
	</div>
	<div>
		<h1 class="font-black">Residents ({totalResidents})</h1>
		<ul>
			{#each residents as resident}
				<li>{resident.firstName} {resident.lastName}</li>{/each}
		</ul>
	</div> -->
	<Chart />
</div>

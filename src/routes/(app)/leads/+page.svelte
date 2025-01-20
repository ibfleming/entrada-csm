<script lang="ts">
	import type { Lead } from '$lib/types.js';

	let { data } = $props();
	const leads: Lead[] = data.leads;
</script>

<svelte:head>
	<title>Leads</title>
</svelte:head>

<div class="container">
	<h1>Leads</h1>
	{#each leads as lead}
		<div class="card">
			<h2>{lead.firstName} {lead.lastName}</h2>
			<p>{lead.email}</p>
			<p>{lead.phoneNumber}</p>
			<p>{lead.floorPlan}</p>
		</div>
	{/each}
</div>

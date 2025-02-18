<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { data } = $props();

	const leadCount: number = isNaN(data.leadCount[0].count) ? 0 : data.leadCount[0].count;
	const residentCount: number = isNaN(data.residentCount[0].count)
		? 0
		: data.residentCount[0].count;
</script>

<svelte:head>
	<title>Leasing CMS - Dashboard</title>
</svelte:head>

<div class="p-4">
	<div class="flex flex-col gap-4 sm:flex-row">
		<Card.Root class="bg-primary">
			<Card.Content class="flex flex-col items-center justify-center">
				<p class="text-8xl font-bold text-orange-300">{leadCount}</p>
				<p class="text-xl font-bold uppercase text-white">Total Leads</p>
			</Card.Content>
		</Card.Root>
		<Card.Root class="bg-primary">
			<Card.Content class="flex flex-col items-center justify-center">
				<p class="text-8xl font-bold text-indigo-300">{residentCount}</p>
				<p class="text-xl font-bold uppercase text-white">Total Residents</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>

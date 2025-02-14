<script lang="ts">
	import { onMount } from 'svelte';
	import { createLeadsIndex, createResidentsIndex, searchIndex } from '$lib/search';
	import type { Lead, Resident } from '$lib/types';

	let search: 'loading' | 'ready' = $state('loading');
	let searchTerm = $state('');
	let results = $state<{ leadResults: Lead[]; residentResults: Resident[] }>({
		leadResults: [],
		residentResults: []
	});

	onMount(async () => {
		const data = await fetch('/search.json').then(
			(res) => res.json() as Promise<{ leads: Lead[]; residents: Resident[] }>
		);

		createLeadsIndex(data.leads);
		//createResidentsIndex();
		search = 'ready';
	});

	$effect(() => {
		if (search === 'ready') {
			results = searchIndex(searchTerm);
		}
	});
</script>

{#if search === 'ready'}
	<div class="search">
		<input
			bind:value={searchTerm}
			placeholder="Search"
			autocomplete="off"
			spellcheck="false"
			type="search"
		/>

		<div class="results">
			{#if results}
				<ul>
					{#each results.leadResults as result}
						<li>
							<a href="/{result.id}">
								{@html result.firstName}
								{@html result.lastName}
							</a>
							<p>{@html result.email}</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{/if}

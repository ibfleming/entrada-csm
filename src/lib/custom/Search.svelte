<script lang="ts">
	import { onMount } from 'svelte';
	import { createLeadsIndex, createResidentsIndex, searchIndex } from '$lib/search';
	import type { Lead, Resident } from '$lib/types';

	let search: 'loading' | 'ready' = $state('loading');
	let searchTerm = '';
	let results = $state({});

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

{#if search === 'ready'}{/if}

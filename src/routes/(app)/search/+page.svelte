<script lang="ts">
	import type { Lead, Resident } from '$lib/types';
	import { Search } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	const leads: Lead[] = data.leads;
	const residents: Resident[] = data.residents;

	let inputRef: HTMLInputElement; // Input
	let searchBarWrapperRef: HTMLDivElement; // Search
	let showResults: boolean = $state(false);
	let searchQuery: string = $state('');

	function focusInput() {
		showResults = true;
		inputRef?.focus();
	}

	function blurInput(event: FocusEvent) {
		const relatedTarget = event.relatedTarget as HTMLElement;
		if (searchBarWrapperRef && searchBarWrapperRef.contains(relatedTarget)) {
			return;
		}
		showResults = false;
	}

	let filteredResults = $derived.by(() => {
		if (!searchQuery.trim()) return [];

		const terms = searchQuery.toLowerCase().split(/\s+/); // Split query into words

		const filterEntities = (entities: any[], type: string) =>
			entities
				.filter(
					(entity: {
						firstName: string;
						lastName: string;
						email: string;
						phoneNumber: { toString: () => any };
					}) => {
						const searchableFields = [
							entity.firstName.toLowerCase(),
							entity.lastName.toLowerCase(),
							entity.email.toLowerCase(),
							entity.phoneNumber.toString()
						];

						return terms.every((term) => searchableFields.some((field) => field.includes(term)));
					}
				)
				.map((entity: any) => ({ ...entity, type })); // Add type to differentiate

		return [...filterEntities(leads, 'Lead'), ...filterEntities(residents, 'Resident')];
	});

	/* 	$effect(() => {
		console.log('searchQuery:', searchQuery);
		console.log('filteredLeads:', JSON.stringify(filteredLeads));
	}); */
</script>

<svelte:head>
	<title>Search test</title>
</svelte:head>

<div id="search-wrapper" class="mr-16">
	<div id="search-bar-container" class="relative">
		<div
			role="button"
			tabindex="0"
			aria-label="Search input"
			id="search-bar-wrapper"
			class="zion-search-focus-visible flex h-8 w-[448px] max-w-md flex-1 cursor-text items-center justify-items-start gap-1.5 rounded-md border border-gray-300 px-2 text-gray-600 shadow-md transition-all"
			bind:this={searchBarWrapperRef}
			onclick={focusInput}
			onfocus={focusInput}
			onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && focusInput()}
		>
			<Search strokeWidth={2.5} class="size-6 text-primary" />
			<input
				id="search"
				type="search"
				placeholder="Search..."
				autocomplete="off"
				autocorrect="off"
				spellcheck="false"
				bind:this={inputRef}
				bind:value={searchQuery}
				onfocus={focusInput}
				onblur={blurInput}
				class="w-full text-ellipsis border-none p-0 text-xs text-muted-foreground shadow-none placeholder:italic focus:outline-none focus:ring-0"
			/>
			<kbd class="mono pointer-events-none rounded-sm bg-muted px-1 text-xs font-medium opacity-100"
				>Ctrl+K</kbd
			>
		</div>

		{#if showResults}
			<div
				id="search-results"
				class={'absolute right-0 mt-2 flex w-max flex-col items-center justify-center rounded-md border border-gray-300 bg-accent shadow-md'}
				transition:fade={{ duration: 150 }}
			>
				{#if filteredResults.length === 0}
					<div class="flex w-[576px] items-center justify-center py-4 text-sm">
						<p class="font-bold text-red-500">No results found</p>
					</div>
				{:else if filteredResults.length > 0}
					<ul class="max-h-96 overflow-y-scroll text-sm">
						{#each filteredResults as item}
							<li
								class="flex w-[576px] flex-1 cursor-pointer items-start justify-between gap-16 border-t border-gray-300 px-4 py-1.5 pr-8 first-of-type:border-none"
							>
								<div class="flex flex-col items-start justify-center">
									<h1 class="font-semibold text-primary">{item.firstName} {item.lastName}</h1>
									<h2 class="italic">{item.type}</h2>
								</div>
								<div class="flex flex-col items-end justify-end">
									<h1>{item.email}</h1>
									<h2 class="font-mono">
										{`+${String(item.phoneNumber).slice(0, 1)} (${String(item.phoneNumber).slice(1, 4)}) ${String(item.phoneNumber).slice(4, 7)}-${String(item.phoneNumber).slice(7)}`}
									</h2>
								</div>
							</li>
						{/each}
					</ul>
				{:else}
					<span class="loader"></span>
				{/if}
			</div>
		{/if}
	</div>
</div>

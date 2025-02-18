<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon, CopyIcon, Trash2Icon, HousePlusIcon } from 'lucide-svelte';
	import type { Lead } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import { leadsStore } from '$lib/stores';

	export let id: string;
	export let fullName: string;
	export let tableData: Writable<Lead[]>;
	export let lead: Lead;

	async function deleteLead(id: string) {
		try {
			const resp = await fetch(`/api/leads/${id}`, {
				method: 'DELETE'
			});

			if (!resp.ok) {
				throw new Error('Failed to delete lead');
			}

			leadsStore.update((data) => data.filter((lead: Lead) => lead.id !== id));
			tableData.update((data) => data.filter((row: Lead) => row.id !== id));
		} catch (error) {
			console.error('Error deleting lead:', error);
		}
	}

	async function moveInLead(lead: Lead) {
		try {
			const resp = await fetch(`/api/leads/movein`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(lead)
			});

			if (!resp.ok) {
				throw new Error('Failed to move in lead');
			}

			const result = await resp.json();
			if (result.success) {
				tableData.update((leads) => leads.filter((l) => l.id !== lead.id));
			} else {
				throw new Error(result.error || 'Failed to move in lead');
			}
		} catch (error) {
			console.error('Error converting lead to resident:', error);
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="button-focus-visible h-fit w-fit rounded-sm p-0.5 transition-all"
		>
			<span class="sr-only">Open menu</span>
			<MenuIcon class="size-6" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="font-inter" align="end">
		<DropdownMenu.Group>
			<DropdownMenu.Label class="text-primary">Actions</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="cursor-pointer" on:click={() => navigator.clipboard.writeText(id)}>
				<CopyIcon class="mr-2 size-5" />
				Copy ID
			</DropdownMenu.Item>
			<DropdownMenu.Item
				on:click={() => navigator.clipboard.writeText(fullName)}
				class="cursor-pointer"
			>
				<CopyIcon class="mr-2 size-5" />
				Copy Name
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				on:click={() => moveInLead(lead)}
				class="cursor-pointer text-yellow-600 data-[highlighted]:text-yellow-600"
			>
				<HousePlusIcon class="mr-2 size-5" />
				Move In
			</DropdownMenu.Item>
			<DropdownMenu.Item
				on:click={() => deleteLead(id)}
				class="cursor-pointer text-destructive data-[highlighted]:text-destructive"
			>
				<Trash2Icon class="mr-2 size-5" />
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

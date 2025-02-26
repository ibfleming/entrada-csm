<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon, CopyIcon, Trash2Icon, HousePlusIcon } from 'lucide-svelte';
	import type { Lead, Resident } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import { leadsStore, residentsStore } from '$lib/stores';

	export let tableData: Writable<Lead[]>;
	export let lead: Lead;

	async function deleteLead(id: string) {
		try {
			const resp = await fetch(`/api/leads/${id}`, {
				method: 'DELETE'
			});

			const result = await resp.json();

			if (!resp.ok || !result.success) {
				throw new Error(result.error || 'Failed to delete lead');
			}

			// Remove lead from tableData
			tableData.update((data) => data.filter((item: Lead) => item.id !== id));

			// Remove lead from leadsStore
			leadsStore.update((data) => data.filter((item: Lead) => item.id !== id));

			console.log('Lead successfully deleted');
		} catch (error) {
			console.error('Error deleting lead:', error);
		}
	}

	async function transferLead(lead: Lead) {
		try {
			const resp = await fetch(`/api/leads/transfer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(lead)
			});

			const result = await resp.json();

			if (!resp.ok || !result.success) {
				throw new Error(result.error || 'Failed to move in lead');
			}

			// Remove lead from tableData
			tableData.update((leads) => leads.filter((item: Lead) => item.id !== lead.id));

			const newResident: Resident = result.resident;

			// Add new resident to residentsStore
			residentsStore.update((residents) => [...residents, result.resident]);

			// Remove lead from leadsStore
			leadsStore.update((data) => data.filter((item: Lead) => item.id !== lead.id));

			console.log('Lead successfully moved to resident:', newResident);
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
			<DropdownMenu.Item
				class="cursor-pointer"
				on:click={() => navigator.clipboard.writeText(lead.id)}
			>
				<CopyIcon class="mr-2 size-5" />
				Copy ID
			</DropdownMenu.Item>
			<DropdownMenu.Item
				on:click={() => navigator.clipboard.writeText(lead.firstName + ' ' + lead.lastName)}
				class="cursor-pointer"
			>
				<CopyIcon class="mr-2 size-5" />
				Copy Name
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				on:click={() => transferLead(lead)}
				class="cursor-pointer text-yellow-600 data-[highlighted]:text-yellow-600"
			>
				<HousePlusIcon class="mr-2 size-5" />
				Move In
			</DropdownMenu.Item>
			<DropdownMenu.Item
				on:click={() => deleteLead(lead.id)}
				class="cursor-pointer text-destructive data-[highlighted]:text-destructive"
			>
				<Trash2Icon class="mr-2 size-5" />
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

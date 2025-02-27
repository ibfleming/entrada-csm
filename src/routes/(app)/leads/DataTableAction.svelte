<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon, CopyIcon, Trash2Icon, HousePlusIcon } from 'lucide-svelte';
	import type { Lead, Resident } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import { addResident, removeLead } from '$lib/stores';

	export let lead: Lead;
	export let fullName: string;
	export let tableData: Writable<Lead[]>;

	function updateTableData(id: string) {
		tableData.update((data) => data.filter((item: Lead) => item.id !== id));
	}

	async function deleteLead(id: string) {
		try {
			const resp = await fetch(`/api/leads/${id}`, {
				method: 'DELETE'
			});

			const result = await resp.json();

			if (!resp.ok || !result.success) {
				throw new Error(result.error || 'Failed to delete lead');
			}

			// Update the table's UI
			updateTableData(id);
			// Remove the lead from the global store
			removeLead(id);

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

			// Update the table's UI
			updateTableData(lead.id);
			// Add the resident to the global store
			addResident(result.resident as Resident);
			// Remove the lead from the global store
			removeLead(lead.id);

			console.log('Lead successfully moved to resident:', result.resident);
		} catch (error) {
			console.error('Error tranferring lead to resident:', error);
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="button-focus-visible rounded-full text-muted-foreground transition-all hover:text-muted-foreground"
		>
			<span class="sr-only">Open menu</span>
			<MenuIcon />
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
				on:click={() => navigator.clipboard.writeText(fullName)}
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

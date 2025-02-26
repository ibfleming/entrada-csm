<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon, CopyIcon, Trash2Icon } from 'lucide-svelte';
	import type { Resident } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import { removeResident } from '$lib/stores';

	export let id: string;
	export let fullName: string;
	export let tableData: Writable<Resident[]>;

	function updateTableData(id: string) {
		tableData.update((data) => data.filter((item: Resident) => item.id !== id));
	}

	async function deleteResident(id: string) {
		try {
			const resp = await fetch(`/api/residents/${id}`, {
				method: 'DELETE'
			});

			const result = await resp.json();

			if (!resp.ok || !result.success) {
				throw new Error(result.error || 'Failed to delete lead');
			}

			// Update the table's UI
			updateTableData(id);
			// Remove the resident from the global store
			removeResident(id);

			console.log('Resident successfully deleted');
		} catch (error) {
			console.error('Error deleting resident:', error);
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
				on:click={() => deleteResident(id)}
				class="cursor-pointer text-destructive data-[highlighted]:text-destructive"
			>
				<Trash2Icon class="mr-2 size-5" />
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

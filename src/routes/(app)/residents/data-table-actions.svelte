<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon, CopyIcon, Trash2Icon, HousePlusIcon } from 'lucide-svelte';
	import type { Resident } from '$lib/types';
	import type { Writable } from 'svelte/store';

	export let id: string;
	export let fullName: string;
	export let tableData: Writable<Resident[]>;

	async function deleteResident(id: string) {
		try {
			const response = await fetch(`/api/residents/${id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to delete lead');
			}

			tableData.update((data) => data.filter((row: Resident) => row.id !== id));
		} catch (error) {
			console.error('Error deleting lead:', error);
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="button-focus-visible h-fit w-fit rounded-sm p-0.5"
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
				on:click={() => deleteResident(id)}
				class="cursor-pointer text-destructive data-[highlighted]:text-destructive"
			>
				<Trash2Icon class="mr-2 size-5" />
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<script lang="ts">
	import type { _ } from '$env/static/private';
	import type { Lead } from '$lib/types';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import DataTableActions from './data-table-actions.svelte';
	import * as Table from '$lib/components/ui/table';
	import { readable } from 'svelte/store';

	let { leads }: { leads: Lead[] } = $props();

	const table = createTable(readable(leads));
	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID'
		}),
		table.column({
			id: 'fullName',
			accessor: (row) => `${row.firstName} ${row.lastName}`,
			header: 'Full Name'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'phoneNumber',
			header: 'Phone Number',
			cell: ({ value }) => {
				const val = String(value);
				return `+1 (${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
			}
		}),
		table.column({
			accessor: 'floorPlan',
			header: 'Floor Plan'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			}
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{#if cell.column.id === 'fullName'}
										<div class="font-medium"><Render of={cell.render()} /></div>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

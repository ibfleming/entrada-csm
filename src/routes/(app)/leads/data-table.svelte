<script lang="ts">
	import type { Lead } from '$lib/types';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import DataTableActions from './data-table-actions.svelte';
	import DataTableCheckbox from './data-table-checkbox.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { ArrowUpDown, Eye } from 'lucide-svelte';
	import CreateLeadModal from './CreateLeadModal.svelte';

	let { leads, updateLeads } = $props();
	let tableStore: Writable<Lead[]> = writable(leads);

	// Sync props to store
	$effect(() => {
		tableStore.set(leads);
	});

	// Subscribe to store changes and update parent
	$effect(() => {
		const unsubscribe = tableStore.subscribe((value) => {
			if (value !== leads) {
				updateLeads(value);
			}
		});
		return unsubscribe;
	});

	const table = createTable(tableStore, {
		page: addPagination() /* { initialPageSize: 20 } */,
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			id: 'fullName',
			accessor: (row) => `${row.firstName} ${row.lastName}`,
			header: 'Lead Name'
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
				return `+${val.slice(0, 1)} (${val.slice(1, 4)}) ${val.slice(4, 7)}-${val.slice(7)}`;
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: false
				}
			}
		}),
		table.column({
			accessor: 'floorPlan',
			header: 'Floor Plan',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: false
				}
			}
		}),
		table.column({
			id: 'actions',
			accessor: (lead) => ({ id: lead.id, fullName: `${lead.firstName} ${lead.lastName}`, lead }),
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, {
					id: value.id,
					fullName: value.fullName,
					tableData: tableStore,
					lead: value.lead
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;
	const { hiddenColumnIds } = pluginStates.hide;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = $state(Object.fromEntries(ids.map((id) => [id, true])));

	const hidableCols = ['fullName', 'email', 'phoneNumber', 'floorPlan'];

	$effect(() => {
		$hiddenColumnIds = Object.entries(hideForId)
			.filter(([, hide]) => !hide)
			.map(([id]) => id);
	});
</script>

{#if leads.length === 0 || leads === undefined}
	<div class="p-16">
		<p class="text-center text-sm text-red-500">No leads found.</p>
	</div>
{:else}
	<div class="space-y-4 p-8">
		<div class="flex items-center justify-between">
			<div class="flex gap-4">
				<Input
					class="input-focus-visible max-w-sm shadow-md"
					placeholder="Filter emails or full name..."
					type="text"
					bind:value={$filterValue}
				/>
				<CreateLeadModal />
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						variant="outline"
						size="sm"
						builders={[builder]}
						class="button-focus-visible text-primary shadow-md hover:text-primary"
					>
						<Eye class="mr-1.5 size-5" strokeWidth={2} />
						Columns
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end" class="border-2 font-inter">
					{#each flatColumns as col}
						{#if hidableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem
								bind:checked={hideForId[col.id]}
								class="cursor-pointer font-medium text-foreground"
							>
								{col.header}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<!-- Data Table -->
		<div class="rounded-md border shadow-md">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow}
						<Subscribe rowAttrs={headerRow.attrs()}>
							<Table.Row>
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										<Table.Head
											{...attrs}
											class="[&:has([role=checkbox])]:pt-1
										[&:has([role=checkbox])]:text-center"
										>
											{#if cell.id === 'fullName' || cell.id === 'email'}
												<Button
													variant="ghost"
													class="button-focus-visible hover:text-muted-foreground"
													on:click={props.sort.toggle}
												>
													<Render of={cell.render()} />
													<ArrowUpDown class="ml-2 size-4" />
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
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
							<Table.Row
								{...rowAttrs}
								data-state={$selectedDataIds[row.id] && 'selected'}
								class="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
							>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell class="p-4" {...attrs}>
											{#if cell.column.id === 'id'}
												<div class="pt-1 text-center font-mono text-muted-foreground">
													<Render of={cell.render()} />
												</div>
											{:else if cell.column.id === 'fullName'}
												<div class="pl-4 text-left font-medium text-primary">
													<Render of={cell.render()} />
												</div>
											{:else if cell.column.id === 'email'}
												<div class="text-sm text-muted-foreground">
													<Render of={cell.render()} />
												</div>
											{:else if cell.column.id === 'phoneNumber'}
												<div class="text-sm font-light">
													<Render of={cell.render()} />
												</div>
											{:else if cell.column.id === 'floorPlan'}
												<div
													class="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
												>
													<Render of={cell.render()} />
												</div>
											{:else if cell.column.id === 'actions'}
												<div class="flex gap-2 outline-none ring-0">
													<Render of={cell.render()} />
												</div>
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
		<!-- Pagination -->
		<div class="flex items-center justify-between px-4">
			<div class="flex gap-2 text-sm text-muted-foreground">
				Page {$pageIndex + 1} of {$pageCount}
				<div class="text-sm text-muted-foreground/50">
					{#if $selectedDataIds !== undefined}
						({Object.keys($selectedDataIds).length} of {$pageRows.length} rows selected)
					{:else}
						(No rows selected)
					{/if}
				</div>
			</div>

			<div class="flex items-center justify-end space-x-4 text-primary">
				<Button
					variant="outline"
					class="button-focus-visible hover:text-primary"
					disabled={!$hasPreviousPage}
					on:click={() => ($pageIndex = 0)}>First</Button
				>
				<Button
					variant="outline"
					class="button-focus-visible hover:text-primary"
					disabled={!$hasPreviousPage}
					on:click={() => ($pageIndex = $pageIndex - 1)}>Previous</Button
				>
				<Button
					variant="outline"
					class="button-focus-visible hover:text-primary"
					disabled={!$hasNextPage}
					on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
				>
				<Button
					variant="outline"
					class="button-focus-visible hover:text-primary"
					disabled={!$hasNextPage}
					on:click={() => ($pageIndex = $pageCount - 1)}>Last</Button
				>
			</div>
		</div>
	</div>
{/if}

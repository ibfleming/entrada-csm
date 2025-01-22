<script lang="ts">
	import type { Lead } from '$lib/types';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns
	} from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import DataTableActions from './data-table-actions.svelte';
	import * as Table from '$lib/components/ui/table';
	import { readable } from 'svelte/store';
	import { ArrowUpDown, Eye, ChevronDown } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	let { leads }: { leads: Lead[] } = $props();

	const table = createTable(readable(leads), {
		page: addPagination() /* { initialPageSize: 20 } */,
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID',
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
				return `+1 (${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
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
			accessor: 'floorPlan',
			header: 'Floor Plan',
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
			id: 'actions',
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
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
	let { hiddenColumnIds } = pluginStates.hide;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = $state(Object.fromEntries(ids.map((id) => [id, true])));

	const hidableCols = ['id', 'fullName', 'email', 'phoneNumber', 'floorPlan'];

	$effect(() => {
		$hiddenColumnIds = Object.entries(hideForId)
			.filter(([, hide]) => !hide)
			.map(([id]) => id);
	});
</script>

{#if leads.length === 0 || leads === undefined}
	<div>
		<p class="text-center text-sm text-red-500">No leads found.</p>
	</div>
{:else}
	<div>
		<div class="flex items-center justify-between pb-4">
			<Input
				class="input-focus-visible max-w-sm"
				placeholder="Filter emails or full name..."
				type="text"
				bind:value={$filterValue}
			/>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						variant="outline"
						size="sm"
						builders={[builder]}
						class="button-focus-visible text-primary hover:text-primary"
					>
						<Eye class="mr-1.5 size-5" strokeWidth={2} />
						Columns
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end" class="border-2">
					{#each flatColumns as col}
						{#if hidableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem
								bind:checked={hideForId[col.id]}
								class="cursor-pointer font-semibold text-muted-foreground"
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
										<Table.Head {...attrs}>
											{#if cell.id === 'fullName' || cell.id === 'email'}
												<Button
													variant="ghost"
													class="button-focus-visible"
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
								class="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
							>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell class="p-4" {...attrs}>
											{#if cell.column.id === 'id'}
												<div class="font-mono text-muted-foreground">
													<Render of={cell.render()} />
												</div>
											{:else if cell.column.id === 'fullName'}
												<div class="font-medium text-primary">
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
		<div class="flex items-center justify-between px-2 py-4">
			<div class="text-sm text-muted-foreground">
				Page {$pageIndex + 1} of {$pageCount}
			</div>
			<div class="flex items-center justify-end space-x-4 text-primary">
				<Button
					variant="outline"
					class="button-focus-visible"
					on:click={() => ($pageIndex = $pageIndex - 1)}
					disabled={!$hasPreviousPage}>Previous</Button
				>
				<Button
					variant="outline"
					class="button-focus-visible"
					disabled={!$hasNextPage}
					on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
				>
			</div>
		</div>
	</div>
{/if}

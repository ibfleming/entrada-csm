<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import SearchComponent from '$lib/custom/Search.svelte';
	import { CircleUser, LogOut } from 'lucide-svelte';
	let { title = 'Company Name', user = null, leads = null, residents = null } = $props();
</script>

<header class="grid grid-cols-2 items-center justify-between p-4 @lg:px-8">
	<a class="w-fit outline-none ring-0" href="/dashboard">
		<h1
			class="relative bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text font-black lowercase text-transparent @xs:text-base @sm:text-xl @md:text-2xl"
		>
			{title}
		</h1>
	</a>

	<div class="flex items-center justify-end gap-4">
		<!-- Search -->
		<SearchComponent {leads} {residents} />

		<!-- 		<div
			role="button"
			tabindex="0"
			aria-label="Search input"
			class="zion-search-focus-visible flex h-8 max-w-sm flex-1 cursor-text items-center justify-items-start gap-1.5 rounded-md border border-gray-300 px-2 text-gray-600 shadow-md"
			onclick={focusInput}
			onfocus={focusInput}
			onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && focusInput()}
		>
			<Search strokeWidth={2.5} class="size-6 text-primary" />
			<input
				type="text"
				id="search"
				placeholder="Search all residents and leads..."
				autocomplete="off"
				autocorrect="off"
				spellcheck="false"
				class="w-full text-ellipsis border-none p-0 text-xs text-muted-foreground shadow-none transition duration-200 ease-in-out placeholder:italic focus:outline-none focus:ring-0"
				bind:this={inputRef}
			/>
			<kbd
				class="mono pointer-events-none rounded-sm bg-muted px-1 text-[12px] font-medium opacity-100"
				>Ctrl+K</kbd
			>
		</div> -->

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					title={user.username}
					builders={[builder]}
					class="button-focus-visible rounded-full bg-transparent p-2 drop-shadow-none hover:bg-accent focus-visible:ring-offset-0"
				>
					<span class="sr-only">Open menu</span>
					<CircleUser class="rounded-full text-primary shadow-md" />
				</Button>
			</DropdownMenu.Trigger>

			<!-- Profile -->
			<DropdownMenu.Content align="end" class="border-2">
				<DropdownMenu.Group>
					<DropdownMenu.Item asChild>
						<form method="POST" action="/api/auth/logout">
							<Button
								class="w-full items-center justify-center bg-destructive font-semibold hover:bg-destructive/90"
								type="submit"
								size="sm"
							>
								Logout
								<LogOut class="ml-2 size-4" />
							</Button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

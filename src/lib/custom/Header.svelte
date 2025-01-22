<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { CircleUser, Search } from 'lucide-svelte';
	let { title = 'Company Name', user = null } = $props();
	let inputRef: HTMLInputElement;
	function focusInput() {
		inputRef.focus();
	}
</script>

<header class="grid grid-cols-2 items-center justify-between p-4 @lg:px-8">
	<a class="w-fit outline-none ring-0" href="/dashboard">
		<h1 class="text-2xl font-black lowercase text-primary">{title}</h1>
	</a>
	<div class="flex items-center justify-end gap-4">
		<div
			role="button"
			tabindex="0"
			aria-label="Search input"
			class="zion-search-focus-visible flex h-8 max-w-sm flex-1 items-center justify-items-start gap-1.5 rounded-md border border-gray-300 px-2 text-gray-600 shadow-md"
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
				class="w-full text-ellipsis border-none p-0 text-sm text-muted-foreground shadow-none transition duration-200 ease-in-out placeholder:text-[12px] placeholder:text-xs placeholder:italic focus:outline-none focus:ring-0"
				bind:this={inputRef}
			/>
			<kbd
				class="mono pointer-events-none rounded-sm bg-muted px-1 text-[12px] font-medium opacity-100"
				>Ctrl+K</kbd
			>
		</div>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					class="button-focus-visible rounded-full bg-transparent p-2 shadow-none hover:bg-accent focus-visible:ring-offset-0"
				>
					<span class="sr-only">Open menu</span>
					<CircleUser class="text-primary" />
				</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content align="end" side="bottom" class="border-2 border-gray-600 font-inter">
				<DropdownMenu.Label class="text-primary">
					{#if user}
						{user.username}
					{:else}
						N/A
					{/if}
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item class="m-0 cursor-pointer p-0">
					<form method="POST" action="/api/auth/logout" class="h-full w-full">
						<button type="submit" class="h-full w-full p-1.5 text-left text-gray-600" tabIndex="-1"
							>Logout</button
						>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

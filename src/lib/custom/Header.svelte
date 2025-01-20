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

<header class="grid grid-cols-2 items-center justify-between p-4 px-8">
	<a class="w-fit outline-none ring-0" href="/dashboard">
		<h1 class="text-2xl font-black lowercase text-primary">{title}</h1>
	</a>
	<div class="flex items-center justify-end gap-4">
		<div
			role="button"
			tabindex="0"
			aria-label="Search input"
			class="flex h-8 max-w-2xl flex-1 items-center justify-items-start gap-1.5 rounded-md border border-gray-300 px-2 text-gray-600 shadow-md outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50 focus-within:ring-offset-2 hover:cursor-text focus:outline-none"
			onclick={focusInput}
			onfocus={focusInput}
			onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && focusInput()}
		>
			<Search class="size-5 text-primary" />
			<input
				type="text"
				id="search"
				autocomplete="off"
				autocorrect="off"
				spellcheck="false"
				class="m-0 w-full border-0 border-none p-0 text-sm shadow-none transition duration-200 ease-in-out focus:outline-none focus:ring-0"
				bind:this={inputRef}
			/>
		</div>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="ghost"
					builders={[builder]}
					size="icon"
					class="default-ring relative rounded-full focus:outline-none"
				>
					<span class="sr-only">Open menu</span>
					<CircleUser class="size-7 text-primary" />
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

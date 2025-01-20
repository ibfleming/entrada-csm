<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	let { title = 'Company Name', user = null } = $props();
	let inputRef: HTMLInputElement;
	function focusInput() {
		inputRef.focus();
	}
</script>

<header class="flex items-center justify-between px-8 py-4">
	<a class="outline-none ring-0" href="/dashboard">
		<h1 class="flex items-center gap-4">
			<span class="text-2xl font-bold uppercase text-primary">{title}</span>
			<span class="mt-2 text-xs text-neutral-600">by Ian Fleming</span>
		</h1>
	</a>
	<div class="flex items-center justify-end gap-4">
		<div
			role="button"
			tabindex="0"
			aria-label="Search input"
			class="flex h-8 w-full flex-1 items-center justify-items-start gap-1.5 rounded-md border border-gray-300 px-2 text-gray-600 shadow-md outline-none focus-within:ring-1 focus-within:ring-primary hover:cursor-text"
			onclick={focusInput}
			onfocus={focusInput}
			onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && focusInput()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="#4b916e"
				class="size-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
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
					size="icon"
					variant="ghost"
					class="hover:text-primary-dark size-7 text-primary hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50 focus-visible:ring-offset-2"
					builders={[builder]}
				>
					<svg
						data-slot="icon"
						aria-hidden="true"
						fill="none"
						stroke-width="2"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						class="size-7"
					>
						<path
							d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
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

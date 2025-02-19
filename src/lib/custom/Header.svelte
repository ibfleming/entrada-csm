<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import SearchComponent from '$lib/custom/Search.svelte';
	import { CircleUser, LogOut } from 'lucide-svelte';
	let { title = 'Company Name', user } = $props();
</script>

<header class="flex items-center justify-between gap-2 p-2 @lg:p-4">
	<!-- Title -->
	<div class="flex min-w-fit items-center justify-start overflow-ellipsis px-2">
		<a class="outline-none ring-0" href="/dashboard">
			<span class="font-black lowercase text-primary @lg:text-xl">{title}</span>
		</a>
	</div>

	<!-- Search -->
	<div class="flex w-3/4 items-center justify-end gap-2 @lg:gap-4">
		<SearchComponent />

		<!-- User -->
		<div class="flex items-center justify-end">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						title={user.username}
						builders={[builder]}
						class="button-focus-visible rounded-full bg-transparent p-2 drop-shadow-none transition-all hover:bg-accent focus-visible:ring-offset-0"
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
	</div>
</header>

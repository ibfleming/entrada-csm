<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Leasing CMS - Login</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-100 @container">
	<div class="w-full max-w-xl bg-white p-8 shadow-md @lg:rounded-lg @lg:p-16">
		<form method="post" action="?/login" use:enhance class="space-y-4">
			<div>
				<label class="text-md block font-medium text-gray-600">
					Username
					<input
						id="username"
						name="username"
						type="text"
						class="text-gry-600 mt-2.5 w-full rounded-md border border-gray-300 bg-white p-1.5 px-2 text-sm font-normal shadow-sm outline-none transition duration-200 ease-in-out focus-within:ring-2 focus-within:ring-primary"
						required
					/>
				</label>
			</div>
			<div>
				<label class="text-md block font-medium text-gray-600">
					Password
					<input
						id="password"
						name="password"
						type="password"
						class="text-gry-600 mb-2.5 mt-2.5 w-full rounded-md border border-gray-300 bg-white p-1.5 px-2 text-sm font-normal shadow-sm outline-none transition duration-200 ease-in-out focus-within:ring-2 focus-within:ring-primary"
						required
					/>
				</label>
			</div>
			<div class="mt-5 flex items-center justify-between">
				<button
					type="submit"
					class="hover:bg-primary-dark w-full rounded-md bg-primary px-4 py-2 font-medium text-white shadow-md transition duration-200"
				>
					Login
				</button>
			</div>
			<div class="flex items-center justify-between">
				<button
					type="submit"
					formaction="?/register"
					class="w-full rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-600 shadow-md transition duration-200 hover:bg-gray-300"
				>
					Register
				</button>
			</div>
		</form>
		{#if form?.message}
			<p class="p-4 text-center text-sm font-semibold text-red-500">{form.message}</p>
		{/if}
	</div>
</div>

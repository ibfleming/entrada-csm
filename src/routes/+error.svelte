<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card';

	let message = '';

	$: {
		switch (page.status) {
			case 404:
				message = 'Page not found';
				break;
			case 500:
				message = 'Internal Server Error';
				break;
			case 403:
				message = 'Forbidden';
				break;
			case 401:
				message = 'Unauthorized';
				break;
			default:
				message = 'Error';
				break;
		}
	}
</script>

<svelte:head>
	<title>{page.status}</title>
</svelte:head>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	<Card.Root class="bg-primary">
		<Card.Content class="flex flex-col items-center justify-center gap-2 font-inter text-white">
			<h1 class="text-8xl font-bold">{page.status}</h1>
			<h2 class="text-xl font-bold uppercase">{message}</h2>
		</Card.Content>
	</Card.Root>
	<a href="/" class="text-sky-950 underline">Go back home</a>
</main>

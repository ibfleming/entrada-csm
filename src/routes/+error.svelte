<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';

	let message = '';
	let description = '';

	$: {
		switch (page.status) {
			case 404:
				message = 'Page not found';
				description =
					'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
				break;
			case 500:
				message = 'Internal Server Error';
				description =
					'Something went wrong on our end. Please try again later or contact support if the issue persists.';
				break;
			case 403:
				message = 'Forbidden';
				description = 'You do not have permission to access this page.';
				break;
			case 401:
				message = 'Unauthorized';
				description = 'You need to log in to access this page.';
				break;
			default:
				message = 'Error';
				description = 'An unexpected error occurred. Please try again later.';
		}
	}
</script>

<svelte:head>
	<title>{page.status}</title>
</svelte:head>

<div class="flex h-screen w-screen items-center justify-center overflow-hidden">
	<div class="flex flex-col items-center justify-center text-center text-primary">
		<h1 class="font-inter text-9xl font-black">{page.status}</h1>
		<h2 class="text-2xl font-bold uppercase leading-relaxed">{message}</h2>
		<p class="my-4 w-2/3 text-sm">{description}</p>
		<Button href="/dashboard" class="hover:bg-tertiary hover:text-inherit" variant="outline">
			Homepage
		</Button>
	</div>
</div>

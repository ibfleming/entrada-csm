<script lang="ts">
	import { page } from '$app/state';

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

<div>
	<h1>{page.status}</h1>
	<h2>{message}</h2>
</div>

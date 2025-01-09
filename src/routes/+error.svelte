<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex items-center justify-center p-8">
	<div class="rounded-md bg-primary p-8 text-center text-red-200 shadow-md">
		<h1 class="font-inter text-5xl font-bold">{page.status}</h1>
		<a href="/" class="mt-4 inline-block px-4 py-2 text-white underline">Back to Homepage</a>
	</div>
</div>

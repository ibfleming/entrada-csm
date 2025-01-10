<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	let { children } = $props();
</script>

<Header />

{@render children()}

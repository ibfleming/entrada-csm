<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	let { children } = $props();
</script>

<Header title="Entrada" />

{@render children()}

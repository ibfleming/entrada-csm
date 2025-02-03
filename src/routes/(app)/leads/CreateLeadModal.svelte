<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { PlusIcon } from 'lucide-svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" class="px-1.5 shadow-md">
			<PlusIcon class="size-8" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>Create Lead Modal</Dialog.Content>
</Dialog.Root>

<!-- class="relative flex  cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-green-600 outline-none hover:bg-accent data-[disabled]:pointer-events-none data-[highlighted]:bg-accent  data-[highlighted]:text-green-600 data-[disabled]:opacity-50" -->

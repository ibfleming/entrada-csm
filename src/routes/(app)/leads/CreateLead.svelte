<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';

	import { PlusIcon } from 'lucide-svelte';
	import { createLeadFormSchema } from '$lib/server/db/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	//export let formType: SuperValidated<Infer<CreateLeadFormSchema>>;

	const { form: formData, enhance } = superForm(data.form, {
		validators: zodClient(createLeadFormSchema)
	});

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	let open = $state(false);
	let processing = $state(false);
</script>

<Dialog.Root bind:open>
	<!-- Button Trigger -->
	<Dialog.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			size="icon"
			class="button-focus-visible border px-1.5 shadow-sm transition-all"
		>
			<PlusIcon class="size-8" />
		</Button>
	</Dialog.Trigger>

	<!-- Dialog -->
	<Dialog.Portal>
		<Dialog.Overlay />
		<Dialog.Content>
			<Dialog.Title>Create a new lead</Dialog.Title>
			<form
				method="POST"
				action="?/create"
				onsubmit={() => {
					processing = true;
					wait(1000).then(() => {
						processing = false;
						open = false;
					});
				}}
				use:enhance
				class="flex flex-col gap-4"
			>
				<!-- First Name -->
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">First Name</Label>
					<Input type="text" name="first_name" />
				</div>

				<!-- Last Name -->
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Last Name</Label>
					<Input type="text" name="last_name" />
				</div>

				<!-- Email -->
				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Email</Label>
					<Input type="email" name="email" />
				</div>

				<div class="flex justify-start gap-4">
					<Button type="submit" class="max-w-fit">
						{#if processing}
							Processing...
						{:else}
							Submit
						{/if}
					</Button>

					<Button class="max-w-fit bg-blue-500 hover:bg-blue-500/90">Reset</Button>

					<Dialog.Close let:builder asChild>
						<Button builders={[builder]} class="max-w-fit bg-red-500 hover:bg-red-500/90"
							>Close</Button
						>
					</Dialog.Close>
				</div>
			</form>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

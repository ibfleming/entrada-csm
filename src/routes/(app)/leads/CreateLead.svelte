<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { PlusIcon } from 'lucide-svelte';
	import { createLeadFormSchema, type CreateLeadFormSchema } from './schema';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';

	let open = $state(false);

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const { data }: { data: SuperValidated<Infer<CreateLeadFormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(createLeadFormSchema)
	});

	const { form: formData, enhance, errors } = form;
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
					wait(1000).then(() => (open = false));
				}}
				use:enhance
			>
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input {...attrs} bind:value={$formData.firstName} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Submit</Form.Button>
			</form>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

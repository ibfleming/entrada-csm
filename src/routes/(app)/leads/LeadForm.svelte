<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { leadFormSchema, type LeadFormSchema } from './schema';
	import { browser } from '$app/environment';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { PlusIcon } from 'lucide-svelte';

	let { data }: { data: SuperValidated<Infer<LeadFormSchema>> } = $props();

	let open = $state(true);

	const form = superForm(data, {
		validators: zodClient(leadFormSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				open = false;
				form.reset();
			}
		}
	});

	const { form: formData, enhance } = form;

	const selectedFloorPlan = $derived(
		$formData.floorPlan
			? {
					label: $formData.floorPlan,
					value: $formData.floorPlan
				}
			: undefined
	);

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	$effect(() => {
		$formData.firstName = 'Ian';
		$formData.lastName = 'Fleming';
		$formData.email = 'ianfleming678@gmail.com';
		$formData.phoneNumber = '2086517617';
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class={buttonVariants({
			variant: 'default',
			size: 'icon',
			class: 'button-focus-visible border shadow-sm transition-all'
		})}
	>
		<PlusIcon />
	</Dialog.Trigger>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title class="font-inter text-primary">Create a new lead</Dialog.Title>
		</Dialog.Header>

		<!-- Form -->
		<form method="POST" action="?/create" class="font-inter" use:enhance>
			<div class="flex items-start justify-center gap-4 pb-4">
				<!-- First Name -->
				<Form.Field {form} name="firstName" class="flex-1">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input
							type="text"
							class="input-focus-visible"
							{...attrs}
							bind:value={$formData.firstName}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Last Name -->
				<Form.Field {form} name="lastName" class="flex-1">
					<Form.Control let:attrs>
						<Form.Label>Last Name</Form.Label>
						<Input
							type="text"
							class="input-focus-visible"
							{...attrs}
							bind:value={$formData.lastName}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="pb-4">
				<!-- Email -->
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input
							type="email"
							class="input-focus-visible"
							{...attrs}
							bind:value={$formData.email}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="pb-4">
				<!-- Phone -->
				<Form.Field {form} name="phoneNumber">
					<Form.Control let:attrs>
						<Form.Label>Phone Number</Form.Label>
						<Input
							type="tel"
							class="input-focus-visible"
							{...attrs}
							bind:value={$formData.phoneNumber}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="pb-4">
				<!-- Floorplan -->
				<Form.Field {form} name="floorPlan">
					<Form.Control let:attrs>
						<Form.Label>Floor Plan</Form.Label>
						<Select.Root
							selected={selectedFloorPlan}
							onSelectedChange={(v) => {
								v && ($formData.floorPlan = v.value);
							}}
						>
							<Select.Trigger class="button-focus-visible focus-visible:ring-primary/50" {...attrs}>
								<Select.Value placeholder="Select a floor plan" />
							</Select.Trigger>
							<Select.Content class="font-inter ">
								<Select.Item value="2 BED 2 BATH" label="2 BED 2 BATH" />
								<Select.Item value="3 BED 3 BATH" label="3 BED 3 BATH" />
							</Select.Content>
						</Select.Root>
						<input
							hidden
							bind:value={$formData.floorPlan}
							name={attrs.name}
							class="input-focus-visible"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<!-- Submit -->
			<div class="flex gap-4">
				<Form.Button>Submit</Form.Button>
				<Dialog.Close asChild let:builder>
					<Button builders={[builder]} variant="destructive">Cancel</Button>
				</Dialog.Close>
			</div>

			<!-- Debugging 
			{#if browser}
				<SuperDebug data={$formData} />
			{/if} -->
		</form>
	</Dialog.Content>
</Dialog.Root>

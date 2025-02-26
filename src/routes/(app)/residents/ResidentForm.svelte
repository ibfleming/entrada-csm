<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { residentFormSchema, type ResidentFormSchema } from './schema';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Writable } from 'svelte/store';
	import type { Resident } from '$lib/types';
	import { PlusIcon } from 'lucide-svelte';

	type ResidentFormProps = {
		data: SuperValidated<Infer<ResidentFormSchema>>;
		tableData: Writable<Resident[]>;
	};

	let { data, tableData }: ResidentFormProps = $props();

	let open = $state(false);

	const form = superForm(data, {
		validators: zodClient(residentFormSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				if (result.data) {
					$tableData = [...$tableData, result.data.resident as Resident];
					open = false;
				}
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

	$effect(() => {
		$formData.firstName = 'Ian';
		$formData.lastName = 'Fleming';
		$formData.email = 'ianfleming678@gmail.com';
		$formData.phoneNumber = '12086517617';
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
			<Dialog.Title class="font-inter text-primary">Create a new resident</Dialog.Title>
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
								if (v) {
									$formData.floorPlan = v.value;
								}
							}}
						>
							<Select.Trigger class="button-focus-visible focus-visible:ring-primary/50" {...attrs}>
								<Select.Value placeholder="Select a floor plan" />
							</Select.Trigger>
							<Select.Content class="font-inter ">
								<Select.Item value="2 BED 2 BATH" label="2 BED 2 BATH" class="cursor-pointer" />
								<Select.Item value="3 BED 3 BATH" label="3 BED 3 BATH" class="cursor-pointer" />
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
		</form>
	</Dialog.Content>
</Dialog.Root>

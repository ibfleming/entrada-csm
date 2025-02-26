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

	const selectedLeaseTerm = $derived(
		$formData.leaseTerm
			? {
					label: $formData.leaseTerm,
					value: $formData.leaseTerm
				}
			: undefined
	);

	const selectedStudentStatus = $derived(
		$formData.studentStatus
			? {
					label: $formData.studentStatus,
					value: $formData.studentStatus
				}
			: undefined
	);
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
	<Dialog.Content class="max-h-screen max-w-2xl overflow-scroll">
		<Dialog.Header>
			<Dialog.Title class="font-inter text-primary">Create a new resident</Dialog.Title>
		</Dialog.Header>

		<!-- Form -->
		<form method="POST" action="?/create" class="font-inter" use:enhance>
			<div class="flex flex-row gap-4">
				<!-- COLUMN 1 -->
				<div class="flex-1">
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
									placeholder="example@mail.com"
									{...attrs}
									bind:value={$formData.email}
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>

					<div class="flex items-start justify-center gap-4 pb-4">
						<!-- Phone -->
						<Form.Field {form} name="phoneNumber" class="flex-1">
							<Form.Control let:attrs>
								<Form.Label>Phone Number</Form.Label>
								<Input
									type="tel"
									class="input-focus-visible"
									placeholder="01112223333"
									{...attrs}
									bind:value={$formData.phoneNumber}
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Birth Date -->
						<Form.Field {form} name="birthDate" class="flex-1">
							<Form.Control let:attrs>
								<Form.Label>Birth Date</Form.Label>
								<Input
									type="text"
									class="input-focus-visible"
									placeholder="YYYY-MM-DD"
									{...attrs}
									bind:value={$formData.birthDate}
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>

				<!-- COLUMN 2 -->
				<div class="flex-1">
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
									<Select.Trigger
										class="button-focus-visible focus-visible:ring-primary/50"
										{...attrs}
									>
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

					<div class="pb-4">
						<!-- Student Status -->
						<Form.Field {form} name="studentStatus">
							<Form.Control let:attrs>
								<Form.Label>Student Status</Form.Label>
								<Select.Root
									selected={selectedStudentStatus}
									onSelectedChange={(v) => {
										if (v) {
											$formData.studentStatus = v.value;
										}
									}}
								>
									<Select.Trigger
										class="button-focus-visible focus-visible:ring-primary/50"
										{...attrs}
									>
										<Select.Value placeholder="Select a floor plan" />
									</Select.Trigger>
									<Select.Content class="font-inter ">
										<Select.Item value="STUDENT" label="STUDENT" class="cursor-pointer" />
										<Select.Item value="NON-STUDENT" label="NON-STUDENT" class="cursor-pointer" />
										<Select.Item value="OTHER" label="OTHER" class="cursor-pointer" />
									</Select.Content>
								</Select.Root>
								<input
									hidden
									bind:value={$formData.studentStatus}
									name={attrs.name}
									class="input-focus-visible"
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>

					<div class="pb-4">
						<!-- Lease Term -->
						<Form.Field {form} name="leaseTerm">
							<Form.Control let:attrs>
								<Form.Label>Lease Term</Form.Label>
								<Select.Root
									selected={selectedLeaseTerm}
									onSelectedChange={(v) => {
										if (v) {
											$formData.leaseTerm = v.value;
										}
									}}
								>
									<Select.Trigger
										class="button-focus-visible focus-visible:ring-primary/50"
										{...attrs}
									>
										<Select.Value placeholder="Select a floor plan" />
									</Select.Trigger>
									<Select.Content class="font-inter ">
										<Select.Item value="2024-2025" label="2024-2025" class="cursor-pointer" />
										<Select.Item value="2025-2026" label="2025-2026" class="cursor-pointer" />
										<Select.Item value="2026-2027" label="2026-2027" class="cursor-pointer" />
									</Select.Content>
								</Select.Root>
								<input
									hidden
									bind:value={$formData.leaseTerm}
									name={attrs.name}
									class="input-focus-visible"
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
			</div>

			<!-- SUBMIT -->
			<div class="flex gap-4">
				<Form.Button>Submit</Form.Button>
				<Dialog.Close asChild let:builder>
					<Button builders={[builder]} variant="destructive">Cancel</Button>
				</Dialog.Close>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>

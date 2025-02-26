import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { residentFormSchema } from './schema';
import { fail } from '@sveltejs/kit';
import { db, resident } from '$lib';
import { addResident } from '$lib/stores';

export const load: PageServerLoad = async (event) => {
	const { residents } = await event.parent();
	return { residents, form: await superValidate(zod(residentFormSchema)) };
};

export const actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(residentFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const result = await db.transaction(async (tx) => {
				const newResident = await tx
					.insert(resident)
					.values({
						firstName: form.data.firstName,
						lastName: form.data.lastName,
						email: form.data.email,
						phoneNumber: Number(form.data.phoneNumber),
						floorPlan: form.data.floorPlan,
						leaseTerm: form.data.leaseTerm,
						birthDate: form.data.birthDate,
						studentStatus: form.data.studentStatus
					})
					.returning();

				if (newResident.length !== 1) {
					throw new Error('Failed to insert resident');
				}

				return newResident[0];
			});

			addResident(result);

			return { form, success: true, resident: result };
		} catch (error) {
			return fail(500, { form, error });
		}
	}
} satisfies Actions;

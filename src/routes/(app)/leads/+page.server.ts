import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { leadFormSchema } from './schema';
import { fail } from '@sveltejs/kit';
import { db, lead } from '$lib';
import { leadsStore } from '$lib/stores';

export const load: PageServerLoad = async (event) => {
	const { leads } = await event.parent();
	return { leads, form: await superValidate(zod(leadFormSchema)) };
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(leadFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const result = await db.transaction(async (tx) => {
				const newLead = await tx
					.insert(lead)
					.values({
						firstName: form.data.firstName,
						lastName: form.data.lastName,
						email: form.data.email,
						phoneNumber: Number(form.data.phoneNumber),
						floorPlan: form.data.floorPlan
					})
					.returning();

				if (newLead.length !== 1) {
					throw new Error('Failed to insert lead');
				}

				return newLead[0];
			});

			leadsStore.update((leads) => [...leads, result]);

			return { form, success: true, lead: result };
		} catch (error) {
			return fail(500, { form, error });
		}
	}
};

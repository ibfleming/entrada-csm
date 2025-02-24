import { createLeadFormSchema } from '$lib/server/db/schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { leads } = await event.parent();
	const form = await superValidate(zod(createLeadFormSchema));
	return { leads: leads, form: form };
};

export const actions: Actions = {
	create: async (event) => {
		console.log('create lead');
	}
};

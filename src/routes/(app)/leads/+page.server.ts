import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { createLeadFormSchema } from './schema';

export const load: PageServerLoad = async (event) => {
	await event.parent();

	return { form: await superValidate(zod(createLeadFormSchema)) };
};

export const actions: Actions = {
	create: async (event) => {
		console.log('create lead');
	}
};

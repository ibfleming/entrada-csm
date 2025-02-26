import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { leadFormSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	await event.parent();
	return { form: await superValidate(zod(leadFormSchema)) };
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(leadFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Do something with the form data
		console.log(form);

		return { form };
	}
};

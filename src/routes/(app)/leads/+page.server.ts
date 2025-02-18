import type { Actions } from './$types';

export const load = async (event) => {
	const data = await event.parent();
	return { leads: data.leads };
};

export const actions = {
	createLead: async (event) => {
		// ...
	}
} satisfies Actions;

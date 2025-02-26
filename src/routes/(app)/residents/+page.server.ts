import type { Actions } from './$types';

export const load = async (event) => {
	const data = await event.parent();
	return { residents: data.residents };
};

export const actions = {
	createResident: async () => {
		// ...
	}
} satisfies Actions;

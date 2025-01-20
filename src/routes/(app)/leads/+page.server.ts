import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/api/auth/login');
	}

	const leads = await event.fetch('/api/lead');
	return { leads: await leads.json() };
};

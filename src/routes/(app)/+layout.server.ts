import { lead, db } from '$lib';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/api/auth/login');
	}

	const leads = await db.select().from(lead);

	return { user: event.locals.user, leads };
};

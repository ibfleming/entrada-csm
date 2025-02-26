import { db, lead, resident } from '$lib';
import type { Lead, Resident } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/api/auth/login');
	}

	const leads: Lead[] = await db.select().from(lead);
	const residents: Resident[] = await db.select().from(resident);

	return { user: event.locals.user, leads, residents };
};

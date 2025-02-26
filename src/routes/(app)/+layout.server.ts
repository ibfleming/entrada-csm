import { db, lead, resident } from '$lib';
import type { Lead, Resident } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/api/auth/login');
	}

	const leads: Lead[] = await db.select().from(lead).limit(100);
	const residents: Resident[] = await db.select().from(resident).limit(100);

	return { user: event.locals.user, leads, residents };
};

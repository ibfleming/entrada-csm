import { db, lead, resident } from '$lib';
import { count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await event.parent();

	const leadCount = await db.select({ count: count() }).from(lead);
	const residentCount = await db.select({ count: count() }).from(resident);

	return { leadCount, residentCount };
};

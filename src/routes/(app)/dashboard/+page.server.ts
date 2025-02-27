import { db, lead, resident } from '$lib';
import { count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { leads, residents } = await event.parent();

	const leadCount = leads.length;
	const residentCount = residents.length;

	//const [{ count: leadCount }] = await db.select({ count: count() }).from(lead);
	//const [{ count: residentCount }] = await db.select({ count: count() }).from(resident);

	return { leadCount, residentCount };
};

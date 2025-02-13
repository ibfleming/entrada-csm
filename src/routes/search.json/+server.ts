import { db, lead, resident } from '$lib';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const leads = await db.select().from(lead);
	const residents = await db.select().from(resident);
	return new Response(JSON.stringify({ leads: leads, residents: residents }), {
		status: 200
	});
};

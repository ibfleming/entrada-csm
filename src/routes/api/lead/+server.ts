import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { dbUtils } from '$lib';
import { lead } from '$lib/server/db/schema';

export const GET: RequestHandler = async () => {
	const dbConnection = await dbUtils.checkDatabaseConnection(db);
	if (!dbConnection) {
		console.error('Database connection failed');
		return new Response(
			JSON.stringify({ status: 'error', message: 'Database connection failed' }),
			{
				status: 500
			}
		);
	}
	const leads = await db.select().from(lead);
	return new Response(JSON.stringify(leads), {
		status: 200
	});
};

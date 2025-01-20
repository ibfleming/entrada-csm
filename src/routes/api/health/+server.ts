import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { dbUtils } from '$lib';

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
	return new Response(JSON.stringify({ status: 'ok', message: 'Database connection success' }), {
		status: 200
	});
};

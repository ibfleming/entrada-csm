import type { RequestHandler } from '@sveltejs/kit';
import { db, resident } from '$lib';
import { eq } from 'drizzle-orm';

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const id = String(params.id); // Convert param to number

		if (id === null || id === undefined) {
			return new Response(JSON.stringify({ success: false, error: 'Invalid ID' }), { status: 400 });
		}

		// Execute DELETE operation and return affected row(s)
		const result = await db
			.delete(resident)
			.where(eq(resident.id, id))
			.returning({ id: resident.id });

		if (result.length > 0) {
			return new Response(JSON.stringify({ success: true, deletedId: result[0].id }), {
				status: 200
			});
		} else {
			return new Response(JSON.stringify({ success: false, error: 'Resident not found' }), {
				status: 404
			});
		}
	} catch (error) {
		console.error('Error deleting resident:', error);
		return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
			status: 500
		});
	}
};

import { json } from '@sveltejs/kit';
import { db, lead, resident } from '$lib';
import { eq } from 'drizzle-orm';
import type { Lead } from '$lib/types';

export async function POST({ request }) {
	try {
		const leadData: Lead = await request.json();

		// Validate required fields
		if (
			!leadData.id ||
			!leadData.firstName ||
			!leadData.lastName ||
			!leadData.email ||
			!leadData.phoneNumber ||
			!leadData.floorPlan
		) {
			return json({ success: false, error: 'Missing required lead data' }, { status: 400 });
		}

		// Use transaction for consistency
		const result = await db.transaction(async (tx) => {
			// Insert new resident
			const insertRes = await tx
				.insert(resident)
				.values({
					firstName: leadData.firstName,
					lastName: leadData.lastName,
					email: leadData.email,
					phoneNumber: leadData.phoneNumber,
					floorPlan: leadData.floorPlan,
					leaseTerm: '2025-2026',
					birthDate: new Date(),
					studentStatus: 'STUDENT'
				})
				.returning();

			if (insertRes.length !== 1) {
				throw new Error('Failed to insert resident');
			}

			// Delete the original lead
			const delLead = await tx
				.delete(lead)
				.where(eq(lead.id, leadData.id))
				.returning({ id: lead.id });

			if (delLead.length !== 1) {
				throw new Error('Failed to delete lead');
			}

			return insertRes[0]; // Return resident
		});

		return json({ success: true, resident: result });
	} catch (error) {
		console.error('/api/leads/transfer - Error:', error);

		let errorMessage = 'Failed to convert lead to resident';

		if (error instanceof Error) {
			errorMessage = error.message.includes('insert resident')
				? 'Database error while inserting resident'
				: error.message.includes('delete lead')
					? 'Database error while deleting lead'
					: error.message;
		}

		return json({ success: false, error: errorMessage }, { status: 500 });
	}
}

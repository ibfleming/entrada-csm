import { json } from '@sveltejs/kit';
import { db, lead, resident } from '$lib';
import { eq } from 'drizzle-orm';
import type { Lead, Resident } from '$lib/types';

export async function POST({ request }) {
	try {
		const leadData: Lead = await request.json();

		// Create new resident from lead data
		const newResident: Resident = {
			id: crypto.randomUUID(),
			firstName: leadData.firstName,
			lastName: leadData.lastName,
			email: leadData.email,
			phoneNumber: leadData.phoneNumber,
			floorPlan: leadData.floorPlan,
			leaseTerm: '2025-2026',
			birthDate: new Date(),
			studentStatus: 'STUDENT',
			createdAt: new Date()
		};

		// Insert the new resident
		await db.insert(resident).values(newResident);

		// Delete the original lead
		await db.delete(lead).where(eq(lead.id, leadData.id));

		return json({ success: true, resident: newResident });
	} catch (error) {
		console.error('Error converting lead to resident:', error);
		return json({ success: false, error: 'Failed to convert lead to resident' }, { status: 500 });
	}
}

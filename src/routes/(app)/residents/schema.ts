import { z } from 'zod';

export const residentFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	phoneNumber: z.string().min(11),
	floorPlan: z.enum(['2 BED 2 BATH', '3 BED 3 BATH']).default('2 BED 2 BATH'),
	leaseTerm: z.enum(['2024-2025', '2025-2026', '2026-2027']).default('2024-2025'),
	birthDate: z.string().date(),
	studentStatus: z.enum(['STUDENT', 'NON-STUDENT', 'OTHER']).default('STUDENT')
});

export type ResidentFormSchema = typeof residentFormSchema;

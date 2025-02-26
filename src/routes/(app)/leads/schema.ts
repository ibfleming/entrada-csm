import { z } from 'zod';

export const leadFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	phoneNumber: z.string().min(10),
	floorPlan: z.enum(['2 BED 2 BATH', '3 BED 3 BATH'])
});

export type LeadFormSchema = typeof leadFormSchema;

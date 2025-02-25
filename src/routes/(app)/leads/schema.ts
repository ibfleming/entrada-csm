import { z } from 'zod';

export const createLeadFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	phoneNumber: z.string().min(10),
	floorPlan: z.enum(['2x2', '3x3'])
});

export type CreateLeadFormSchema = typeof createLeadFormSchema;

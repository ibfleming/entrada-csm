import { text, integer, timestamp, bigint, pgTableCreator } from 'drizzle-orm/pg-core';

const pgTable = pgTableCreator((name) => `housing_${name}`);

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const lead = pgTable('lead', {
	id: text('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	phoneNumber: bigint({ mode: 'number' }).notNull(),
	floorPlan: text('floor_plan').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull()
});

export const resident = pgTable('residents', {
	id: text('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	phoneNumber: bigint({ mode: 'number' }).notNull(),
	floorPlan: text('floor_plan').notNull(),
	leaseTerm: text('lease_term').notNull(),
	birthDate: timestamp('birth_date', { withTimezone: true, mode: 'date' }).notNull(),
	studentStatus: text('student_status').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Lead = typeof lead.$inferSelect;

export type Resident = typeof resident.$inferSelect;

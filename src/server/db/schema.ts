// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  date,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `entrada_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = createTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).unique().notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  phone_type: varchar("phone_type").notNull().default("mobile"),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  middle_name: varchar("middle_name", { length: 256 }),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  gender: varchar("gender").notNull(),
  birth_date: date("birth_date", { mode: "string" }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).$onUpdate(() => new Date()),
});

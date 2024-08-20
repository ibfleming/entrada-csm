import { db, conn } from "~/server/db";
import { type Table, getTableName, sql } from "drizzle-orm";
import * as schema from "~/server/db/schema";
import * as seeds from "./seeds";

if (process.env.DB_SEEDING === "false") {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

for (const table of [schema.users, schema.posts]) {
  // await db.delete(table); // clear tables without truncating / resetting ids
  await resetTable(db, table);
}

// Seed the database
await seeds.user();

// Close the connection
await conn.end();

console.log("✅ Database seed completed succesfully!\n");

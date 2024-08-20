import { db, conn } from "~/server/db";
import { type Table, getTableName, sql } from "drizzle-orm";
import * as schema from "~/server/db/schema";

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

for (const table of [schema.users, schema.posts]) {
  await resetTable(db, table);
}

await conn.end();

console.log("✅ Database wipe completed successfully!\n");

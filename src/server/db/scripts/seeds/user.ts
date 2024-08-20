import * as schema from "~/server/db/schema";
import { db } from "~/server/db";
import users from "./data/user.json";

export default async function seed() {
  await Promise.all(
    users.map(async (user) => {
      await db
        .insert(schema.users)
        .values({ ...user })
        .returning();
    }),
  );
}

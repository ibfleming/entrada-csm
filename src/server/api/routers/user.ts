import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { residentSchema } from "~/lib/types";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  /*
   * test: publicProcedure
   * Test the tRPC API.
   */
  test: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `User tRPC: ${input.text}`,
      };
    }),

  /*
   * status: publicProcedure
   * Query the database real quick to check if it's online.
   */
  status: publicProcedure.query(async ({ ctx }) => {
    try {
      await ctx.db.query.users.findFirst();
      return { online: true };
    } catch (error) {
      console.error("[TRPC] user.status error: ", error);
      return { online: false };
    }
  }),

  /*
   * fetchUsers: publicProcedure
   * Fetch all the users current in the database.
   */
  fetchUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findMany({
      orderBy: (user, { asc }) => [asc(user.created_at)],
    });
    return users;
  }),

  /*
   * deleteUser: publicProcedure
   * Delete a user from the user table by id.
   */
  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(users).where(eq(users.id, input.id)).returning();
    }),

  /*
   * createUser: publicProcedure
   * Create a new user to the user table.
   */
  createUser: publicProcedure
    .input(residentSchema)
    .mutation(async ({ ctx, input }) => {
      const randomNumbers = Math.floor(Math.random() * 1000);
      const genUsername =
        `${input.first_name[0]}${input.last_name.slice(0, 4)}${randomNumbers}`.toLowerCase();

      // Check for existing username, check if the username equals the generated username
      const existingUser = await ctx.db.query.users.findFirst({
        where: (users, { eq, or }) =>
          or(eq(users.username, genUsername), eq(users.email, input.email)),
      });

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Username or email has already been taken!`,
        });
      } else {
        await ctx.db.insert(users).values({
          username: genUsername,
          phone: input.phone,
          phone_type: input.phone_type,
          email: input.email,
          password: "password",
          first_name: input.first_name,
          middle_name: input.middle_name,
          last_name: input.last_name,
          gender: input.gender,
          birth_date: format(input.birth_date, "P"),
        });
      }
    }),
});

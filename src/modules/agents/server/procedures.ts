import { db } from "@/db";
import { agents } from "@/db/schema";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";
import {
  createTRPCRouter,
  baseProcedure,
  productedProcedure,
} from "@/trpc/init";
import { createAgentSchema } from "../schemas";

export const agentsRouter = createTRPCRouter({
  getOne: productedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`4`,
        })
        .from(agents)
        .where(eq(agents.id, input.id))
        .limit(1);

      return existingAgent;
    }),
  getMany: productedProcedure.query(async () => {
    const data = db.select().from(agents);

    return data;
  }),
  create: productedProcedure
    .input(createAgentSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});

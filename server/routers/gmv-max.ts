Here's the TypeScript code for the tRPC router for GMV Max Weekly Reports:

```typescript
import { z } from 'zod';
import { drizzle } from 'drizzle-orm';
import { eq } from 'drizzle-orm/expressions';
import { weeklyReports } from '../db/schema';
import { calculations } from '../utils/gmv-calculations';
import { createTRPCRouter, publicProcedure } from './trpc';

export const gmvMaxRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        weekNumber: z.number(),
        year: z.number(),
        startDate: z.date(),
        endDate: z.date(),
        gmv: z.number(),
        orders: z.number(),
        adSpend: z.number(),
        // Add other fields as needed
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { gmv, orders, adSpend } = input;
      const metrics = calculations.calculateMetrics(gmv, orders, adSpend);

      const result = await ctx.db
        .insert(weeklyReports)
        .values({ ...input, ...metrics })
        .returning();

      return result[0];
    }),

  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        offset: z.number().min(0).nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 50;
      const offset = input.offset ?? 0;

      return await ctx.db
        .select()
        .from(weeklyReports)
        .limit(limit)
        .offset(offset);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db
        .select()
        .from(weeklyReports)
        .where(eq(weeklyReports.id, input.id));

      return result[0];
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        // Add fields to update as optional properties
        weekNumber: z.number().optional(),
        year: z.number().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        gmv: z.number().optional(),
        orders: z.number().optional(),
        adSpend: z.number().optional(),
        // ...
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;

      const result = await ctx.db
        .update(weeklyReports)
        .set(updateData)
        .where(eq(weeklyReports.id, id))
        .returning();

      return result[0];
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db
        .delete(weeklyReports)
        .where(eq(weeklyReports.id, input.id))
        .returning();

      return result[0];
    }),

  getWeeklyTrend: publicProcedure
    .input(z.object({ weekCount: z.number().min(1).max(52).nullish() }))
    .query(async ({ input, ctx }) => {
      const weekCount = input.weekCount ?? 8;

      const result = await ctx.db
        .select()
        .from(weeklyReports)
        .orderBy(weeklyReports.startDate, 'desc')
        .limit(weekCount);

      return result;
    }),
});
```

This code defines a tRPC router named `gmvMaxRouter` with the following procedures:

1. `create`: Creates a new weekly report by validating the input using `z.object()` and inserting the data into the `weeklyReports` table. It also calculates metrics using the `calculations.calculateMetrics()` utility function.

2. `list`: Retrieves a list of all reports with pagination support. It accepts `limit` and `offset` as optional input parameters.

3. `getById`: Retrieves a single report by its ID. It takes the `id` as input and returns the corresponding report.

4. `update`: Updates a report by its ID. It accepts the `id` and the fields to update as input. It updates the specified fields in the `weeklyReports` table.

5. `delete`: Deletes a report by its ID. It takes the `id` as input and deletes the corresponding report from the `weeklyReports` table.

6. `getWeeklyTrend`: Retrieves trend data for charts. It accepts `weekCount` as an optional input parameter (default is 8) and returns an array of weekly data ordered by the `startDate` in descending order.

The router uses Drizzle ORM queries to interact with the database. The `weeklyReports` schema is imported from `'../db/schema'`, and the `calculations` utility is imported from `'../utils/gmv-calculations'`.

Make sure to replace `ctx.db` with the appropriate database connection object based on your Drizzle ORM setup.
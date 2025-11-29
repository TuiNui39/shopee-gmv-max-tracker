Here's the TypeScript code for the tRPC router for Notion Sync based on the provided procedures:

```typescript
import { z } from 'zod';
import { procedure, router } from './trpc';
import { eq } from 'drizzle-orm';
import { notionService } from './notion';
import { notionSyncLog, reports } from './schema';

export const notionSyncRouter = router({
  syncReport: procedure
    .input(z.object({ reportId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { reportId } = input;

      // Get report data
      const report = await ctx.db
        .select()
        .from(reports)
        .where(eq(reports.id, reportId))
        .limit(1);

      if (!report[0]) {
        throw new Error('Report not found');
      }

      // Format for Notion
      const formattedReport = formatReportForNotion(report[0]);

      // Create/update Notion page
      const notionPageId = await notionService.createOrUpdatePage(formattedReport);

      // Log to notion_sync_log table
      await ctx.db.insert(notionSyncLog).values({
        reportId,
        notionPageId,
        status: 'success',
        syncTime: new Date(),
      });

      return {
        notionPageId,
        status: 'success',
      };
    }),

  getSyncStatus: procedure
    .input(z.object({ reportId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { reportId } = input;

      // Query notion_sync_log
      const syncLog = await ctx.db
        .select()
        .from(notionSyncLog)
        .where(eq(notionSyncLog.reportId, reportId))
        .orderBy(notionSyncLog.syncTime, 'desc')
        .limit(1);

      if (!syncLog[0]) {
        return {
          lastSyncTime: null,
          status: 'never synced',
        };
      }

      return {
        lastSyncTime: syncLog[0].syncTime,
        status: syncLog[0].status,
      };
    }),

  syncAll: procedure.mutation(async ({ ctx }) => {
    // Get all reports
    const allReports = await ctx.db.select().from(reports);

    let successCount = 0;
    let failedCount = 0;

    // Sync each report to Notion
    for (const report of allReports) {
      try {
        // Format for Notion
        const formattedReport = formatReportForNotion(report);

        // Create/update Notion page
        const notionPageId = await notionService.createOrUpdatePage(formattedReport);

        // Log to notion_sync_log table
        await ctx.db.insert(notionSyncLog).values({
          reportId: report.id,
          notionPageId,
          status: 'success',
          syncTime: new Date(),
        });

        successCount++;
      } catch (error) {
        failedCount++;
      }
    }

    return {
      successCount,
      failedCount,
    };
  }),
});

// Helper function to format report data for Notion
function formatReportForNotion(report: any) {
  // Implement the formatting logic based on your report structure and Notion requirements
  // Return the formatted report data
}
```

Make sure to replace `./trpc`, `./notion`, and `./schema` with the correct import paths based on your project structure.

Also, implement the `formatReportForNotion` function according to your specific report structure and Notion formatting requirements.

Note: The code assumes you have a `ctx` object with a `db` property for accessing the Drizzle ORM database connection. Adjust the code if your setup differs.
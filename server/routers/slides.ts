Here's the TypeScript code for the tRPC router for Slide Generation using Drizzle ORM:

```typescript
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { eq } from 'drizzle-orm';
import { reports, slides } from '../schema';
import { generateSlides, exportSlides } from '../services/slide-generator';

export const slideRouter = router({
  generateSlides: procedure
    .input(z.object({ reportId: z.string() }))
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

      // Get AI insights (assuming you have a separate service for this)
      const insights = await getAIInsights(reportId);

      // Generate slide content
      const { slideContent, filePath } = await generateSlides(report[0], insights);

      // Save content file
      await ctx.db.insert(slides).values({
        reportId,
        content: slideContent,
        filePath,
      });

      return { slideContent, filePath };
    }),

  exportSlides: procedure
    .input(z.object({ reportId: z.string(), format: z.enum(['pdf', 'ppt']) }))
    .mutation(async ({ input, ctx }) => {
      const { reportId, format } = input;

      // Get slide content
      const slide = await ctx.db
        .select()
        .from(slides)
        .where(eq(slides.reportId, reportId))
        .limit(1);

      if (!slide[0]) {
        throw new Error('Slide not found');
      }

      // Use manus-export-slides utility
      const exportedFilePath = await exportSlides(slide[0].content, format);

      return { exportedFilePath };
    }),
});
```

Note: Make sure to replace `getAIInsights` with the actual function or service you use to fetch AI insights for a report.

This code defines a tRPC router named `slideRouter` with two procedures:

1. `generateSlides`: It takes a `reportId` as input, retrieves the report data from the database using Drizzle ORM, fetches AI insights (assuming you have a separate service for this), generates slide content using the `generateSlides` function from the `slide-generator` service, saves the content file details in the database, and returns the `slideContent` and `filePath`.

2. `exportSlides`: It takes a `reportId` and `format` ('pdf' or 'ppt') as input, retrieves the slide content from the database using Drizzle ORM, uses the `exportSlides` function from the `slide-generator` service to export the slides to the specified format, and returns the `exportedFilePath`.

Make sure to import the necessary dependencies, such as `z` from Zod for input validation, `procedure` and `router` from your tRPC setup, `eq` from Drizzle ORM, your database schema (`reports` and `slides`), and the `generateSlides` and `exportSlides` functions from the `slide-generator` service.
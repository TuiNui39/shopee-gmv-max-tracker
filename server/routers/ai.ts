import { router, procedure } from './trpc';
import { z } from 'zod';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm/expressions';
import { analyzeTrends, generateRecommendations } from './ai-analysis';
import { aiRecommendations, reports } from './schema';

export const aiAnalysisRouter = router({
  analyzeReport: procedure
    .input(z.object({ reportId: z.number() }))
    .mutation(async ({ input }) => {
      const { reportId } = input;

      // Get report data
      const report = await drizzle.select().from(reports).where(eq(reports.id, reportId)).first();

      if (!report) {
        throw new Error('Report not found');
      }

      const { trends, recommendations } = await Promise.all([
        analyzeTrends(report),
        generateRecommendations(report),
      ]);

      // Save to ai_recommendations table
      await drizzle.insert(aiRecommendations).values({
        reportId,
        provider: 'openai',
        trends,
        recommendations,
      });

      return { trends, recommendations };
    }),

  getInsights: procedure
    .input(z.object({ reportId: z.number() }))
    .query(async ({ input }) => {
      const { reportId } = input;

      // Query ai_recommendations table
      const insights = await drizzle
        .select()
        .from(aiRecommendations)
        .where(eq(aiRecommendations.reportId, reportId));

      // Group by provider
      const groupedInsights: Record<string, typeof insights> = {};
      for (const insight of insights) {
        if (!groupedInsights[insight.provider]) {
          groupedInsights[insight.provider] = [];
        }
        groupedInsights[insight.provider].push(insight);
      }

      return groupedInsights;
    }),

  regenerateInsights: procedure
    .input(z.object({ reportId: z.number() }))
    .mutation(async ({ input }) => {
      const { reportId } = input;

      // Delete old insights
      await drizzle.delete(aiRecommendations).where(eq(aiRecommendations.reportId, reportId));

      // Generate new insights
      const report = await drizzle.select().from(reports).where(eq(reports.id, reportId)).first();

      if (!report) {
        throw new Error('Report not found');
      }

      const { trends, recommendations } = await Promise.all([
        analyzeTrends(report),
        generateRecommendations(report),
      ]);

      // Save to ai_recommendations table
      await drizzle.insert(aiRecommendations).values({
        reportId,
        provider: 'openai',
        trends,
        recommendations,
      });

      return { trends, recommendations };
    }),
});
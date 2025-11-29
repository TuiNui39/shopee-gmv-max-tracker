import { createTRPCRouter, publicProcedure } from './trpc';
import { z } from 'zod';
import { parseShopeeAdsCSV, parseBigSellerCSV } from '../utils/csv-parser';
import { matchProductData } from '../utils/gmv-calculations';
import { db } from '../db';

export const csvImportRouter = createTRPCRouter({
  uploadShopeeCSV: publicProcedure
    .input(z.object({ fileContent: z.string() }))
    .mutation(async ({ input }) => {
      const { data, validationResults } = await parseShopeeAdsCSV(input.fileContent);
      return { data, validationResults };
    }),

  uploadBigSellerCSV: publicProcedure
    .input(z.object({ fileContent: z.string() }))
    .mutation(async ({ input }) => {
      const { data, validationResults } = await parseBigSellerCSV(input.fileContent);
      return { data, validationResults };
    }),

  matchAndImport: publicProcedure
    .input(z.object({ 
      shopeeData: z.array(z.any()), 
      bigsellerData: z.array(z.any()),
      weekNumber: z.number(),
      year: z.number(),
      startDate: z.date(),
      endDate: z.date(),
    }))
    .mutation(async ({ input }) => {
      const { shopeeData, bigsellerData, weekNumber, year, startDate, endDate } = input;

      const matchedData = matchProductData(shopeeData, bigsellerData);

      // Calculate totals and metrics
      const totalGMV = matchedData.reduce((sum, product) => sum + product.gmv, 0);
      const totalSpend = matchedData.reduce((sum, product) => sum + product.spend, 0);
      const totalROAS = totalGMV / totalSpend;
      // ... calculate other metrics

      // Create weekly report in database
      const { id: reportId } = await db.weeklyReport.create({
        data: {
          weekNumber,
          year,
          startDate,
          endDate,
          totalGMV,
          totalSpend,
          totalROAS,
          // ... other fields
        },
      });

      // Create top performing products records
      const topPerformingProducts = matchedData
        .sort((a, b) => b.gmv - a.gmv)
        .slice(0, 10);

      await db.topPerformingProduct.createMany({
        data: topPerformingProducts.map((product) => ({
          reportId,
          productName: product.name,
          gmv: product.gmv,
          spend: product.spend,
          roas: product.gmv / product.spend,
          // ... other fields
        })),
      });

      // Log to import history
      await db.importHistory.create({
        data: {
          reportId,
          importedAt: new Date(),
          // ... other fields
        },
      });

      return {
        reportId,
        summary: {
          totalGMV,
          totalSpend,
          totalROAS,
          // ... other summary data
        },
      };
    }),
});
Here's the complete Drizzle ORM schema for Shopee GMV Max Ads Tracker in TypeScript (server/db/schema.ts):

```typescript
import {
  int,
  varchar,
  decimal,
  text,
  datetime,
  json,
  timestamp,
  mysqlTable,
  index,
} from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const gmvMaxWeeklyReports = mysqlTable(
  'gmv_max_weekly_reports',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('userId').notNull(),
    weekNumber: int('weekNumber').notNull(),
    year: int('year').notNull(),
    startDate: datetime('startDate').notNull(),
    endDate: datetime('endDate').notNull(),
    gmv: decimal('gmv', 10, 2).notNull(),
    orders: int('orders').notNull(),
    aov: decimal('aov', 10, 2).notNull(),
    adSpend: decimal('adSpend', 10, 2).notNull(),
    impressions: int('impressions').notNull(),
    clicks: int('clicks').notNull(),
    ctr: decimal('ctr', 5, 2).notNull(),
    cpc: decimal('cpc', 10, 2).notNull(),
    cpa: decimal('cpa', 10, 2).notNull(),
    shopeeCommission: decimal('shopeeCommission', 10, 2).notNull(),
    transactionFee: decimal('transactionFee', 10, 2).notNull(),
    paymentGatewayFee: decimal('paymentGatewayFee', 10, 2).notNull(),
    shippingFee: decimal('shippingFee', 10, 2).notNull(),
    affiliateCommission: decimal('affiliateCommission', 10, 2).notNull(),
    totalCost: decimal('totalCost', 10, 2).notNull(),
    totalFees: decimal('totalFees', 10, 2).notNull(),
    vat: decimal('vat', 10, 2).notNull(),
    netProfit: decimal('netProfit', 10, 2).notNull(),
    roas: decimal('roas', 5, 2).notNull(),
    realRoas: decimal('realRoas', 5, 2).notNull(),
    targetRoas: decimal('targetRoas', 5, 2).notNull(),
    breakEvenRoas: decimal('breakEvenRoas', 5, 2).notNull(),
    productsAdvertised: int('productsAdvertised').notNull(),
    productViews: int('productViews').notNull(),
    conversionRate: decimal('conversionRate', 5, 2).notNull(),
    notes: text('notes'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userIdIndex: index('userIdIndex').on(table.userId),
    weekYearIndex: index('weekYearIndex').on(table.weekNumber, table.year),
  })
);

export type GmvMaxWeeklyReport = InferModel<typeof gmvMaxWeeklyReports>;

export const topPerformingProducts = mysqlTable(
  'top_performing_products',
  {
    id: int('id').autoincrement().primaryKey(),
    reportId: int('reportId')
      .notNull()
      .references(() => gmvMaxWeeklyReports.id),
    productName: varchar('productName', 255).notNull(),
    productSku: varchar('productSku', 100).notNull(),
    productCategory: varchar('productCategory', 100).notNull(),
    gmv: decimal('gmv', 10, 2).notNull(),
    orders: int('orders').notNull(),
    units: int('units').notNull(),
    adSpend: decimal('adSpend', 10, 2).notNull(),
    roas: decimal('roas', 5, 2).notNull(),
    netProfit: decimal('netProfit', 10, 2).notNull(),
    profitMargin: decimal('profitMargin', 5, 2).notNull(),
    rank: int('rank').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (table) => ({
    reportIdIndex: index('reportIdIndex').on(table.reportId),
  })
);

export type TopPerformingProduct = InferModel<typeof topPerformingProducts>;

export const aiRecommendations = mysqlTable('ai_recommendations', {
  id: int('id').autoincrement().primaryKey(),
  reportId: int('reportId')
    .notNull()
    .references(() => gmvMaxWeeklyReports.id),
  aiProvider: varchar('aiProvider', 50).notNull(),
  analysisType: varchar('analysisType', 50).notNull(),
  title: varchar('title', 255).notNull(),
  content: text('content').notNull(),
  priority: int('priority').notNull(),
  metadata: json('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type AiRecommendation = InferModel<typeof aiRecommendations>;

export const calculationFormulas = mysqlTable('calculation_formulas', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  commissionRates: json('commissionRates').notNull(),
  transactionFeeRate: decimal('transactionFeeRate', 5, 2).notNull(),
  paymentGatewayFeeRate: decimal('paymentGatewayFeeRate', 5, 2).notNull(),
  vatRate: decimal('vatRate', 5, 2).notNull(),
  defaultProductCostPercentage: decimal(
    'defaultProductCostPercentage',
    5,
    2
  ).notNull(),
  targetProfitMargin: decimal('targetProfitMargin', 5, 2).notNull(),
  customFormulas: json('customFormulas'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type CalculationFormula = InferModel<typeof calculationFormulas>;

export const importHistory = mysqlTable('import_history', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  reportId: int('reportId').references(() => gmvMaxWeeklyReports.id),
  fileName: varchar('fileName', 255).notNull(),
  fileType: varchar('fileType', 20).notNull(),
  fileSize: int('fileSize').notNull(),
  status: varchar('status', 20).notNull(),
  recordsImported: int('recordsImported').notNull(),
  recordsFailed: int('recordsFailed').notNull(),
  errorMessage: text('errorMessage'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type ImportHistory = InferModel<typeof importHistory>;

export const notionSyncLog = mysqlTable('notion_sync_log', {
  id: int('id').autoincrement().primaryKey(),
  reportId: int('reportId')
    .notNull()
    .references(() => gmvMaxWeeklyReports.id),
  notionPageId: varchar('notionPageId', 50).notNull(),
  notionDatabaseId: varchar('notionDatabaseId', 50).notNull(),
  status: varchar('status', 20).notNull(),
  syncType: varchar('syncType', 20).notNull(),
  errorMessage: text('errorMessage'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type NotionSyncLog = InferModel<typeof notionSyncLog>;
```

This schema defines the six tables you requested using Drizzle ORM with MySQL types. It includes the specified columns, types, indexes, and foreign key relationships. The schema also exports the corresponding TypeScript types for each table using `InferModel`.
#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

prompt = """Create a complete Drizzle ORM schema for Shopee GMV Max Ads Tracker.

Create 6 tables:
1. gmv_max_weekly_reports - Store weekly GMV Max Ads data
   - id, userId, weekNumber, year, startDate, endDate
   - gmv, orders, aov (Average Order Value)
   - adSpend, impressions, clicks, ctr, cpc, cpa
   - shopeeCommission, transactionFee, paymentGatewayFee, shippingFee, affiliateCommission
   - totalCost, totalFees, vat, netProfit
   - roas, realRoas, targetRoas, breakEvenRoas
   - productsAdvertised, productViews, conversionRate
   - notes, createdAt, updatedAt

2. top_performing_products - Top products per week
   - id, reportId (FK to reports)
   - productName, productSku, productCategory
   - gmv, orders, units, adSpend, roas
   - netProfit, profitMargin, rank
   - createdAt

3. ai_recommendations - AI insights per week
   - id, reportId
   - aiProvider (gemini/claude/gpt/deepseek)
   - analysisType (trend/insight/recommendation/prediction)
   - title, content, priority
   - metadata (JSON), createdAt

4. calculation_formulas - User's calculation settings
   - id, userId
   - commissionRates (JSON), transactionFeeRate, paymentGatewayFeeRate, vatRate
   - defaultProductCostPercentage, targetProfitMargin
   - customFormulas (JSON), createdAt, updatedAt

5. import_history - CSV import logs
   - id, userId, reportId
   - fileName, fileType (shopee/bigseller), fileSize
   - status, recordsImported, recordsFailed, errorMessage
   - createdAt

6. notion_sync_log - Notion sync history
   - id, reportId
   - notionPageId, notionDatabaseId
   - status, syncType, errorMessage, createdAt

Use MySQL types: int, varchar, decimal, text, datetime, json, timestamp
Add indexes for userId, reportId, weekNumber+year
Use camelCase for column names

Return ONLY the TypeScript code for server/db/schema.ts, no explanation."""

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=4000,
    messages=[{"role": "user", "content": prompt}]
)

content = message.content[0].text.strip()

# ลบ markdown code blocks
if content.startswith('```'):
    lines = content.split('\n')
    for i in range(len(lines)-1, -1, -1):
        if lines[i].strip().startswith('```'):
            content = '\n'.join(lines[1:i])
            break

with open('server/db/schema.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Database schema created!")
print(f"Lines: {len(content.splitlines())}")

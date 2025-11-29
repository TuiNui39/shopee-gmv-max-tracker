#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# 1. GMV Calculations
print("Generating gmv-calculations.ts...")
calc_prompt = """Create TypeScript utility functions for GMV Max Ads calculations.

Functions needed:
1. calculateAOV(gmv, orders) - Average Order Value
2. calculateTotalFees(data) - Sum all Shopee fees
3. calculateVAT(totalFees, adSpend) - 7% VAT
4. calculateNetProfit(data) - GMV - costs - fees - ads - VAT
5. calculateROAS(gmv, adSpend) - Return on Ad Spend
6. calculateRealROAS(netProfit, adSpend) - Real ROAS
7. calculateBreakEvenROAS(data) - Break-even point
8. calculateTargetROAS(breakEvenRoas, targetMargin) - Target ROAS
9. calculateCTR(clicks, impressions) - Click Through Rate %
10. calculateCPC(adSpend, clicks) - Cost Per Click
11. calculateCPA(adSpend, orders) - Cost Per Acquisition
12. calculateConversionRate(orders, clicks) - Conversion %
13. calculateProfitMargin(netProfit, gmv) - Profit margin %
14. calculateAllMetrics(data) - Calculate all at once
15. calculateShopeeFees(gmv, commissionRate, transactionRate, paymentRate)
16. compareWeeks(currentWeek, previousWeek) - Compare two weeks
17. formatCurrency(amount) - Format as Thai Baht
18. formatPercent(value, decimals) - Format percentage
19. formatROAS(roas) - Format ROAS

Use TypeScript interfaces for type safety.
Export all functions.

Return ONLY the TypeScript code, no explanation."""

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=4000,
    messages=[{"role": "user", "content": calc_prompt}]
)

content = message.content[0].text.strip()
if content.startswith('```'):
    lines = content.split('\n')
    for i in range(len(lines)-1, -1, -1):
        if lines[i].strip().startswith('```'):
            content = '\n'.join(lines[1:i])
            break

with open('server/utils/gmv-calculations.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print(f"✅ gmv-calculations.ts created! ({len(content.splitlines())} lines)")

# 2. CSV Parser
print("\nGenerating csv-parser.ts...")
csv_prompt = """Create TypeScript utility for parsing and matching CSV files from Shopee Ads and BigSeller.

Functions needed:
1. parseCSV<T>(fileContent, options) - Generic CSV parser using PapaParse
2. parseShopeeAdsCSV(fileContent) - Parse Shopee Ads CSV
   Return: productName, productSku, adSpend, impressions, clicks, orders, gmv, affiliateCommission
3. parseBigSellerCSV(fileContent) - Parse BigSeller CSV
   Return: productName, productSku, orders, units, gmv, productCost
4. matchProductData(shopeeData, bigsellerData) - Match by SKU or name
   Return: { matched, unmatchedShopee, unmatchedBigSeller }
5. validateShopeeAdsData(data) - Validate Shopee data
6. validateBigSellerData(data) - Validate BigSeller data
7. summarizeMatchedData(matchedData) - Summarize totals

Use TypeScript interfaces.
Import Papa from 'papaparse'.
Handle column name variations (productName/product/name, etc).
Export all functions and interfaces.

Return ONLY the TypeScript code, no explanation."""

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=4000,
    messages=[{"role": "user", "content": csv_prompt}]
)

content = message.content[0].text.strip()
if content.startswith('```'):
    lines = content.split('\n')
    for i in range(len(lines)-1, -1, -1):
        if lines[i].strip().startswith('```'):
            content = '\n'.join(lines[1:i])
            break

with open('server/utils/csv-parser.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print(f"✅ csv-parser.ts created! ({len(content.splitlines())} lines)")

print("\n🎉 All utility functions generated!")

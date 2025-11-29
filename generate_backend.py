#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

files_to_generate = {
    "server/db/index.ts": """Create database connection helper for MySQL using Drizzle ORM.

Export:
- getDb() - Get database connection from DATABASE_URL env
- db instance

Use mysql2/promise and drizzle-orm/mysql2.
Import schema from './schema'.

Return ONLY TypeScript code.""",

    "server/_core/trpc.ts": """Create tRPC setup file.

Export:
- router - tRPC router
- publicProcedure - Public procedure
- protectedProcedure - Protected procedure (with user check)
- createContext - Context with req, res, user

Use @trpc/server.
Simple setup, no complex middleware.

Return ONLY TypeScript code.""",

    "server/routers/gmv-max.ts": """Create tRPC router for GMV Max Weekly Reports.

Procedures:
1. create - Create new weekly report
   Input: weekNumber, year, startDate, endDate, gmv, orders, adSpend, etc.
   Calculate metrics using gmv-calculations utils
   
2. list - List all reports (with pagination)
   Input: limit, offset
   
3. getById - Get single report by ID
   Input: id
   
4. update - Update report
   Input: id + fields to update
   
5. delete - Delete report
   Input: id
   
6. getWeeklyTrend - Get trend data for charts
   Input: weekCount (default 8)
   Return: Array of weekly data

Use Drizzle ORM queries.
Import schema from '../db/schema'.
Import calculations from '../utils/gmv-calculations'.
Use z.object() for input validation.

Return ONLY TypeScript code.""",

    "server/routers/import.ts": """Create tRPC router for CSV Import.

Procedures:
1. uploadShopeeCSV - Parse Shopee Ads CSV
   Input: fileContent (string)
   Use parseShopeeAdsCSV from utils
   Return: parsed data + validation results
   
2. uploadBigSellerCSV - Parse BigSeller CSV
   Input: fileContent (string)
   Use parseBigSellerCSV from utils
   Return: parsed data + validation results
   
3. matchAndImport - Match two CSVs and create report
   Input: shopeeData, bigsellerData, weekNumber, year, startDate, endDate
   Use matchProductData from utils
   Calculate totals and metrics
   Create weekly report in database
   Create top_performing_products records
   Log to import_history
   Return: reportId, summary

Import csv-parser utils.
Import gmv-calculations utils.
Import schema and db.

Return ONLY TypeScript code.""",

    "server/routers/index.ts": """Create main tRPC app router.

Combine all routers:
- gmvMax: gmvMaxRouter
- import: importRouter

Export appRouter and AppRouter type.

Import from './gmv-max' and './import'.
Use router() from '../_core/trpc'.

Return ONLY TypeScript code.""",
}

for filename, prompt in files_to_generate.items():
    print(f"Generating {filename}...")
    
    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=3000,
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
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filename} created! ({len(content.splitlines())} lines)")

print("\n🎉 All backend files generated!")

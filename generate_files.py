#!/usr/bin/env python3
import os
import json
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

prompt = """Create a complete package.json for a Shopee GMV Max Ads Tracker web application.

Technology Stack:
- Frontend: React 19 + Vite + TypeScript
- Backend: Express + tRPC
- Database: MySQL + Drizzle ORM
- UI: TailwindCSS + shadcn/ui components
- Charts: Recharts
- CSV: PapaP parse
- Forms: React Hook Form + Zod
- Date: date-fns

Include all necessary dependencies and dev dependencies.
Add scripts for dev, build, start, and db:push.

Return ONLY the package.json content as valid JSON, no markdown, no explanation."""

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=3000,
    messages=[{"role": "user", "content": prompt}]
)

result = message.content[0].text

# บันทึกลงไฟล์
with open('package.json', 'w', encoding='utf-8') as f:
    # ลบ markdown code blocks ถ้ามี
    content = result.strip()
    if content.startswith('```'):
        lines = content.split('\n')
        content = '\n'.join(lines[1:-1])
    f.write(content)

print("✅ package.json created successfully!")
print(content[:500] + "...")

#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

prompt = """Create server/routers/index.ts file.

Import all routers:
- gmvMaxRouter from './gmv-max'
- importRouter from './import'
- aiRouter from './ai'
- notionRouter from './notion'
- slidesRouter from './slides'

Create and export appRouter using router() from '../_core/trpc':
- gmvMax: gmvMaxRouter
- import: importRouter
- ai: aiRouter
- notion: notionRouter
- slides: slidesRouter

Export type AppRouter = typeof appRouter

Return ONLY TypeScript code."""

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
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

with open('server/routers/index.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ server/routers/index.ts created! ({len(content.splitlines())} lines)")

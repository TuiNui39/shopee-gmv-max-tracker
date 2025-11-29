#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

configs = {
    "tsconfig.json": """Create tsconfig.json for React + Vite + TypeScript project with strict mode.""",
    
    "vite.config.ts": """Create vite.config.ts for React + TypeScript with:
- React plugin
- Path aliases (@/ for src/)
- Proxy for /api to localhost:3000""",
    
    "tailwind.config.js": """Create tailwind.config.js for shadcn/ui with:
- Content paths for src/**
- Theme extends for colors
- Plugins for typography and animate""",
    
    "drizzle.config.ts": """Create drizzle.config.ts for MySQL with:
- Schema path: ./server/db/schema.ts
- Out path: ./drizzle
- Connection from DATABASE_URL env""",
    
    ".env.example": """Create .env.example with:
DATABASE_URL=mysql://user:password@localhost:3306/dbname
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key
GEMINI_API_KEY=your_key
DEEPSEEK_API=your_key
GLM_46_api=your_key
NOTION_API_KEY=your_key
PORT=3000""",
    
    "README.md": """Create README.md with:
# Shopee GMV Max Ads Tracker

## Features
- CSV Import from Shopee & BigSeller
- Weekly Performance Dashboard
- AI-Powered Analysis
- Notion Integration
- Auto Slide Generation

## Setup
1. Clone repo
2. Install dependencies: pnpm install
3. Setup .env
4. Run migrations: pnpm db:push
5. Start dev: pnpm dev

## Tech Stack
- React + Vite + TypeScript
- Express + tRPC
- MySQL + Drizzle ORM
- TailwindCSS + shadcn/ui"""
}

for filename, prompt in configs.items():
    print(f"Generating {filename}...")
    
    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1500,
        messages=[{"role": "user", "content": f"{prompt}\n\nReturn ONLY the file content, no markdown blocks, no explanation."}]
    )
    
    content = message.content[0].text.strip()
    
    # ลบ markdown code blocks ถ้ามี
    if content.startswith('```'):
        lines = content.split('\n')
        # หา closing ```
        for i in range(len(lines)-1, -1, -1):
            if lines[i].strip() == '```':
                content = '\n'.join(lines[1:i])
                break
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filename} created!")

print("\n🎉 All config files generated successfully!")

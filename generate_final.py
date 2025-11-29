#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

files_to_generate = {
    "server/index.ts": """Create Express server with tRPC.

Features:
- Express app setup
- CORS enabled
- tRPC middleware at /api/trpc
- Serve static files from dist/
- Error handling
- Port from env (default 3000)

Import appRouter from './routers/index'.
Import createContext from './_core/trpc'.
Use @trpc/server/adapters/express.

Return ONLY TypeScript code.""",

    "index.html": """Create HTML entry point for Vite.

Features:
- <!DOCTYPE html>
- Meta tags (charset, viewport)
- Title: Shopee GMV Max Ads Tracker
- Root div (#root)
- Script tag for src/main.tsx (type="module")
- Basic styling

Return ONLY HTML code.""",

    ".gitignore": """Create .gitignore file.

Ignore:
- node_modules/
- dist/
- .env
- *.log
- .DS_Store
- coverage/
- drizzle/

Return ONLY plain text.""",

    "README.md": """Create comprehensive README.md.

Include:
# Shopee GMV Max Ads Tracker

## Overview
Web application for tracking and analyzing Shopee GMV Max Ads performance with AI-powered insights.

## Features
- 📊 Weekly Performance Dashboard
- 📈 CSV Import (Shopee Ads + BigSeller)
- 🤖 AI Analysis (Gemini, Claude, GPT, DeepSeek)
- 📝 Notion Integration
- 🎨 Auto Slide Generation
- 📉 Trend Analysis & Forecasting

## Tech Stack
### Frontend
- React 19 + Vite
- TypeScript
- TailwindCSS + shadcn/ui
- Recharts
- tRPC Client

### Backend
- Express + tRPC
- MySQL + Drizzle ORM
- AI APIs Integration
- Notion MCP

## Installation

```bash
# Clone repository
git clone https://github.com/TuiNui39/shopee-gmv-max-tracker.git
cd shopee-gmv-max-tracker

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
pnpm db:push

# Start development
pnpm dev
```

## Environment Variables
See .env.example for required variables.

## Usage
1. Import CSV files from Shopee Ads and BigSeller
2. View dashboard with KPIs and trends
3. Get AI-powered insights and recommendations
4. Sync reports to Notion
5. Generate presentation slides

## Project Structure
```
shopee-gmv-max-tracker/
├── server/          # Backend
│   ├── db/         # Database schema
│   ├── routers/    # tRPC routers
│   ├── services/   # Business logic
│   └── utils/      # Utilities
├── src/            # Frontend
│   ├── components/ # React components
│   ├── pages/      # Pages
│   └── lib/        # Client utilities
└── drizzle/        # Migrations

```

## API Routes
- `/api/trpc/gmvMax.*` - Weekly reports CRUD
- `/api/trpc/import.*` - CSV import
- `/api/trpc/ai.*` - AI analysis
- `/api/trpc/notion.*` - Notion sync
- `/api/trpc/slides.*` - Slide generation

## License
MIT

## Author
TuiNui39

Return ONLY Markdown content.""",
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

print("\n🎉 All final files generated!")

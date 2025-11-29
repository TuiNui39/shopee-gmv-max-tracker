#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

files_to_generate = {
    "src/lib/trpc.ts": """Create tRPC client setup for React.

Export:
- trpc - tRPC client with React Query
- TRPCProvider - Provider component

Use @trpc/client, @trpc/react-query, @tanstack/react-query.
Connect to http://localhost:3000/api/trpc.
Import AppRouter type from server.

Return ONLY TypeScript code.""",

    "src/components/KPICard.tsx": """Create KPI Card component.

Props:
- title: string
- value: string | number
- change?: number (percentage change)
- trend?: 'up' | 'down'
- icon?: React.ReactNode
- format?: 'currency' | 'number' | 'percent'

Show:
- Title
- Large value
- Change percentage with color (green up, red down)
- Icon

Use Tailwind CSS.
Modern card design with shadow.

Return ONLY TypeScript React component.""",

    "src/components/WeeklyTrendChart.tsx": """Create Weekly Trend Chart component using Recharts.

Props:
- data: Array<{week: string, gmv: number, roas: number, netProfit: number}>
- metric: 'gmv' | 'roas' | 'netProfit'

Show:
- Line chart with the selected metric
- X-axis: week
- Y-axis: value
- Tooltip
- Grid
- Responsive

Use Recharts (LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer).
Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/components/ComparisonChart.tsx": """Create Comparison Bar Chart component using Recharts.

Props:
- data: Array<{name: string, current: number, previous: number}>

Show:
- Bar chart comparing current vs previous week
- Two bars per category
- Legend
- Tooltip
- Responsive

Use Recharts (BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer).
Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/pages/Dashboard.tsx": """Create Dashboard Page component.

Features:
1. Header with title "GMV Max Ads Dashboard"
2. Week selector dropdown (last 8 weeks)
3. Grid of KPI Cards:
   - GMV
   - ROAS
   - Net Profit
   - Orders
   - Ad Spend
   - Break-even ROAS
4. Weekly Trend Chart (tabs for GMV/ROAS/Profit)
5. Top Performing Products table

Use trpc.gmvMax.list and trpc.gmvMax.getWeeklyTrend.
Use KPICard, WeeklyTrendChart components.
Use Tailwind CSS grid layout.
Show loading state.

Return ONLY TypeScript React component.""",

    "src/App.tsx": """Create main App component.

Features:
- TRPCProvider wrapper
- Simple routing (Dashboard as home)
- Navigation header with links
- Responsive layout

Use React Router if needed, or just show Dashboard.
Wrap with TRPCProvider.

Return ONLY TypeScript React component.""",

    "src/main.tsx": """Create React entry point.

- Import App
- Render to #root
- Include CSS imports

Return ONLY TypeScript code.""",

    "src/index.css": """Create Tailwind CSS base styles.

Include:
@tailwind base;
@tailwind components;
@tailwind utilities;

Add custom styles for smooth animations.

Return ONLY CSS code.""",
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

print("\n🎉 All frontend files generated!")

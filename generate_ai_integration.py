#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

files_to_generate = {
    "server/services/ai-providers.ts": """Create AI provider service helpers.

Functions for each provider:
1. analyzeWithGemini(prompt: string) - Use Google Gemini API
2. analyzeWithClaude(prompt: string) - Use Anthropic Claude API
3. analyzeWithGPT(prompt: string) - Use OpenAI GPT API
4. analyzeWithDeepSeek(prompt: string) - Use DeepSeek API

Each function:
- Takes prompt string
- Calls respective API
- Returns analysis text
- Handles errors

Use fetch() for API calls.
Get API keys from env: GEMINI_API_KEY, ANTHROPIC_API_KEY, OPENAI_API_KEY, DEEPSEEK_API

Export all functions.

Return ONLY TypeScript code.""",

    "server/services/ai-analysis.ts": """Create AI analysis service.

Functions:
1. generateAnalysisPrompt(reportData) - Create prompt from weekly report data
   Include: GMV, ROAS, trends, top products
   
2. analyzeTrends(reportData, historicalData) - Analyze trends
   Use all 4 AI providers
   Return insights from each
   
3. generateRecommendations(reportData, historicalData) - Generate recommendations
   Use all 4 AI providers
   Focus on: budget optimization, product selection, bidding strategy
   
4. predictNextWeek(historicalData) - Predict next week performance
   Use AI to forecast GMV, ROAS
   
5. analyzeCompetition(reportData) - Competitive analysis insights

Import ai-providers functions.
Export all functions.

Return ONLY TypeScript code.""",

    "server/routers/ai.ts": """Create tRPC router for AI Analysis.

Procedures:
1. analyzeReport - Analyze single report
   Input: reportId
   Get report data
   Call analyzeTrends and generateRecommendations
   Save to ai_recommendations table
   Return: insights array
   
2. getInsights - Get AI insights for report
   Input: reportId
   Query ai_recommendations table
   Return: grouped by provider
   
3. regenerateInsights - Regenerate AI analysis
   Input: reportId
   Delete old insights
   Generate new ones
   Return: new insights

Use Drizzle ORM.
Import ai-analysis service.
Import schema.

Return ONLY TypeScript code.""",

    "src/components/AIInsightCard.tsx": """Create AI Insight Card component.

Props:
- provider: 'gemini' | 'claude' | 'gpt' | 'deepseek'
- type: 'trend' | 'insight' | 'recommendation' | 'prediction'
- title: string
- content: string
- priority?: 'high' | 'medium' | 'low'
- createdAt: string

Features:
- Provider logo/icon
- Type badge
- Priority indicator
- Content with markdown support
- Timestamp
- Expand/collapse for long content

Use Tailwind CSS.
Different colors per provider.

Return ONLY TypeScript React component.""",

    "src/components/AIAnalysisPanel.tsx": """Create AI Analysis Panel component.

Props:
- reportId: number

Features:
- Tabs for each AI provider (Gemini, Claude, GPT, DeepSeek)
- Show insights from selected provider
- Filter by type (trend/insight/recommendation/prediction)
- Regenerate button
- Loading states

Use trpc.ai.getInsights and regenerateInsights.
Use AIInsightCard component.
Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/pages/Analysis.tsx": """Create Analysis Page component.

Features:
1. Report selector dropdown
2. Summary section with key metrics
3. AIAnalysisPanel with all insights
4. Action buttons:
   - Export insights to PDF
   - Sync to Notion
   - Generate slides

Use trpc.gmvMax.getById and trpc.ai.analyzeReport.
Use AIAnalysisPanel component.
Use Tailwind CSS.

Return ONLY TypeScript React component.""",
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

print("\n🎉 All AI integration files generated!")

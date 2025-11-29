#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

files_to_generate = {
    "server/services/slide-generator.ts": """Create Slide Content Generator service.

Functions:
1. generateSlideContent(reportData, aiInsights) - Generate slide content
   Create markdown for slides with:
   - Title slide (Week X Report)
   - Executive Summary slide
   - KPIs Overview slide (GMV, ROAS, Orders, Profit)
   - Performance Trends slide (charts data)
   - Top Products slide (table)
   - AI Insights slide (key recommendations)
   - Action Items slide
   - Thank You slide
   Return: markdown content
   
2. formatSlideMarkdown(slides) - Format as proper slide markdown
   Use --- as slide separator
   Add # for titles, ## for subtitles
   Format tables and lists
   
3. saveSlideContent(content, reportId) - Save to file
   Save to /tmp/slides-{reportId}.md
   Return: file path

Export all functions.

Return ONLY TypeScript code.""",

    "server/routers/slides.ts": """Create tRPC router for Slide Generation.

Procedures:
1. generateSlides - Generate slides for report
   Input: reportId
   Get report data
   Get AI insights
   Generate slide content
   Save content file
   Return: slideContent, filePath
   
2. exportSlides - Export slides to PDF/PPT
   Input: reportId, format ('pdf' | 'ppt')
   Get slide content
   Use manus-export-slides utility
   Return: exported file path

Use Drizzle ORM.
Import slide-generator service.
Import schema.

Return ONLY TypeScript code.""",

    "src/components/SlidePreview.tsx": """Create Slide Preview component.

Props:
- slideContent: string (markdown)
- currentSlide: number
- totalSlides: number
- onSlideChange: (slideNumber: number) => void

Features:
- Show current slide rendered from markdown
- Navigation buttons (prev/next)
- Slide counter
- Slide thumbnails sidebar
- Full screen mode

Use markdown renderer.
Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/components/SlideGenerator.tsx": """Create Slide Generator component.

Props:
- reportId: number

Features:
- Generate slides button
- Loading state
- SlidePreview after generation
- Export buttons (PDF, PPT)
- Regenerate button
- Download links

Use trpc.slides.generateSlides and exportSlides.
Use SlidePreview component.
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

print("\n🎉 All slide generation files generated!")

#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

files_to_generate = {
    "src/components/CSVUploader.tsx": """Create CSV File Uploader component.

Props:
- onFileSelect: (file: File) => void
- accept: string (default: '.csv')
- label: string
- description?: string

Features:
- Drag & drop zone
- File input button
- Show selected file name and size
- Clear file button
- File validation (type, size)

Use Tailwind CSS.
Modern design with dashed border for drop zone.

Return ONLY TypeScript React component.""",

    "src/components/DataPreviewTable.tsx": """Create Data Preview Table component.

Props:
- data: Array<Record<string, any>>
- maxRows?: number (default: 10)
- title?: string

Features:
- Show table with headers from data keys
- Limit rows displayed
- Show total count
- Responsive with horizontal scroll
- Alternating row colors

Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/components/ImportStepper.tsx": """Create Multi-Step Import Flow component.

Props:
- currentStep: number (1-4)
- steps: Array<{number: number, title: string, description: string}>

Steps:
1. Upload Shopee CSV
2. Upload BigSeller CSV
3. Review & Match Data
4. Import Complete

Features:
- Show all steps
- Highlight current step
- Show completed steps with checkmark
- Progress line between steps

Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/pages/Import.tsx": """Create Import Page component.

Features:
1. ImportStepper at top
2. Step 1: Upload Shopee Ads CSV
   - CSVUploader
   - Parse button
   - DataPreviewTable on success
3. Step 2: Upload BigSeller CSV
   - CSVUploader
   - Parse button
   - DataPreviewTable on success
4. Step 3: Review & Match
   - Show matched products count
   - Show unmatched from both
   - Week selector (number, year, dates)
   - Match & Import button
5. Step 4: Success
   - Show summary (GMV, Orders, Products)
   - Link to view report
   - Start new import button

Use trpc.import.uploadShopeeCSV, uploadBigSellerCSV, matchAndImport.
Handle loading and error states.
Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/components/WeekSelector.tsx": """Create Week Selector component.

Props:
- onWeekChange: (data: {weekNumber: number, year: number, startDate: string, endDate: string}) => void
- defaultWeek?: number
- defaultYear?: number

Features:
- Week number input (1-52)
- Year input
- Auto-calculate start/end dates
- Show date range preview
- Validation

Use date-fns for date calculations.
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

print("\n🎉 All import form files generated!")

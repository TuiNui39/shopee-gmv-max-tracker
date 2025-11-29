#!/usr/bin/env python3
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

files_to_generate = {
    "server/services/notion.ts": """Create Notion service using manus-mcp-cli.

Functions:
1. createNotionPage(title, content, databaseId?) - Create page
   Execute: manus-mcp-cli tool call create-page --server notion --input '{...}'
   Return: pageId
   
2. updateNotionPage(pageId, content) - Update page
   Execute: manus-mcp-cli tool call update-page --server notion --input '{...}'
   
3. createDatabase(title, properties) - Create database
   Execute: manus-mcp-cli tool call create-database --server notion --input '{...}'
   Return: databaseId
   
4. addDatabaseItem(databaseId, properties) - Add item to database
   Execute: manus-mcp-cli tool call add-database-item --server notion --input '{...}'
   
5. formatReportForNotion(reportData) - Format report data for Notion
   Create markdown content with:
   - Summary section
   - KPIs table
   - Top products table
   - AI insights
   Return: formatted markdown

Use child_process.execSync to run manus-mcp-cli commands.
Handle JSON parsing and errors.
Export all functions.

Return ONLY TypeScript code.""",

    "server/routers/notion.ts": """Create tRPC router for Notion Sync.

Procedures:
1. syncReport - Sync report to Notion
   Input: reportId
   Get report data
   Format for Notion
   Create/update Notion page
   Log to notion_sync_log table
   Return: notionPageId, status
   
2. getSyncStatus - Get sync status for report
   Input: reportId
   Query notion_sync_log
   Return: last sync time, status
   
3. syncAll - Sync all reports
   Get all reports
   Sync each to Notion
   Return: summary (success count, failed count)

Use Drizzle ORM.
Import notion service.
Import schema.

Return ONLY TypeScript code.""",

    "src/components/NotionSyncButton.tsx": """Create Notion Sync Button component.

Props:
- reportId: number
- onSyncComplete?: () => void

Features:
- Sync button with Notion icon
- Show sync status (never synced, synced, syncing, error)
- Show last sync time
- Loading state during sync
- Success/error messages
- Link to Notion page after sync

Use trpc.notion.syncReport and getSyncStatus.
Use Tailwind CSS.

Return ONLY TypeScript React component.""",

    "src/components/NotionSyncPanel.tsx": """Create Notion Sync Panel component.

Features:
- List all reports with sync status
- Bulk sync button
- Filter by sync status
- Show Notion page links
- Refresh button

Use trpc.gmvMax.list, trpc.notion.getSyncStatus, syncAll.
Use NotionSyncButton component.
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

print("\n🎉 All Notion integration files generated!")

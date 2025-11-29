Here's the TypeScript code for the Notion service using manus-mcp-cli:

```typescript
import { execSync } from 'child_process';

interface PageInput {
  title: string;
  content: string;
  databaseId?: string;
}

interface DatabaseInput {
  title: string;
  properties: Record<string, unknown>;
}

interface DatabaseItemInput {
  databaseId: string;
  properties: Record<string, unknown>;
}

interface ReportData {
  summary: string;
  kpis: Record<string, unknown>[];
  topProducts: Record<string, unknown>[];
  insights: string[];
}

export function createNotionPage(title: string, content: string, databaseId?: string): string {
  const input: PageInput = { title, content, databaseId };
  const command = `manus-mcp-cli tool call create-page --server notion --input '${JSON.stringify(input)}'`;

  try {
    const output = execSync(command, { encoding: 'utf-8' });
    const { pageId } = JSON.parse(output);
    return pageId;
  } catch (error) {
    console.error('Error creating Notion page:', error);
    throw error;
  }
}

export function updateNotionPage(pageId: string, content: string): void {
  const input = { pageId, content };
  const command = `manus-mcp-cli tool call update-page --server notion --input '${JSON.stringify(input)}'`;

  try {
    execSync(command);
  } catch (error) {
    console.error('Error updating Notion page:', error);
    throw error;
  }
}

export function createDatabase(title: string, properties: Record<string, unknown>): string {
  const input: DatabaseInput = { title, properties };
  const command = `manus-mcp-cli tool call create-database --server notion --input '${JSON.stringify(input)}'`;

  try {
    const output = execSync(command, { encoding: 'utf-8' });
    const { databaseId } = JSON.parse(output);
    return databaseId;
  } catch (error) {
    console.error('Error creating Notion database:', error);
    throw error;
  }
}

export function addDatabaseItem(databaseId: string, properties: Record<string, unknown>): void {
  const input: DatabaseItemInput = { databaseId, properties };
  const command = `manus-mcp-cli tool call add-database-item --server notion --input '${JSON.stringify(input)}'`;

  try {
    execSync(command);
  } catch (error) {
    console.error('Error adding item to Notion database:', error);
    throw error;
  }
}

export function formatReportForNotion(reportData: ReportData): string {
  const { summary, kpis, topProducts, insights } = reportData;

  let content = `## Summary\n${summary}\n\n`;

  content += '## KPIs\n';
  content += '| Metric | Value |\n';
  content += '|--------|-------|\n';
  kpis.forEach((kpi) => {
    const [metric, value] = Object.entries(kpi)[0];
    content += `| ${metric} | ${value} |\n`;
  });
  content += '\n';

  content += '## Top Products\n';
  content += '| Product | Revenue |\n';
  content += '|---------|----------|\n';
  topProducts.forEach((product) => {
    const { name, revenue } = product;
    content += `| ${name} | $${revenue} |\n`;
  });
  content += '\n';

  content += '## AI Insights\n';
  insights.forEach((insight) => {
    content += `- ${insight}\n`;
  });

  return content;
}
```

This code defines the following functions:

1. `createNotionPage`: Creates a new Notion page by executing the `create-page` command using `manus-mcp-cli`. It takes the page title, content, and optional database ID as input and returns the created page ID.

2. `updateNotionPage`: Updates an existing Notion page by executing the `update-page` command using `manus-mcp-cli`. It takes the page ID and updated content as input.

3. `createDatabase`: Creates a new Notion database by executing the `create-database` command using `manus-mcp-cli`. It takes the database title and properties as input and returns the created database ID.

4. `addDatabaseItem`: Adds an item to a Notion database by executing the `add-database-item` command using `manus-mcp-cli`. It takes the database ID and item properties as input.

5. `formatReportForNotion`: Formats report data into markdown content suitable for a Notion page. It takes the report data (summary, KPIs, top products, and AI insights) as input and returns the formatted markdown content.

The code uses `child_process.execSync` to execute the `manus-mcp-cli` commands and handles JSON parsing and errors appropriately.

Remember to handle any necessary error handling and logging in your application code when using these functions.
Here's the TypeScript code for the Slide Content Generator service:

```typescript
import * as fs from 'fs';
import * as path from 'path';

interface ReportData {
  // Define the structure of the reportData object
  // Example:
  // gmv: number;
  // roas: number;
  // orders: number;
  // profit: number;
  // performanceTrends: any[];
  // topProducts: any[];
}

interface AIInsights {
  // Define the structure of the aiInsights object
  // Example:
  // recommendations: string[];
}

export function generateSlideContent(reportData: ReportData, aiInsights: AIInsights): string {
  let markdown = '';

  // Title slide
  markdown += '# Week X Report\n\n';

  // Executive Summary slide
  markdown += '## Executive Summary\n\n';
  // Add content for the Executive Summary slide

  // KPIs Overview slide
  markdown += '## KPIs Overview\n\n';
  markdown += `- GMV: ${reportData.gmv}\n`;
  markdown += `- ROAS: ${reportData.roas}\n`;
  markdown += `- Orders: ${reportData.orders}\n`;
  markdown += `- Profit: ${reportData.profit}\n\n`;

  // Performance Trends slide
  markdown += '## Performance Trends\n\n';
  // Add charts data for the Performance Trends slide

  // Top Products slide
  markdown += '## Top Products\n\n';
  // Add table for the Top Products slide

  // AI Insights slide
  markdown += '## AI Insights\n\n';
  aiInsights.recommendations.forEach((recommendation) => {
    markdown += `- ${recommendation}\n`;
  });
  markdown += '\n';

  // Action Items slide
  markdown += '## Action Items\n\n';
  // Add content for the Action Items slide

  // Thank You slide
  markdown += '## Thank You\n\n';

  return markdown;
}

export function formatSlideMarkdown(slides: string): string {
  // Split the slides by the slide separator
  const slideArray = slides.split('---');

  // Format each slide
  const formattedSlides = slideArray.map((slide) => {
    // Add # for titles and ## for subtitles
    // Format tables and lists
    // Implement the necessary formatting logic here
    return slide.trim();
  });

  // Join the formatted slides with the slide separator
  return formattedSlides.join('\n---\n');
}

export function saveSlideContent(content: string, reportId: string): string {
  const filePath = path.join('/tmp', `slides-${reportId}.md`);

  fs.writeFileSync(filePath, content);

  return filePath;
}
```

This TypeScript code defines the three functions for the Slide Content Generator service:

1. `generateSlideContent(reportData, aiInsights)`: Generates the slide content in markdown format based on the provided `reportData` and `aiInsights`. It creates slides for the Title, Executive Summary, KPIs Overview, Performance Trends, Top Products, AI Insights, Action Items, and Thank You sections. You'll need to define the structure of the `reportData` and `aiInsights` objects based on your specific data model.

2. `formatSlideMarkdown(slides)`: Formats the generated slide markdown by splitting the slides using the slide separator (`---`), applying necessary formatting such as adding `#` for titles and `##` for subtitles, and formatting tables and lists. You'll need to implement the specific formatting logic based on your requirements.

3. `saveSlideContent(content, reportId)`: Saves the slide content to a file named `/tmp/slides-{reportId}.md` and returns the file path.

Make sure to customize the `ReportData` and `AIInsights` interfaces to match the structure of your data model.
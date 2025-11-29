Here's a TypeScript React component for a Comparison Bar Chart using Recharts and Tailwind CSS:

```tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonBarChartProps {
  data: Array<{
    name: string;
    current: number;
    previous: number;
  }>;
}

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" name="Current Week" fill="#8884d8" />
          <Bar dataKey="previous" name="Previous Week" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonBarChart;
```

Explanation:

1. The component accepts a prop named `data`, which is an array of objects containing `name`, `current`, and `previous` properties.

2. Inside the component, we use the `ResponsiveContainer` component from Recharts to make the chart responsive. It takes the width and height props to set the dimensions of the chart.

3. The `BarChart` component is used to render the bar chart. We pass the `data` prop to specify the data for the chart. The `margin` prop is used to adjust the margins around the chart.

4. The `XAxis` component represents the x-axis of the chart, and we set the `dataKey` prop to "name" to use the "name" property from the data as the x-axis labels.

5. The `YAxis` component represents the y-axis of the chart.

6. The `Tooltip` component is used to display tooltips when hovering over the bars.

7. The `Legend` component is used to display a legend for the chart.

8. We use two `Bar` components to represent the bars for the current and previous weeks. The `dataKey` prop specifies the property from the data to use for the bar values. The `name` prop sets the name of the bar series, which is displayed in the legend. The `fill` prop sets the color of the bars.

9. We apply Tailwind CSS classes to style the container div, setting its width to full and height to 96 (which equals 24rem or 384px).

This component will render a responsive comparison bar chart with two bars per category, a legend, and a tooltip. The chart will compare the current week's values against the previous week's values based on the provided data.
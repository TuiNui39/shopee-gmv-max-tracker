Here's a TypeScript React component for the Weekly Trend Chart using Recharts and Tailwind CSS:

```tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface WeeklyData {
  week: string;
  gmv: number;
  roas: number;
  netProfit: number;
}

interface WeeklyTrendChartProps {
  data: WeeklyData[];
  metric: 'gmv' | 'roas' | 'netProfit';
}

const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({ data, metric }) => {
  const formatYAxis = (value: number) => {
    if (metric === 'roas') {
      return `${value.toFixed(2)}%`;
    }
    return `$${value.toLocaleString()}`;
  };

  const getMetricName = () => {
    switch (metric) {
      case 'gmv':
        return 'GMV';
      case 'roas':
        return 'ROAS';
      case 'netProfit':
        return 'Net Profit';
    }
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={(value: number) => formatYAxis(value)} />
          <Line type="monotone" dataKey={metric} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <h3 className="text-center text-xl font-semibold mt-4">{getMetricName()}</h3>
    </div>
  );
};

export default WeeklyTrendChart;
```

This component takes two props:
- `data`: An array of objects representing the weekly data, with properties `week`, `gmv`, `roas`, and `netProfit`.
- `metric`: A string indicating the metric to be displayed in the chart, which can be either `'gmv'`, `'roas'`, or `'netProfit'`.

The component renders a line chart using Recharts components:
- `LineChart`: The main container for the line chart.
- `Line`: Represents the line series in the chart, with the selected metric as the data key.
- `XAxis`: Displays the week labels on the x-axis.
- `YAxis`: Displays the values on the y-axis, formatted based on the selected metric.
- `Tooltip`: Shows a tooltip with the formatted value when hovering over data points.
- `ResponsiveContainer`: Makes the chart responsive to fit its container size.
- `CartesianGrid`: Adds a background grid to the chart.

The component uses Tailwind CSS classes for styling:
- `w-full` and `h-96` set the width to 100% and height to 24rem (96px) respectively.
- `text-center`, `text-xl`, `font-semibold`, and `mt-4` are used for centering, sizing, and margin of the metric name heading.

The component also includes helper functions:
- `formatYAxis`: Formats the y-axis values based on the selected metric (percentage for ROAS, currency for others).
- `getMetricName`: Returns the display name of the selected metric.

Make sure to have the required dependencies (React, Recharts, Tailwind CSS) installed in your project.
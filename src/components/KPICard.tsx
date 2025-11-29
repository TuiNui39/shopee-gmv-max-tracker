Here's a TypeScript React component for a KPI Card using Tailwind CSS:

```tsx
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
  format?: 'currency' | 'number' | 'percent';
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  format = 'number',
}) => {
  const formatValue = (value: string | number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(Number(value));
      case 'percent':
        return `${value}%`;
      default:
        return value;
    }
  };

  const getTrendColor = (trend?: 'up' | 'down') => {
    if (trend === 'up') {
      return 'text-green-500';
    } else if (trend === 'down') {
      return 'text-red-500';
    }
    return '';
  };

  const getTrendIcon = (trend?: 'up' | 'down') => {
    if (trend === 'up') {
      return <FaArrowUp className="inline-block ml-1" />;
    } else if (trend === 'down') {
      return <FaArrowDown className="inline-block ml-1" />;
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="text-4xl font-bold mb-2">{formatValue(value, format)}</div>
      {change !== undefined && (
        <div className={`text-sm ${getTrendColor(trend)}`}>
          {trend === 'up' ? '+' : '-'}
          {Math.abs(change)}%
          {getTrendIcon(trend)}
        </div>
      )}
    </div>
  );
};

export default KPICard;
```

This KPI Card component accepts the specified props and displays the title, large value, change percentage with color (green for up, red for down), and an optional icon. The component uses Tailwind CSS classes to style the card with a modern design and shadow.

The `formatValue` function handles formatting the value based on the specified `format` prop ('currency', 'number', or 'percent').

The `getTrendColor` and `getTrendIcon` functions determine the appropriate color and icon for the change percentage based on the `trend` prop ('up' or 'down').

You can customize the styling further by modifying the Tailwind CSS classes used in the component.
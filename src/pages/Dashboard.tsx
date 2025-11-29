Here's the TypeScript React component for the Dashboard Page with the requested features:

```tsx
import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { KPICard, WeeklyTrendChart } from '../components';

const DashboardPage: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('');

  const { data: gmvMaxData, isLoading: isGmvMaxLoading } = trpc.gmvMax.list.useQuery();
  const { data: weeklyTrendData, isLoading: isWeeklyTrendLoading } = trpc.gmvMax.getWeeklyTrend.useQuery({ week: selectedWeek });

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(event.target.value);
  };

  if (isGmvMaxLoading || isWeeklyTrendLoading) {
    return <div>Loading...</div>;
  }

  const lastEightWeeks = gmvMaxData?.slice(-8).map((data) => data.week) || [];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">GMV Max Ads Dashboard</h1>

      <div className="mb-4">
        <label htmlFor="weekSelector" className="mr-2">
          Select Week:
        </label>
        <select
          id="weekSelector"
          className="border border-gray-300 rounded py-1 px-2"
          value={selectedWeek}
          onChange={handleWeekChange}
        >
          {lastEightWeeks.map((week) => (
            <option key={week} value={week}>
              {week}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <KPICard title="GMV" value={gmvMaxData?.find((data) => data.week === selectedWeek)?.gmv || 0} />
        <KPICard title="ROAS" value={gmvMaxData?.find((data) => data.week === selectedWeek)?.roas || 0} />
        <KPICard title="Net Profit" value={gmvMaxData?.find((data) => data.week === selectedWeek)?.netProfit || 0} />
        <KPICard title="Orders" value={gmvMaxData?.find((data) => data.week === selectedWeek)?.orders || 0} />
        <KPICard title="Ad Spend" value={gmvMaxData?.find((data) => data.week === selectedWeek)?.adSpend || 0} />
        <KPICard title="Break-even ROAS" value={gmvMaxData?.find((data) => data.week === selectedWeek)?.breakEvenRoas || 0} />
      </div>

      <div className="mb-8">
        <WeeklyTrendChart data={weeklyTrendData} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Top Performing Products</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">GMV</th>
              <th className="py-2">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {/* Render top performing products */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
```

This component includes all the requested features:

1. Header with the title "GMV Max Ads Dashboard".
2. Week selector dropdown showing the last 8 weeks.
3. Grid of KPI Cards displaying GMV, ROAS, Net Profit, Orders, Ad Spend, and Break-even ROAS.
4. Weekly Trend Chart component (you'll need to implement the chart component separately).
5. Top Performing Products table (you'll need to populate the table with actual data).

The component uses the `trpc.gmvMax.list` and `trpc.gmvMax.getWeeklyTrend` queries to fetch data. It also utilizes the `KPICard` and `WeeklyTrendChart` components, which you'll need to create separately.

The component is styled using Tailwind CSS classes for a grid layout.

A loading state is shown while the data is being fetched.

Remember to replace the placeholder data and implement the missing components to complete the functionality of the Dashboard Page.
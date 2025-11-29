Here's the Week Selector component in TypeScript React using date-fns for date calculations and Tailwind CSS for styling:

```tsx
import React, { useState, useEffect } from 'react';
import { getWeek, getYear, startOfWeek, endOfWeek, format } from 'date-fns';

interface WeekSelectorProps {
  onWeekChange: (data: { weekNumber: number; year: number; startDate: string; endDate: string }) => void;
  defaultWeek?: number;
  defaultYear?: number;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ onWeekChange, defaultWeek, defaultYear }) => {
  const [weekNumber, setWeekNumber] = useState(defaultWeek || getWeek(new Date()));
  const [year, setYear] = useState(defaultYear || getYear(new Date()));

  useEffect(() => {
    const startDate = startOfWeek(new Date(year, 0, 1 + (weekNumber - 1) * 7), { weekStartsOn: 1 });
    const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

    onWeekChange({
      weekNumber,
      year,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
    });
  }, [weekNumber, year, onWeekChange]);

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 52) {
      setWeekNumber(value);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setYear(value);
  };

  const startDate = startOfWeek(new Date(year, 0, 1 + (weekNumber - 1) * 7), { weekStartsOn: 1 });
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

  return (
    <div className="flex items-center space-x-4">
      <div>
        <label htmlFor="weekNumber" className="block text-sm font-medium text-gray-700">
          Week Number
        </label>
        <input
          type="number"
          id="weekNumber"
          min="1"
          max="52"
          value={weekNumber}
          onChange={handleWeekChange}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="text-sm text-gray-500">
        {format(startDate, 'MMM d')} - {format(endDate, 'MMM d')}
      </div>
    </div>
  );
};

export default WeekSelector;
```

This component allows the user to select a week number and year, and it automatically calculates the corresponding start and end dates of the selected week. The `onWeekChange` callback is invoked whenever the selected week or year changes, providing the week number, year, start date, and end date as arguments.

The component uses Tailwind CSS classes for styling the input fields and labels. You can customize the styling further based on your specific design requirements.
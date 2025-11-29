Here's a TypeScript React component for a Data Preview Table with the specified props and features, using Tailwind CSS:

```tsx
import React from 'react';

interface DataPreviewTableProps {
  data: Array<Record<string, any>>;
  maxRows?: number;
  title?: string;
}

const DataPreviewTable: React.FC<DataPreviewTableProps> = ({ data, maxRows = 10, title }) => {
  const displayData = data.slice(0, maxRows);
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="overflow-x-auto">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-gray-600">Total count: {data.length}</p>
    </div>
  );
};

export default DataPreviewTable;
```

This component does the following:

1. It takes in the `data`, `maxRows` (default: 10), and `title` props.
2. It slices the `data` array based on the `maxRows` prop to limit the number of rows displayed.
3. It extracts the headers from the first object in the `data` array, assuming all objects have the same structure.
4. It renders a table with the headers and the sliced data.
5. It applies alternating row colors using the Tailwind CSS classes `bg-gray-50` and `bg-white`.
6. It displays the total count of the data below the table.
7. It uses the `overflow-x-auto` class to make the table responsive with horizontal scroll when needed.

You can import and use this component in your application, passing the required `data` prop and optionally the `maxRows` and `title` props.
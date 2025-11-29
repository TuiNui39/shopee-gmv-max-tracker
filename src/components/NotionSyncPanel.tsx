Here's the TypeScript React component for the Notion Sync Panel with the requested features:

```tsx
import React, { useState, useEffect } from 'react';
import { trpc } from '../trpc';
import NotionSyncButton from './NotionSyncButton';

interface Report {
  id: string;
  name: string;
  notionPageId: string;
}

const NotionSyncPanel: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [syncStatus, setSyncStatus] = useState<Record<string, boolean>>({});
  const [statusFilter, setStatusFilter] = useState<'all' | 'synced' | 'unsynced'>('all');

  useEffect(() => {
    const fetchReports = async () => {
      const data = await trpc.gmvMax.list.query();
      setReports(data);
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const fetchSyncStatus = async () => {
      const status = await trpc.notion.getSyncStatus.query();
      setSyncStatus(status);
    };

    fetchSyncStatus();
  }, []);

  const handleSync = async () => {
    await trpc.syncAll.mutate();
    const status = await trpc.notion.getSyncStatus.query();
    setSyncStatus(status);
  };

  const handleRefresh = async () => {
    const status = await trpc.notion.getSyncStatus.query();
    setSyncStatus(status);
  };

  const filteredReports = reports.filter((report) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'synced') return syncStatus[report.id];
    if (statusFilter === 'unsynced') return !syncStatus[report.id];
    return false;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notion Sync Panel</h2>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSync}
        >
          Sync All
        </button>
        <div>
          <label htmlFor="statusFilter" className="mr-2">
            Filter by status:
          </label>
          <select
            id="statusFilter"
            className="px-2 py-1 border rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'synced' | 'unsynced')}
          >
            <option value="all">All</option>
            <option value="synced">Synced</option>
            <option value="unsynced">Unsynced</option>
          </select>
        </div>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
      <ul>
        {filteredReports.map((report) => (
          <li key={report.id} className="flex items-center mb-2">
            <span className="mr-2">{report.name}</span>
            <NotionSyncButton reportId={report.id} />
            <a
              href={`https://www.notion.so/${report.notionPageId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline ml-2"
            >
              Notion Page
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotionSyncPanel;
```

This component uses the `trpc` library to fetch the list of reports, get the sync status, and trigger the sync actions. It also utilizes the `NotionSyncButton` component for individual report sync buttons.

The component allows filtering the reports by sync status using a dropdown menu, and provides a "Sync All" button to sync all reports at once. The "Refresh" button updates the sync status of the reports.

The Notion page links are displayed using the `notionPageId` property of each report.

The component is styled using Tailwind CSS classes for a clean and responsive layout.
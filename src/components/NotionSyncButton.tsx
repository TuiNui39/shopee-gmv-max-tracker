import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { FaCheck, FaClock, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

interface NotionSyncButtonProps {
  reportId: number;
  onSyncComplete?: () => void;
}

const NotionSyncButton: React.FC<NotionSyncButtonProps> = ({ reportId, onSyncComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [syncedPageUrl, setSyncedPageUrl] = useState<string | null>(null);

  const { data: syncStatus, refetch: refetchSyncStatus } = trpc.notion.getSyncStatus.useQuery(
    { reportId },
    { refetchOnWindowFocus: false }
  );

  const { mutateAsync: syncReport } = trpc.notion.syncReport.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setSyncedPageUrl(data.url);
      refetchSyncStatus();
      onSyncComplete?.();
    },
    onError: () => {
      setIsLoading(false);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSync = () => {
    syncReport({ reportId });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`flex items-center space-x-1 px-2 py-1 rounded ${
          isLoading ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        onClick={handleSync}
        disabled={isLoading}
      >
        <SiNotion className="w-4 h-4" />
        <span>{isLoading ? 'Syncing...' : 'Sync to Notion'}</span>
      </button>
      {syncStatus && (
        <div className="flex items-center space-x-1">
          {syncStatus.status === 'synced' && (
            <>
              <FaCheck className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500">
                Last synced: {new Date(syncStatus.lastSyncedAt).toLocaleString()}
              </span>
            </>
          )}
          {syncStatus.status === 'never_synced' && (
            <>
              <FaClock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Never synced</span>
            </>
          )}
          {syncStatus.status === 'error' && (
            <>
              <FaExclamationTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500">Error syncing</span>
            </>
          )}
          {isLoading && <FaSpinner className="w-4 h-4 animate-spin text-blue-500" />}
        </div>
      )}
      {syncedPageUrl && (
        <a
          href={syncedPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          View in Notion
        </a>
      )}
    </div>
  );
};

export default NotionSyncButton;
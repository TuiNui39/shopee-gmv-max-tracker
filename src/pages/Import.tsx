Here's the TypeScript React component for the Import Page with the requested features:

```tsx
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { CSVUploader } from './CSVUploader';
import { DataPreviewTable } from './DataPreviewTable';
import { ImportStepper } from './ImportStepper';

type ImportStep = 1 | 2 | 3 | 4;

export const ImportPage: React.FC = () => {
  const [step, setStep] = useState<ImportStep>(1);
  const [shopeeCSV, setShopeeCSV] = useState<File | null>(null);
  const [bigSellerCSV, setBigSellerCSV] = useState<File | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<{ number: number; year: number; dates: [Date, Date] } | null>(null);
  
  const uploadShopeeCSV = trpc.import.uploadShopeeCSV.useMutation();
  const uploadBigSellerCSV = trpc.import.uploadBigSellerCSV.useMutation();
  const matchAndImport = trpc.import.matchAndImport.useMutation();

  const handleShopeeCSVUpload = async () => {
    if (shopeeCSV) {
      await uploadShopeeCSV.mutateAsync({ file: shopeeCSV });
      setStep(2);
    }
  };

  const handleBigSellerCSVUpload = async () => {
    if (bigSellerCSV) {
      await uploadBigSellerCSV.mutateAsync({ file: bigSellerCSV });
      setStep(3);
    }
  };

  const handleMatchAndImport = async () => {
    if (selectedWeek) {
      await matchAndImport.mutateAsync({ week: selectedWeek });
      setStep(4);
    }
  };

  const handleStartNewImport = () => {
    setStep(1);
    setShopeeCSV(null);
    setBigSellerCSV(null);
    setSelectedWeek(null);
  };

  return (
    <div className="container mx-auto">
      <ImportStepper step={step} />

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 1: Upload Shopee Ads CSV</h2>
          <CSVUploader onFileSelect={setShopeeCSV} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleShopeeCSVUpload}
            disabled={!shopeeCSV || uploadShopeeCSV.isLoading}
          >
            {uploadShopeeCSV.isLoading ? 'Parsing...' : 'Parse'}
          </button>
          {uploadShopeeCSV.isSuccess && <DataPreviewTable data={uploadShopeeCSV.data} />}
          {uploadShopeeCSV.isError && <p className="text-red-500">{uploadShopeeCSV.error.message}</p>}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 2: Upload BigSeller CSV</h2>
          <CSVUploader onFileSelect={setBigSellerCSV} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleBigSellerCSVUpload}
            disabled={!bigSellerCSV || uploadBigSellerCSV.isLoading}
          >
            {uploadBigSellerCSV.isLoading ? 'Parsing...' : 'Parse'}
          </button>
          {uploadBigSellerCSV.isSuccess && <DataPreviewTable data={uploadBigSellerCSV.data} />}
          {uploadBigSellerCSV.isError && <p className="text-red-500">{uploadBigSellerCSV.error.message}</p>}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 3: Review & Match</h2>
          <p>Matched Products: {matchAndImport.data?.matchedProducts}</p>
          <p>Unmatched Shopee: {matchAndImport.data?.unmatchedShopee}</p>
          <p>Unmatched BigSeller: {matchAndImport.data?.unmatchedBigSeller}</p>
          <WeekSelector onWeekSelect={setSelectedWeek} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleMatchAndImport}
            disabled={!selectedWeek || matchAndImport.isLoading}
          >
            {matchAndImport.isLoading ? 'Matching & Importing...' : 'Match & Import'}
          </button>
          {matchAndImport.isError && <p className="text-red-500">{matchAndImport.error.message}</p>}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 4: Success</h2>
          <p>GMV: {matchAndImport.data?.summary.gmv}</p>
          <p>Orders: {matchAndImport.data?.summary.orders}</p>
          <p>Products: {matchAndImport.data?.summary.products}</p>
          <a href="/report" className="text-blue-500 underline">View Report</a>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleStartNewImport}
          >
            Start New Import
          </button>
        </div>
      )}
    </div>
  );
};

interface WeekSelectorProps {
  onWeekSelect: (week: { number: number; year: number; dates: [Date, Date] }) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ onWeekSelect }) => {
  // Implement week selector logic here
  return null;
};
```

Note: This component assumes the existence of `CSVUploader`, `DataPreviewTable`, `ImportStepper`, and `WeekSelector` components, which you'll need to implement separately. Also, make sure to replace the `trpc` import with your actual tRPC client instance.

The component handles the different steps of the import process, including uploading Shopee Ads CSV, uploading BigSeller CSV, matching and importing data, and displaying the success summary. It uses the tRPC hooks for the corresponding API endpoints and handles the loading and error states.

The component is styled using Tailwind CSS classes for a clean and responsive layout.
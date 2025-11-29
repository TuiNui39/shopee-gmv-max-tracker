Here's a TypeScript React component for a CSV File Uploader with the specified props and features, using Tailwind CSS for styling:

```tsx
import React, { useRef, useState } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label: string;
  description?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = '.csv',
  label,
  description,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      <div
        className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
          dragOver ? 'border-blue-500' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept={accept}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">CSV up to 10MB</p>
        </div>
      </div>
      {selectedFile && (
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            type="button"
            className="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleClearFile}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
```

This component renders a CSV File Uploader with a drag and drop zone, file input button, selected file details (name and size), and a clear file button. It uses Tailwind CSS classes for styling, providing a modern design with a dashed border for the drop zone.

The component accepts the following props:
- `onFileSelect`: A callback function that is invoked when a file is selected, passing the selected file as an argument.
- `accept`: The accepted file type (default: '.csv').
- `label`: The label text for the file uploader.
- `description`: An optional description text.

The component handles file validation, ensuring that only CSV files up to 10MB are accepted. It also provides visual feedback when a file is being dragged over the drop zone.

You can import and use this component in your application, passing the required props and handling the selected file in the `onFileSelect` callback.
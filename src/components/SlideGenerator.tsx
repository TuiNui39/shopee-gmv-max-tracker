Here's the TypeScript React component for the Slide Generator with the requested features and props:

```tsx
import React, { useState } from 'react';
import { trpc } from '../trpc';
import SlidePreview from './SlidePreview';

interface SlideGeneratorProps {
  reportId: number;
}

const SlideGenerator: React.FC<SlideGeneratorProps> = ({ reportId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState<string[]>([]);

  const generateSlides = trpc.slides.generateSlides.useMutation();
  const exportSlides = trpc.slides.exportSlides.useMutation();

  const handleGenerateSlides = async () => {
    setIsLoading(true);
    try {
      const generatedSlides = await generateSlides.mutateAsync({ reportId });
      setSlides(generatedSlides);
    } catch (error) {
      console.error('Error generating slides:', error);
    }
    setIsLoading(false);
  };

  const handleExportPDF = async () => {
    try {
      const pdfUrl = await exportSlides.mutateAsync({ reportId, format: 'pdf' });
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const handleExportPPT = async () => {
    try {
      const pptUrl = await exportSlides.mutateAsync({ reportId, format: 'ppt' });
      window.open(pptUrl, '_blank');
    } catch (error) {
      console.error('Error exporting PPT:', error);
    }
  };

  return (
    <div className="slide-generator">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerateSlides}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Slides'}
      </button>

      {slides.length > 0 && (
        <div className="mt-8">
          <SlidePreview slides={slides} />

          <div className="mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleExportPDF}
            >
              Export PDF
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleExportPPT}
            >
              Export PPT
            </button>
          </div>

          <div className="mt-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleGenerateSlides}
            >
              Regenerate Slides
            </button>
          </div>

          <div className="mt-4">
            <a href={exportSlides.data?.pdfUrl} download className="text-blue-500 underline">
              Download PDF
            </a>
            <a href={exportSlides.data?.pptUrl} download className="ml-4 text-blue-500 underline">
              Download PPT
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideGenerator;
```

This component uses the `trpc.slides.generateSlides` and `trpc.slides.exportSlides` mutations to generate and export slides. It also uses the `SlidePreview` component to display the generated slides.

The component has a loading state that is displayed while the slides are being generated. Once the slides are generated, the `SlidePreview` component is rendered along with the export buttons (PDF and PPT) and the regenerate button.

The export buttons trigger the `exportSlides` mutation with the specified format (PDF or PPT) and open the exported file in a new tab. The download links are displayed using the `exportSlides.data` object.

The component uses Tailwind CSS classes for styling the buttons and links.
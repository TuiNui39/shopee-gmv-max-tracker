Here's a TypeScript React component for the Slide Preview with the requested features:

```tsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface SlidePreviewProps {
  slideContent: string;
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slideNumber: number) => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  slideContent,
  currentSlide,
  totalSlides,
  onSlideChange,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      onSlideChange(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides) {
      onSlideChange(currentSlide + 1);
    }
  };

  const handleThumbnailClick = (slideNumber: number) => {
    onSlideChange(slideNumber);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
          {Array.from({ length: totalSlides }, (_, i) => (
            <div
              key={i}
              className={`cursor-pointer p-2 mb-2 rounded ${
                currentSlide === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
              onClick={() => handleThumbnailClick(i + 1)}
            >
              Slide {i + 1}
            </div>
          ))}
        </div>
        <div className="w-3/4 p-8 relative">
          <ReactMarkdown className="prose max-w-none">
            {slideContent}
          </ReactMarkdown>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
              onClick={handlePrevSlide}
              disabled={currentSlide === 1}
            >
              Prev
            </button>
            <span className="text-lg">
              {currentSlide} / {totalSlides}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded ml-4"
              onClick={handleNextSlide}
              disabled={currentSlide === totalSlides}
            >
              Next
            </button>
          </div>
          <button
            className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidePreview;
```

This component uses the `react-markdown` library to render the slide content from markdown. It also utilizes Tailwind CSS classes for styling.

The component includes navigation buttons (prev/next), a slide counter, a slide thumbnails sidebar, and a full-screen mode toggle button.

When a thumbnail is clicked, the `handleThumbnailClick` function is called, which triggers the `onSlideChange` callback with the corresponding slide number.

The full-screen mode is implemented by toggling a state variable `isFullScreen` and applying conditional classes to the outer div.

Make sure to install the necessary dependencies (`react-markdown` and `tailwindcss`) before using this component.
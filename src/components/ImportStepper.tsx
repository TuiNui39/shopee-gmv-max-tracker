Here's the TypeScript React component for the Multi-Step Import Flow using Tailwind CSS:

```tsx
import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface MultiStepImportFlowProps {
  currentStep: number;
  steps: Step[];
}

const MultiStepImportFlow: React.FC<MultiStepImportFlowProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                step.number < currentStep
                  ? 'bg-green-500 text-white'
                  : step.number === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step.number < currentStep ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <div className="mt-2 text-sm font-medium">{step.title}</div>
            <div className="mt-1 text-xs text-gray-500">{step.description}</div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-grow border-t-2 transition duration-500 ease-in-out ${
                step.number < currentStep ? 'border-green-500' : 'border-gray-300'
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MultiStepImportFlow;
```

This component takes two props:
- `currentStep`: A number representing the current step (1-4).
- `steps`: An array of objects representing each step, with properties `number`, `title`, and `description`.

The component renders each step as a circular badge with the step number or a checkmark if the step is completed. The current step is highlighted with a blue background, completed steps have a green background, and future steps have a gray background.

The step title and description are displayed below each badge.

A progress line is rendered between the steps, with the color changing to green for completed steps.

The component uses Tailwind CSS classes for styling, making it easy to customize the appearance of the multi-step import flow.
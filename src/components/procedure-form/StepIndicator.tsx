
import { CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  completed: boolean;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps: Step[] = [
    { number: 1, title: 'Informations générales', completed: currentStep > 1 },
    { number: 2, title: 'Étapes et conditions', completed: currentStep > 2 },
    { number: 3, title: 'Documents requis', completed: currentStep > 3 },
    { number: 4, title: 'Modalités et délais', completed: currentStep > 4 },
    { number: 5, title: 'Numérisation et modalités', completed: currentStep > 5 },
    { number: 6, title: 'Informations complémentaires', completed: currentStep > 6 }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            step.completed ? 'bg-emerald-600 border-emerald-600 text-white' :
            step.number === currentStep ? 'border-emerald-600 text-emerald-600' :
            'border-gray-300 text-gray-300'
          }`}>
            {step.completed ? <CheckCircle className="w-5 h-5" /> : step.number}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-2 ${
              step.completed ? 'bg-emerald-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

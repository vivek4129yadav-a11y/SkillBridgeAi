import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface PhaseIndicatorProps {
  currentPhase: number;
  completedPhases: number[];
}

const PHASES = [
  { num: 1, label: 'Situation' },
  { num: 2, label: 'Skills' },
  { num: 3, label: 'Work Style' },
  { num: 4, label: 'Goals' },
  { num: 5, label: 'Wildcard' },
];

export const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({ currentPhase, completedPhases }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10" />
      {PHASES.map((phase) => {
        const isCompleted = completedPhases.includes(phase.num);
        const isCurrent = currentPhase === phase.num;
        
        return (
          <div key={phase.num} className="flex flex-col items-center gap-2 bg-white px-2">
            <div
              className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isCompleted ? "bg-green-500 text-white" : "",
                isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse" : "",
                !isCompleted && !isCurrent ? "bg-gray-100 text-gray-400" : ""
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : phase.num}
            </div>
            <span
              className={clsx(
                "text-xs font-medium hidden sm:block",
                isCompleted ? "text-green-600" : "",
                isCurrent ? "text-blue-600" : "",
                !isCompleted && !isCurrent ? "text-gray-400" : ""
              )}
            >
              {phase.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

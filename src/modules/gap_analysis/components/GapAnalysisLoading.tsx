import React from 'react';
import { Loader2 } from 'lucide-react';

export const GapAnalysisLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 max-w-2xl mx-auto text-center px-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-100 blur-xl opacity-50 animate-pulse" />
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Analyzing your profile...</h2>
        <p className="text-gray-500 font-medium max-w-sm mx-auto">
          We are comparing your skills against current job market demands in your area.
        </p>
      </div>
    </div>
  );
};

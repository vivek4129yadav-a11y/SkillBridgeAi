import React from 'react';
import { AlertCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RetakeNoticeProps {
  retriesUsed: number;
  maxRetakes: number;
  nextAvailableAt: string | null;
}

export const RetakeNotice: React.FC<RetakeNoticeProps> = ({ retriesUsed, maxRetakes, nextAvailableAt }) => {
  const remaining = Math.max(0, maxRetakes - retriesUsed);
  const total = maxRetakes + 1;
  const isLast = remaining === 0 && !nextAvailableAt;
  
  if (nextAvailableAt) {
    const date = new Date(nextAvailableAt).toLocaleString(undefined, { 
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
    });
    return (
      <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-lg p-3 sm:p-4 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm shadow-sm">
         <div className="flex items-center gap-2 font-medium">
           <Calendar className="w-4 h-4 text-orange-600" />
           <span>Next attempt available on {date}</span>
         </div>
         <Link to="/gap-analysis" className="text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md font-medium transition-colors border border-orange-200">
           View Your Gap Analysis →
         </Link>
      </div>
    );
  }

  if (isLast) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 mb-6 flex items-center justify-center gap-2 text-sm font-medium shadow-sm">
         <AlertCircle className="w-4 h-4" />
         <span>This is your final attempt</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 text-gray-600 rounded-lg p-3 mb-6 flex justify-center text-sm font-medium">
       Attempt {retriesUsed + 1} of {total} <span className="mx-2">•</span> {remaining} retake(s) remaining
    </div>
  );
};

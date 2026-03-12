import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface AnswerInputProps {
  questionType: 'text' | 'mcq' | 'rating';
  options: string[] | null;
  onSubmit: (answer: string) => void;
  isLoading: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ questionType, options, onSubmit, isLoading }) => {
  const [textVal, setTextVal] = useState('');
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    if (questionType === 'text' && textVal.length >= 10) {
      onSubmit(textVal);
    } else if (questionType === 'mcq' && selectedOpt) {
      onSubmit(selectedOpt);
    } else if (questionType === 'rating' && selectedRating) {
      onSubmit(selectedRating.toString());
    }
  };

  const isSubmitDisabled = 
    (questionType === 'text' && textVal.length < 10) ||
    (questionType === 'mcq' && !selectedOpt) ||
    (questionType === 'rating' && !selectedRating) ||
    isLoading;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {questionType === 'text' && (
        <div className="flex flex-col gap-2">
          <textarea
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            disabled={isLoading}
            className="w-full min-h-[120px] p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
            placeholder="Share your thoughts here..."
          />
          {textVal.length > 5 && (
            <div className="text-xs text-gray-500 text-right">
              {textVal.length} characters (min 10)
            </div>
          )}
        </div>
      )}

      {questionType === 'mcq' && options && (
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelectedOpt(opt)}
              disabled={isLoading}
              className={clsx(
                "w-full text-left p-4 rounded-lg border-2 transition-all font-medium disabled:opacity-50",
                selectedOpt === opt 
                  ? "border-blue-600 bg-blue-50 text-blue-900" 
                  : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {questionType === 'rating' && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setSelectedRating(num)}
                disabled={isLoading}
                className={clsx(
                  "flex-1 aspect-square max-h-[64px] rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-all disabled:opacity-50",
                  selectedRating === num
                    ? "border-blue-600 bg-blue-600 text-white shadow-md scale-105"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-600"
                )}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-500 px-1 font-medium">
            <span>Not at all</span>
            <span>Somewhat</span>
            <span>Very much</span>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Next →</span>
          )}
        </button>
      </div>
    </form>
  );
};

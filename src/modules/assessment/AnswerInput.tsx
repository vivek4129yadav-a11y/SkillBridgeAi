import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface AnswerInputProps {
  questionType: 'text' | 'mcq' | 'rating';
  options: string[] | null;
  questionText?: string;
  onSubmit: (answer: string) => void;
  isLoading: boolean;
}

const RATING_LEVELS = [
  { value: 1, label: 'Novice' },
  { value: 2, label: 'Basic' },
  { value: 3, label: 'Intermediate' },
  { value: 4, label: 'Advanced' },
  { value: 5, label: 'Expert' },
];

function resolveType(type: 'text' | 'mcq' | 'rating', text?: string, options?: string[] | null): 'text' | 'mcq' | 'rating' {
  if (!text) return type;
  const lower = text.toLowerCase();
  const isOpenEnded = /\b(describe|explain|in your own words|in a few words|tell us|what are your|how do you|share your|detail)\b/i.test(lower);
  const isRating = /\b(rate|scale of 1|scale 1-5|how comfortable|how confident)\b/i.test(lower);

  if (isOpenEnded && !isRating) return 'text';
  if (isRating || type === 'rating') return 'rating';
  if (type === 'mcq' && options && options.length >= 2) return 'mcq';
  return 'text';
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ questionType, options, questionText, onSubmit, isLoading }) => {
  const [textVal, setTextVal] = useState('');
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [ratingNote, setRatingNote] = useState('');

  const activeType = resolveType(questionType, questionText, options);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    if (activeType === 'text' && textVal.trim().length >= 3) {
      onSubmit(textVal.trim());
    } else if (activeType === 'mcq' && selectedOpt) {
      onSubmit(selectedOpt);
    } else if (activeType === 'rating' && selectedRating) {
      const combined = ratingNote.trim() ? `${selectedRating} (Note: ${ratingNote.trim()})` : selectedRating.toString();
      onSubmit(combined);
    }
  };

  const isSubmitDisabled = 
    (activeType === 'text' && textVal.trim().length < 3) ||
    (activeType === 'mcq' && !selectedOpt) ||
    (activeType === 'rating' && !selectedRating) ||
    isLoading;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {activeType === 'text' && (
        <div className="flex flex-col gap-2">
          <textarea
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            disabled={isLoading}
            className="w-full min-h-[120px] p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50 text-sm"
            placeholder="Share your thoughts here..."
            required
          />
          {textVal.length > 0 && (
            <div className="text-xs text-gray-400 text-right">
              {textVal.length} characters
            </div>
          )}
        </div>
      )}

      {activeType === 'mcq' && options && (
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelectedOpt(opt)}
              disabled={isLoading}
              className={clsx(
                "w-full text-left p-4 rounded-lg border-2 transition-all font-medium disabled:opacity-50 text-sm",
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

      {activeType === 'rating' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {RATING_LEVELS.map((level) => {
              const selected = selectedRating === level.value;
              return (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setSelectedRating(level.value)}
                  disabled={isLoading}
                  className={clsx(
                    "py-3 px-1 rounded-xl border-2 flex flex-col items-center justify-center transition-all disabled:opacity-50",
                    selected
                      ? "border-blue-600 bg-blue-600 text-white shadow-md scale-102"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700"
                  )}
                >
                  <span className="text-lg font-bold">{level.value}</span>
                  <span className={clsx("text-[11px] font-medium truncate max-w-full", selected ? "text-blue-100" : "text-gray-500")}>
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
          <input
            type="text"
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400"
            placeholder="Optional: add detail or context..."
            value={ratingNote}
            onChange={(e) => setRatingNote(e.target.value)}
          />
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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

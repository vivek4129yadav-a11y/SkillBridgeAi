import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Check, PenLine } from 'lucide-react';
import { Question } from '@/types/assessment';

interface AnswerInputProps {
  question: Question;
  value: string | string[];
  onChange: (answer: string | string[]) => void;
  disabled?: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ question, value, onChange, disabled }) => {
  const [otherText, setOtherText] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const isMulti = question.allows_multiple;
  const hasOther = question.allows_other;

  // Normalize value to array for uniform handling
  const selectedValues: string[] = Array.isArray(value) ? value : (value ? [value] : []);

  const isSelected = (opt: string) => selectedValues.includes(opt);
  const isOtherSelected = selectedValues.some(v => !question.options?.includes(v) && v !== '');

  const handleChipClick = (opt: string) => {
    if (disabled) return;
    if (isMulti) {
      const next = isSelected(opt)
        ? selectedValues.filter(v => v !== opt)
        : [...selectedValues.filter(v => question.options?.includes(v) || (!question.options?.includes(v) && v !== opt)), opt];
      onChange(next);
    } else {
      // Single select
      if (isSelected(opt)) {
        onChange([]);
      } else {
        // Remove any "other" text from selection when picking a chip
        const withoutOther = [opt];
        onChange(withoutOther);
        setShowOtherInput(false);
      }
    }
  };

  const handleOtherToggle = () => {
    if (disabled) return;
    if (showOtherInput) {
      // Collapse and remove other text from selection
      setShowOtherInput(false);
      setOtherText('');
      const cleaned = selectedValues.filter(v => question.options?.includes(v));
      onChange(isMulti ? cleaned : (cleaned[0] || ''));
    } else {
      setShowOtherInput(true);
    }
  };

  const handleOtherTextChange = (text: string) => {
    setOtherText(text);
    const chipSelections = selectedValues.filter(v => question.options?.includes(v));
    if (text.trim()) {
      onChange(isMulti ? [...chipSelections, text.trim()] : text.trim());
    } else {
      onChange(isMulti ? chipSelections : '');
    }
  };

  // --- MCQ / Chip layout ---
  if (question.question_type === 'mcq' && question.options) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {question.options.map((opt) => {
            const selected = isSelected(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleChipClick(opt)}
                disabled={disabled}
                className={clsx(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-150 select-none',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  selected
                    ? 'border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-200'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50'
                )}
              >
                {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
                {opt}
              </button>
            );
          })}

          {hasOther && (
            <button
              type="button"
              onClick={handleOtherToggle}
              disabled={disabled}
              className={clsx(
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-150 select-none',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                showOtherInput || isOtherSelected
                  ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-200'
                  : 'border-dashed border-gray-300 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-600'
              )}
            >
              <PenLine className="w-3.5 h-3.5 shrink-0" />
              Other
            </button>
          )}
        </div>

        {showOtherInput && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
            <input
              type="text"
              value={otherText}
              onChange={(e) => handleOtherTextChange(e.target.value)}
              disabled={disabled}
              autoFocus
              placeholder="Type your answer..."
              className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-300 bg-orange-50 focus:outline-none focus:border-orange-500 focus:bg-white text-sm text-gray-800 placeholder:text-gray-400 transition-all disabled:opacity-50"
            />
          </div>
        )}

        {isMulti && (
          <p className="text-xs text-gray-400 mt-0.5">Select all that apply</p>
        )}
      </div>
    );
  }

  // --- Rating layout ---
  if (question.question_type === 'rating') {
    const ratingVal = typeof value === 'string' ? parseInt(value) : 0;
    const labels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num.toString())}
              disabled={disabled}
              className={clsx(
                'flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-150 disabled:opacity-50',
                ratingVal === num
                  ? 'border-violet-600 bg-violet-600 text-white shadow-md'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-violet-300'
              )}
            >
              <span className="text-lg">{num}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 px-1">
          {labels.map(l => <span key={l}>{l}</span>)}
        </div>
      </div>
    );
  }

  // --- Text fallback ---
  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={3}
        placeholder="Share your thoughts..."
        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white text-sm text-gray-800 placeholder:text-gray-400 transition-all resize-none disabled:opacity-50"
      />
    </div>
  );
};

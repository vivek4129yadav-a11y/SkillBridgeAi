import React, { useState, useCallback } from 'react';
import { AssessmentBatch, Question } from '@/types/assessment';
import { AnswerInput } from './AnswerInput';
import { Loader2, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface BatchAnswers {
  [questionIndex: number]: string | string[];
}

interface QuestionCardProps {
  batch: AssessmentBatch;
  questionNumberOffset: number; // cumulative number before this batch
  totalEstimate: number;
  onSubmit: (answers: BatchAnswers) => void;
  isLoading: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  batch,
  questionNumberOffset,
  totalEstimate,
  onSubmit,
  isLoading,
}) => {
  const [answers, setAnswers] = useState<BatchAnswers>({});
  const [batchKey] = useState(() => batch.questions.map(q => q.question).join('|'));

  // Reset answers when batch changes
  const [prevBatchKey, setPrevBatchKey] = useState(batchKey);
  if (batchKey !== prevBatchKey) {
    setPrevBatchKey(batchKey);
    setAnswers({});
  }

  const handleChange = useCallback((idx: number, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [idx]: value }));
  }, []);

  // Check if all questions have a non-empty answer
  const isComplete = batch.questions.every((q, idx) => {
    const val = answers[idx];
    if (!val) return false;
    if (Array.isArray(val)) return val.length > 0;
    return val.trim().length > 0;
  });

  const handleSubmit = () => {
    if (!isComplete || isLoading) return;
    onSubmit(answers);
  };

  return (
    <div className="flex flex-col gap-0 animate-in fade-in slide-in-from-bottom-4 duration-400">
      {/* Phase badge */}
      <div className="mb-5 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold tracking-wide uppercase">
          Phase {batch.phase} · {batch.phase_name}
        </span>
        <span className="text-xs text-gray-400 font-medium">
          Q{questionNumberOffset + 1}–{questionNumberOffset + batch.questions.length} of ~{totalEstimate}
        </span>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-5">
        {batch.questions.map((question, idx) => {
          const answered = (() => {
            const val = answers[idx];
            if (!val) return false;
            if (Array.isArray(val)) return val.length > 0;
            return val.trim().length > 0;
          })();

          return (
            <div
              key={`${question.question}-${idx}`}
              className={clsx(
                'rounded-2xl border-2 p-5 sm:p-6 transition-all duration-200',
                answered
                  ? 'border-violet-200 bg-gradient-to-br from-violet-50 to-white shadow-sm shadow-violet-100'
                  : 'border-gray-100 bg-white shadow-sm'
              )}
            >
              {/* Question number indicator */}
              <div className="flex items-start gap-3 mb-4">
                <div className={clsx(
                  'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                  answered
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-500'
                )}>
                  {questionNumberOffset + idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug pt-0.5">
                  {question.question}
                </h3>
              </div>

              <div className="pl-10">
                <AnswerInput
                  question={question}
                  value={answers[idx] ?? (question.allows_multiple ? [] : '')}
                  onChange={(val) => handleChange(idx, val)}
                  disabled={isLoading}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isComplete || isLoading}
          className={clsx(
            'flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-150',
            isComplete && !isLoading
              ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

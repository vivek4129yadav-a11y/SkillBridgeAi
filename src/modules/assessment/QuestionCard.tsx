import React, { useState } from 'react';
import { Question } from '@/types/assessment';
import { AnswerInput } from './AnswerInput';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalEstimate: number;
  onSubmit: (answer: string) => void;
  isLoading: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  questionNumber, 
  totalEstimate, 
  onSubmit, 
  isLoading 
}) => {
  // Simple state to force re-render animation when question changes
  const [animationKey, setAnimationKey] = useState(0);

  React.useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [question.question]);

  return (
    <div 
      key={animationKey} 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            Phase {question.phase}: {question.phase_name}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {question.question}
          </h2>
          <div className="text-sm text-gray-500 mt-3">
            Question {questionNumber} of ~{totalEstimate}
          </div>
        </div>

        <div className="mt-4">
          <AnswerInput 
            questionType={question.question_type}
            options={question.options}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

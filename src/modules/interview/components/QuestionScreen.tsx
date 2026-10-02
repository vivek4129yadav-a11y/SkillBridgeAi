import { useState } from 'react';
import { Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { SessionState, AnswerFeedback } from '../types';

interface QuestionScreenProps {
  session: SessionState;
  onAnswer: (answer: string) => void;
  lastFeedback: AnswerFeedback | null;
  loading: boolean;
}

export function QuestionScreen({
  session,
  onAnswer,
  lastFeedback,
  loading,
}: QuestionScreenProps) {
  const [answer, setAnswer] = useState('');
  const { current_question, question_index, total_questions } = session;
  const progress = (question_index / total_questions) * 100;

  function handleSubmit() {
    if (answer.trim()) {
      onAnswer(answer.trim());
      setAnswer('');
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'hsl(220 15% 55%)' }}>
          <span>Question {question_index + 1} of {total_questions}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(220 25% 15%)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
          />
        </div>
      </div>

      {/* Previous Answer Feedback Toast */}
      {lastFeedback && (
        <div className="p-4 rounded-xl border flex gap-3 text-sm animate-fade-in"
          style={{ background: 'hsl(222 47% 13%)', borderColor: 'hsl(222 30% 22%)' }}>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-emerald-400">{lastFeedback.score}/10</span>
          </div>
          <div className="space-y-1">
            <p className="text-white text-xs font-medium">{lastFeedback.feedback}</p>
            {lastFeedback.improvement && (
              <p className="text-xs flex items-center gap-1" style={{ color: 'hsl(38 92% 50%)' }}>
                <AlertCircle size={12} /> {lastFeedback.improvement}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Current Question Card */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: 'hsl(220 25% 18%)', color: 'hsl(220 15% 65%)' }}>
            {current_question?.type || 'General'}
          </span>
          <span className="text-xs" style={{ color: 'hsl(220 15% 45%)' }}>
            Q{question_index + 1}
          </span>
        </div>

        <p className="text-lg font-medium text-white leading-relaxed">
          {current_question?.question}
        </p>

        <textarea
          className="input-field w-full h-36 resize-none text-sm"
          placeholder="Type your answer here… Speak naturally and mention real examples, tools used, and results achieved."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleSubmit(); }}
        />

        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'hsl(220 15% 40%)' }}>
            {answer.split(/\s+/).filter(Boolean).length} words · Ctrl+Enter to submit
          </span>
          <button
            className="btn-primary"
            disabled={!answer.trim() || loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin inline mr-2" />
                Scoring Answer…
              </>
            ) : (
              <>
                Submit & Next <ChevronRight size={16} className="inline ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

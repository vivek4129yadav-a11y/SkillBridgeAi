import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStatus, useStartAssessment, useSubmitAnswer } from '@/hooks/useAssessment';
import { PhaseIndicator } from './PhaseIndicator';
import { QuestionCard } from './QuestionCard';
import { RetakeNotice } from './RetakeNotice';
import { AssessmentComplete } from './AssessmentComplete';
import { AssessmentSession } from '@/types/assessment';
import { Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: status, isLoading: isStatusLoading, error: statusError } = useAssessmentStatus();
  const { mutate: startAssessment, isPending: isStarting } = useStartAssessment();
  const { mutateAsync: submitAnswer, isPending: isSubmitting } = useSubmitAnswer();

  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [autoRetryCount, setAutoRetryCount] = useState(0);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  // Track cumulative question number (before current batch)
  const [questionOffset, setQuestionOffset] = useState(0);

  // Auto-resume if there's an incomplete session
  useEffect(() => {
    if (status?.has_incomplete && !session && !isStarting) {
      handleStart();
    }
  }, [status]);

  const handleStart = () => {
    startAssessment(undefined, {
      onSuccess: (data) => {
        setSession(data);
        setQuestionOffset(data.question_number - 1);
        const prevPhases = Array.from({ length: data.phase - 1 }, (_, i) => i + 1);
        setCompletedPhases(prevPhases);
      },
      onError: (err: any) => {
        toast({
          title: 'Error starting assessment',
          description: err?.response?.data?.detail?.message || 'Please try again later.',
          variant: 'destructive',
        });
      },
    });
  };

  /**
   * BatchAnswers: { [questionIndex]: string | string[] }
   * We serialize to JSON for the backend.
   * Backend receives: answer = JSON string of { "0": [...], "1": "..." }
   */
  const handleSubmitBatch = async (batchAnswers: Record<number, string | string[]>) => {
    if (!session) return;
    try {
      setQuotaExceeded(false);

      // Convert numeric keys to string for JSON stability
      const payload: Record<string, string | string[]> = {};
      Object.entries(batchAnswers).forEach(([k, v]) => {
        payload[k] = v;
      });

      const data = await submitAnswer({
        session_id: session.session_id,
        answer: JSON.stringify(payload),
      });

      // Update offset: new question_number is cumulative, offset = before this batch
      if (data.batch) {
        setQuestionOffset(data.question_number - 1);
      }

      if (data.phase > session.phase) {
        setCompletedPhases(prev => Array.from(new Set([...prev, session.phase])));
      }

      setSession(data);
      setAutoRetryCount(0);
    } catch (err: any) {
      const errCode = err?.response?.data?.detail?.error_code;
      if (errCode === 'OPENAI_RATE_LIMIT') {
        if (autoRetryCount < 3) {
          setAutoRetryCount(prev => prev + 1);
          setTimeout(() => handleSubmitBatch(batchAnswers), 3000);
        } else {
          toast({ title: 'Network busy', description: 'High traffic. Try again in a moment.', variant: 'destructive' });
        }
      } else if (errCode === 'OPENAI_QUOTA_EXCEEDED') {
        setQuotaExceeded(true);
      } else if (errCode === 'ASSESSMENT_NO_RETAKES') {
        toast({ title: 'No retakes available', description: 'You have used all attempts.', variant: 'destructive' });
        window.location.reload();
      } else {
        toast({ title: 'Connection issue', description: 'Progress saved. Check your internet and retry.', variant: 'destructive' });
      }
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isStatusLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        <p className="text-gray-500 font-medium animate-pulse">Loading assessment status...</p>
      </div>
    );
  }

  if (statusError || !status) {
    return (
      <div className="max-w-[720px] mx-auto pt-8 px-4">
        <div className="bg-red-50 text-red-800 p-6 rounded-xl border border-red-200">
          <h3 className="font-bold flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5" /> Failed to load status
          </h3>
          <p>Please check your connection and refresh the page.</p>
        </div>
      </div>
    );
  }

  // ── Completed (not in retake session) ────────────────────────────────────
  if (status.has_completed && !status.has_incomplete && !session) {
    const eligible = status.can_retake;
    return (
      <div className="max-w-[720px] mx-auto pt-8 px-4">
        {!eligible && (
          <RetakeNotice
            retriesUsed={status.retakes_used}
            maxRetakes={status.max_retakes}
            nextAvailableAt={status.next_retake_available_at}
          />
        )}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-in fade-in duration-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment already completed</h2>
          <p className="text-gray-600 mb-8">
            Review your personalized gap analysis to see results and your learning roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/gap-analysis')}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg font-bold hover:bg-violet-700 transition"
            >
              View Gap Analysis →
            </button>
            {eligible && (
              <button
                onClick={() => {
                  if (window.confirm('This will start a new assessment. Are you sure?')) handleStart();
                }}
                disabled={isStarting}
                className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isStarting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Retake Assessment
              </button>
            )}
          </div>
          {eligible && (
            <div className="mt-6 text-sm text-gray-500 font-medium">
              {status.retakes_remaining} retake(s) remaining.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Not started ──────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="max-w-[720px] mx-auto pt-8 px-4">
        <RetakeNotice
          retriesUsed={status.retakes_used}
          maxRetakes={status.max_retakes}
          nextAvailableAt={status.next_retake_available_at}
        />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Career Skill Assessment</h1>
          <p className="text-gray-500 leading-relaxed max-w-lg mx-auto mb-2">
            We'll ask you about your skills in quick batches — select from chip options or type your own.
          </p>
          <p className="text-gray-400 text-sm mb-8">Takes about 5–8 minutes.</p>
          <button
            onClick={handleStart}
            disabled={isStarting}
            className="w-full sm:w-auto px-8 py-4 bg-violet-600 text-white rounded-xl font-bold text-lg hover:bg-violet-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mx-auto"
          >
            {isStarting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Starting...</>
            ) : (
              'Start Assessment →'
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── Completed session (just finished) ────────────────────────────────────
  if (session.is_complete) {
    return (
      <div className="max-w-[720px] mx-auto pt-8 px-4">
        <AssessmentComplete
          skillsCount={session.skills_found?.length || 0}
          skillsFound={session.skills_found}
          assessmentSummary={(session as any).assessment_summary}
        />
      </div>
    );
  }

  // ── Active session ────────────────────────────────────────────────────────
  const batch = session.batch;

  return (
    <div className="max-w-[720px] mx-auto pt-8 px-4 pb-16">
      <PhaseIndicator currentPhase={session.phase} completedPhases={completedPhases} />

      {quotaExceeded && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 mb-6 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">
            Assessment temporarily unavailable (API quota exceeded). Please try again in a few hours.
          </div>
        </div>
      )}

      {!quotaExceeded && autoRetryCount > 0 && (
        <div className="text-center mb-6 text-sm text-violet-600 flex items-center justify-center gap-2 font-medium bg-violet-50 py-2 rounded-lg animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin" /> Generating next questions...
        </div>
      )}

      {batch ? (
        <QuestionCard
          batch={batch}
          questionNumberOffset={questionOffset}
          totalEstimate={10}
          onSubmit={handleSubmitBatch}
          isLoading={isSubmitting && !quotaExceeded}
        />
      ) : (
        // Fallback: batch not available yet
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          <p className="text-gray-400 text-sm font-medium">Loading questions...</p>
        </div>
      )}

      <div className="mt-10 text-center text-xs font-medium text-gray-400 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Progress auto-saved
      </div>
    </div>
  );
};

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

  // Auto-start if resuming
  useEffect(() => {
    if (status?.has_incomplete && !session && !isStarting) {
      handleStart();
    }
  }, [status]);

  const handleStart = () => {
    startAssessment(undefined, {
      onSuccess: (data) => {
        setSession(data);
        const prevPhases = Array.from({ length: data.phase - 1 }, (_, i) => i + 1);
        setCompletedPhases(prevPhases);
      },
      onError: (err: any) => {
        toast({
          title: "Error starting assessment",
          description: err?.response?.data?.detail?.message || "Please try again later.",
          variant: "destructive"
        });
      }
    });
  };

  const handleSubmit = async (answer: string) => {
    if (!session) return;
    try {
      setQuotaExceeded(false);
      const data = await submitAnswer({ session_id: session.session_id, answer });
      
      setSession(data);
      
      if (data.phase > session.phase) {
        setCompletedPhases(prev => Array.from(new Set([...prev, session.phase])));
      }
      setAutoRetryCount(0); // Reset retry on success
      
    } catch (err: any) {
      const errCode = err?.response?.data?.detail?.error_code;
      if (errCode === 'OPENAI_RATE_LIMIT') {
        if (autoRetryCount < 3) {
          setAutoRetryCount(prev => prev + 1);
          setTimeout(() => handleSubmit(answer), 3000);
        } else {
          toast({
            title: "Network busy",
            description: "We are experiencing high traffic. Please try again.",
            variant: "destructive"
          });
        }
      } else if (errCode === 'OPENAI_QUOTA_EXCEEDED') {
        setQuotaExceeded(true);
      } else if (errCode === 'ASSESSMENT_NO_RETAKES') {
        toast({
          title: "No retakes available",
          description: "You have used all attempts.",
          variant: "destructive"
        });
        window.location.reload(); 
      } else {
        toast({
          title: "Connection issue",
          description: "Your progress is saved. Please check your internet and try again.",
          variant: "destructive"
        });
      }
    }
  };

  if (isStatusLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 font-medium animate-pulse">Loading assessment status...</p>
      </div>
    );
  }

  if (statusError || !status) {
    return (
      <div className="max-w-[680px] mx-auto pt-8 px-4">
        <div className="bg-red-50 text-red-800 p-6 rounded-xl border border-red-200">
          <h3 className="font-bold flex items-center gap-2 mb-2"><AlertCircle className="w-5 h-5"/> Failed to load status</h3>
          <p>Please check your connection and refresh the page.</p>
        </div>
      </div>
    );
  }

  // STATE C & D: Completed and not currently in an active retake session
  if (status.has_completed && !status.has_incomplete && !session) {
    const isEligibleForRetake = status.can_retake;
    
    return (
      <div className="max-w-[680px] mx-auto pt-8 px-4">
        {!isEligibleForRetake && (
          <RetakeNotice 
            retriesUsed={status.retakes_used} 
            maxRetakes={status.max_retakes} 
            nextAvailableAt={status.next_retake_available_at} 
          />
        )}
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-in fade-in duration-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You have already completed the assessment</h2>
          <p className="text-gray-600 mb-8">
            You can review your personalized gap analysis report to see your results and learning roadmap.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/gap-analysis')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              View Gap Analysis →
            </button>
            
            {isEligibleForRetake && (
               <button
                 onClick={() => {
                   if (window.confirm("This will start a new assessment. Are you sure?")) {
                     handleStart();
                   }
                 }}
                 disabled={isStarting}
                 className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50"
               >
                 {isStarting ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                 Retake Assessment
               </button>
            )}
          </div>
          
          {isEligibleForRetake && (
            <div className="mt-6 text-sm text-gray-500 font-medium">
              You have {status.retakes_remaining} retake(s) remaining.
            </div>
          )}
        </div>
      </div>
    );
  }

  // STATE A: Not started / eligible
  if (!session) {
    return (
      <div className="max-w-[680px] mx-auto pt-8 px-4">
        <RetakeNotice 
          retriesUsed={status.retakes_used} 
          maxRetakes={status.max_retakes} 
          nextAvailableAt={status.next_retake_available_at} 
        />
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Career Skill Assessment</h1>
          <p className="text-gray-600 leading-relaxed max-w-lg mx-auto mb-8">
            Answer ~10 conversational questions. This helps us understand your skills and goals accurately. Takes about 8-10 minutes.
          </p>
          <button
            onClick={handleStart}
            disabled={isStarting}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
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

  // State: Completed Session (Just finished)
  if (session.is_complete) {
    return (
      <div className="max-w-[680px] mx-auto pt-8 px-4">
        <AssessmentComplete 
          skillsCount={session.skills_found?.length || 0}
          skillsFound={session.skills_found}
          assessmentSummary={(session as any).assessment_summary}
        />
      </div>
    );
  }

  // State B: Active Session
  return (
    <div className="max-w-[680px] mx-auto pt-8 px-4 pb-12">
      <PhaseIndicator currentPhase={session.phase} completedPhases={completedPhases} />
      
      {quotaExceeded && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 mb-6 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">
            Assessment temporarily unavailable. We've hit our OpenAI quota limit. Please try again in a few hours.
          </div>
        </div>
      )}
      
      {!quotaExceeded && autoRetryCount > 0 && (
         <div className="text-center mb-6 text-sm text-blue-600 flex items-center justify-center gap-2 font-medium bg-blue-50 py-2 rounded-lg animate-pulse">
           <Loader2 className="w-4 h-4 animate-spin" /> Generating next question...
         </div>
      )}
      
      <QuestionCard 
        question={session.question}
        questionNumber={session.question_number}
        totalEstimate={10}
        onSubmit={handleSubmit}
        isLoading={isSubmitting && !quotaExceeded}
      />
      
      <div className="mt-8 text-center text-sm font-medium text-gray-400 flex items-center justify-center gap-2">
         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
         Your progress is auto-saved
      </div>
    </div>
  );
};

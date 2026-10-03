import { useState } from 'react';
import api from '@/lib/api';
import { SessionState, AnswerFeedback, Report } from './types';
import { SetupScreen } from './components/SetupScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ReportScreen } from './components/ReportScreen';

type Screen = 'setup' | 'interview' | 'report';

export default function MockInterviewPage() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [session, setSession] = useState<SessionState | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [lastFeedback, setLastFeedback] = useState<AnswerFeedback | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleStart(role: string, skills: string[]) {
    setLoading(true);
    setTargetRole(role);
    try {
      const { data } = await api.post('/interview/start', {
        target_role: role,
        skills,
        question_count: 5,
      });
      setSession(data.data);
      setScreen('interview');
    } catch (e) {
      console.error('[INTERVIEW] Start failed', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswer(answer: string) {
    if (!session) return;
    setLoading(true);
    try {
      const { data } = await api.post('/interview/answer', {
        session_id: session.session_id,
        question_id: session.current_question.id,
        answer,
      });

      const { scoring, next_question, question_index, is_complete } = data.data;
      setLastFeedback(scoring);

      if (is_complete) {
        // Fetch final report
        const repRes = await api.get(`/interview/report/${session.session_id}`);
        setReport(repRes.data.data.report);
        setScreen('report');
      } else {
        setSession(prev => prev ? {
          ...prev,
          current_question: next_question,
          question_index,
        } : null);
      }
    } catch (e) {
      console.error('[INTERVIEW] Answer failed', e);
    } finally {
      setLoading(false);
    }
  }

  function handleRestart() {
    setScreen('setup');
    setSession(null);
    setLastFeedback(null);
    setReport(null);
  }

  return (
    <div className="py-8 px-4">
      {screen === 'setup' && <SetupScreen onStart={handleStart} loading={loading} />}
      {screen === 'interview' && session && (
        <QuestionScreen
          session={session}
          onAnswer={handleAnswer}
          lastFeedback={lastFeedback}
          loading={loading}
        />
      )}
      {screen === 'report' && report && (
        <ReportScreen
          report={report}
          role={targetRole}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import api from '@/lib/api';
import { SkillPicker } from '../components/SkillPicker';
import { ResumeDropzone } from '../components/ResumeDropzone';

interface Props {
  onNext: (sessionId: string) => void;
}

export default function Step4_Questions({ onNext }: Props) {
  const [skills, setSkills] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const handleSkillsExtracted = (newSkills: string[]) => {
    setSkills(prev => Array.from(new Set([...prev, ...newSkills])));
  };

  const handleContinue = async () => {
    setSubmitting(true);
    try {
      const answerPayload = [
        {
          question_id: 'skills',
          question_text: 'Core Skills',
          answer: skills.join(', ') || 'General Skills',
        }
      ];
      const { data } = await api.post('/onboarding/submit-answers', { answers: answerPayload });
      onNext(data.data.session_id);
    } catch (e) {
      console.error('[ONBOARDING] Submit failed', e);
      onNext('direct-onboarding-session');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Tell us about your skills
        </h2>
        <p className="text-xs text-slate-400">
          Upload your resume or tap popular skills to match with job opportunities
        </p>
      </div>

      <ResumeDropzone
        uploading={uploading}
        setUploading={setUploading}
        uploadedFileName={uploadedFileName}
        setUploadedFileName={setUploadedFileName}
        uploadSuccessMsg={uploadSuccessMsg}
        setUploadSuccessMsg={setUploadSuccessMsg}
        onSkillsExtracted={handleSkillsExtracted}
      />

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">or choose manually</span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      <SkillPicker skills={skills} setSkills={setSkills} />

      <button
        onClick={handleContinue}
        disabled={submitting || uploading}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-4"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Saving Profile...
          </>
        ) : (
          <>
            Complete Profile <ArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}

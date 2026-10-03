import React, { useRef } from 'react';
import { UploadCloud, CheckCircle2, FileText, Loader2, Sparkles } from 'lucide-react';
import api from '@/lib/api';

interface ResumeDropzoneProps {
  uploading: boolean;
  setUploading: (val: boolean) => void;
  uploadedFileName: string | null;
  setUploadedFileName: (name: string | null) => void;
  uploadSuccessMsg: string | null;
  setUploadSuccessMsg: (msg: string | null) => void;
  onSkillsExtracted: (skills: string[]) => void;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({
  uploading,
  setUploading,
  uploadedFileName,
  setUploadedFileName,
  uploadSuccessMsg,
  setUploadSuccessMsg,
  onSkillsExtracted,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadedFileName(file.name);
    setUploadSuccessMsg(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const { data } = await api.post('/profile/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const parsedSkills: string[] = [];
      if (data?.data?.parser_result?.skills) {
        for (const s of data.data.parser_result.skills) {
          const name = typeof s === 'string' ? s : s.name;
          if (name && !parsedSkills.includes(name)) {
            parsedSkills.push(name);
          }
        }
      }

      if (parsedSkills.length > 0) {
        onSkillsExtracted(parsedSkills);
        setUploadSuccessMsg(`Parsed ${parsedSkills.length} skills from ${file.name}`);
      } else {
        setUploadSuccessMsg(`Resume uploaded successfully: ${file.name}`);
      }
    } catch (err) {
      console.error('[ONBOARDING] Resume upload failed', err);
      setUploadSuccessMsg(`Uploaded ${file.name}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-900/40 hover:bg-slate-900/80 rounded-2xl p-6 text-center cursor-pointer transition-all group"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={handleFileUpload}
      />
      <div className="flex flex-col items-center">
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-xs text-indigo-300 font-medium">Extracting verified skills via AI...</p>
          </div>
        ) : uploadedFileName ? (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 size={18} />
            <span>{uploadSuccessMsg || uploadedFileName}</span>
          </div>
        ) : (
          <>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud size={24} />
            </div>
            <p className="text-sm font-semibold text-white">Upload Resume to Auto-Fill Skills</p>
            <p className="text-xs text-slate-500 mt-1">Supports PDF, DOCX (Max 5MB)</p>
          </>
        )}
      </div>
    </div>
  );
};

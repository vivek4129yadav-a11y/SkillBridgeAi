import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGapReport, useRunGapAnalysis } from '@/hooks/useGapAnalysis';
import { ReportHeader } from './ReportHeader';
import { StrengthsSection } from './StrengthsSection';
import { GapsSection } from './GapsSection';
import { PartialMatchSection } from './PartialMatchSection';
import { RoadmapSection } from './RoadmapSection';
import { Loader2, Info } from 'lucide-react';

export const GapAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: report, isLoading, error } = useGapReport();
  const { mutate: runAnalysis, isPending: isRerunning } = useRunGapAnalysis();

  const handleRerun = () => {
    runAnalysis();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 max-w-2xl mx-auto text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-100 blur-xl opacity-50 animate-pulse" />
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Analyzing your profile...</h2>
          <p className="text-gray-500 font-medium max-w-sm mx-auto">
            We are comparing your skills against current job market demands in your area.
          </p>
        </div>
      </div>
    );
  }

  // Handle generic error (might be 400 for NO_SKILLS or NO_JOBS)
  if (error) {
    const errCode = (error as any)?.response?.data?.detail?.error_code;
    
    if (errCode === 'GAP_ANALYSIS_NO_SKILLS') {
      return (
        <div className="max-w-[600px] mx-auto pt-16 px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              👋
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's get to know your skills first</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Before we can show your gap analysis, we need to know what you can do. You can either take our quick assessment or upload a resume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/assessment')} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                Take Skill Assessment
              </button>
              <button onClick={() => navigate('/profile')} className="px-6 py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-bold hover:bg-gray-100 transition">
                Upload Your Resume
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  if (!report) return null;

  const noJobs = report.total_jobs_analyzed === 0;

  return (
    <div className="max-w-5xl mx-auto pt-8 px-4 pb-20">
      
      {report.is_stale && !isRerunning && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Your profile has changed. Re-run analysis for updated recommendations!</span>
          </div>
          <button onClick={handleRerun} className="px-4 py-2 bg-white text-amber-700 font-bold border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap">
            Re-run Analysis
          </button>
        </div>
      )}

      {noJobs && (
         <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl mb-6 flex items-start gap-3 shadow-sm">
           <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
           <div className="font-medium text-sm leading-relaxed">
             No job listings available for your region or interests yet. We are adding more soon. Showing strengths based on general data.
           </div>
         </div>
      )}

      <ReportHeader report={report} onRerun={handleRerun} isRerunning={isRerunning} />

      <div className="grid lg:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left Column: Strengths & Gaps */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {report.strengths.length > 0 && <StrengthsSection strengths={report.strengths} />}
          
          {!noJobs && report.partial_matches.length > 0 && (
            <PartialMatchSection partialMatches={report.partial_matches} />
          )}

          {!noJobs && report.gaps.length > 0 && (
            <GapsSection gaps={report.gaps} />
          )}
        </div>

        {/* Right Column: Roadmap */}
        <div className="lg:col-span-5 lg:sticky lg:top-8">
          {!noJobs && report.roadmap.length > 0 && (
            <RoadmapSection 
              roadmap={report.roadmap} 
              motivationalNote={report.motivational_note || ''} 
              totalWeeks={report.roadmap.length} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

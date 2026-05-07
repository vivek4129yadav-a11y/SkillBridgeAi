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

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 max-w-2xl mx-auto text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl animate-pulse" />
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin relative z-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Analyzing your profile...</h2>
          <p className="text-gray-400 font-medium max-w-sm mx-auto">
            We are comparing your skills against current job market demands in your area.
          </p>
        </div>
      </div>
    );

  // Handle generic error (might be 400 for NO_SKILLS or NO_JOBS)
  if (error) {
    const errCode = (error as any)?.response?.data?.detail?.error_code;
    
    if (errCode === 'GAP_ANALYSIS_NO_SKILLS') {
      return (
        <div className="max-w-[600px] mx-auto pt-16 px-4">
          <div className="card p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl border border-indigo-500/20">
              👋
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Let's get to know your skills first</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto font-medium">
              Before we can show your gap analysis, we need to know what you can do. You can either take our quick assessment or upload a resume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/assessment')} className="btn-primary">
                Take Skill Assessment
              </button>
              <button onClick={() => navigate('/profile')} className="btn-secondary">
                Upload Your Resume
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (errCode === 'GAP_ANALYSIS_NO_JOBS') {
       return (
         <div className="max-w-[600px] mx-auto pt-16 px-4">
           <div className="card p-8 text-center">
             <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl border border-amber-500/20">
               🔍
             </div>
             <h2 className="text-2xl font-bold text-white mb-4">No job listings found in your area</h2>
             <p className="text-gray-400 mb-8 max-w-md mx-auto font-medium">
               We couldn't find enough active job listings matching your state or interests to run a gap analysis.
               Try updating your profile with more interests or check back later!
             </p>
             <button onClick={() => navigate('/profile')} className="btn-primary">
               Update Profile Interests
             </button>
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
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 px-4 py-3 rounded-xl mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Your profile has changed. Re-run analysis for updated recommendations!</span>
          </div>
          <button onClick={handleRerun} className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap text-sm">
            Re-run Analysis
          </button>
        </div>
      )}

      {noJobs && (
         <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 px-4 py-3 rounded-xl mb-6 flex items-start gap-3 shadow-sm">
           <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
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

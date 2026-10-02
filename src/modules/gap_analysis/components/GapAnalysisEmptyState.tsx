import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GapAnalysisEmptyStateProps {
  type: 'no_skills' | 'no_jobs';
}

export const GapAnalysisEmptyState: React.FC<GapAnalysisEmptyStateProps> = ({ type }) => {
  const navigate = useNavigate();

  if (type === 'no_skills') {
    return (
      <div className="max-w-[600px] mx-auto pt-16 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            👋
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's get to know your skills first</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Before we can show your gap analysis, we need to know what you can do. Upload and analyze your resume to extract verified skills and match market demands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/resume-analysis')} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Analyze Resume
            </button>
            <button 
              onClick={() => navigate('/profile')} 
              className="px-6 py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
          🔍
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No job listings found in your area</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find enough active job listings matching your state or interests to run a gap analysis.
          Try updating your profile with more interests or check back later!
        </p>
        <button 
          onClick={() => navigate('/profile')} 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Update Profile Interests
        </button>
      </div>
    </div>
  );
};

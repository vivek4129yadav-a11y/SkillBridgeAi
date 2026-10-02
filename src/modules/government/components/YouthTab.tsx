import React from 'react';
import { YouthData } from '@/services/analyticsService';

interface YouthTabProps {
  youthList: YouthData[];
}

export const YouthTab: React.FC<YouthTabProps> = ({ youthList }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Youth Directory</h3>
            <p className="text-sm text-slate-500 mt-1">Granular view of candidate profiles and onboarding status</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50">
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider">Candidate</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider">Location</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider">Primary Skill</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Assessment</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {youthList.length > 0 ? youthList.map((youth, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">{youth.full_name}</span>
                      <span className="text-xs text-slate-500">ID: {youth.id.substring(0, 8)}...</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-300 text-sm">{youth.city}</span>
                      <span className="text-xs text-slate-500">{youth.state}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-indigo-400 text-sm font-medium">{youth.primary_skill || "Not Specified"}</span>
                      <span className="text-xs text-slate-500">{youth.skill_level}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-mono text-white">
                    <span className={`px-2 py-1 rounded ${youth.assessment_score >= 80 ? 'bg-emerald-500/10 text-emerald-400' : youth.assessment_score >= 50 ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      {youth.assessment_score || 0}%
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      youth.onboarding_status === 'completed' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {youth.onboarding_status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                    No youth profiles found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import { Trophy, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { Report } from '../types';

interface ReportScreenProps {
  report: Report;
  role: string;
  onRestart: () => void;
}

export function ReportScreen({ report, role, onRestart }: ReportScreenProps) {
  const gradeColors: Record<string, string> = {
    A: '#4ade80',
    'B+': '#60a5fa',
    B: '#fbbf24',
    C: '#f87171',
  };
  const gradeColor = gradeColors[report.grade] || '#60a5fa';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Score Header Card */}
      <div className="card p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
          style={{ background: `${gradeColor}20` }}>
          <Trophy size={32} style={{ color: gradeColor }} />
        </div>

        <div>
          <span className="text-4xl font-extrabold tracking-tight" style={{ color: gradeColor }}>
            {report.overall_score}
          </span>
          <span className="text-xl font-bold ml-1" style={{ color: 'hsl(220 15% 55%)' }}>/10</span>
          <span className="ml-3 px-3 py-1 rounded-lg text-sm font-bold"
            style={{ background: `${gradeColor}20`, color: gradeColor }}>
            Grade {report.grade}
          </span>
        </div>

        <p className="text-sm font-medium text-white max-w-md mx-auto">{report.summary}</p>
        <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'hsl(220 15% 50%)' }}>
          Role Evaluated: {role}
        </p>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 size={16} />
            <span>Key Strengths</span>
          </div>
          <ul className="space-y-2">
            {report.strengths?.map((s, i) => (
              <li key={i} className="text-xs flex items-start gap-2 text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <AlertCircle size={16} />
            <span>Areas to Improve</span>
          </div>
          <ul className="space-y-2">
            {report.areas_to_improve?.map((a, i) => (
              <li key={i} className="text-xs flex items-start gap-2 text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Restart Button */}
      <div className="flex justify-center pt-2">
        <button className="btn-secondary flex items-center gap-2" onClick={onRestart}>
          <RotateCcw size={16} /> Practice Another Role
        </button>
      </div>
    </div>
  );
}

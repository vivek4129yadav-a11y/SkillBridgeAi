import { useState } from 'react';
import { Mic, Loader2 } from 'lucide-react';

interface SetupScreenProps {
  onStart: (role: string, skills: string[]) => void;
  loading: boolean;
}

export function SetupScreen({ onStart, loading }: SetupScreenProps) {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');

  return (
    <div className="card p-8 max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Mic size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Mock Interview</h2>
          <p className="text-xs" style={{ color: 'hsl(220 15% 55%)' }}>Practice with AI-powered feedback</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Target Role</label>
          <input
            className="input-field"
            placeholder="e.g. Software Engineer, Data Analyst, Sales Executive"
            value={role}
            onChange={e => setRole(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Your Skills (comma-separated)</label>
          <input
            className="input-field"
            placeholder="e.g. Python, SQL, Communication, Problem Solving"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
        </div>
        <button
          className="btn-primary w-full"
          disabled={!role.trim() || loading}
          onClick={() => onStart(role.trim(), skills.split(',').map(s => s.trim()).filter(Boolean))}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin inline mr-2" />
              Generating Questions…
            </>
          ) : (
            'Start Interview →'
          )}
        </button>
      </div>

      <p className="text-xs text-center" style={{ color: 'hsl(220 15% 45%)' }}>
        5 questions · AI-scored · Instant feedback report
      </p>
    </div>
  );
}

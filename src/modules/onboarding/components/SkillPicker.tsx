import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';

const SUGGESTED_SKILLS = [
  'Python', 'SQL', 'React', 'JavaScript', 'Excel', 'Data Analysis',
  'Communication', 'Leadership', 'Sales', 'Customer Support',
  'Project Management', 'Digital Marketing', 'Git', 'FastAPI'
];

interface SkillPickerProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SkillPicker: React.FC<SkillPickerProps> = ({ skills, setSkills }) => {
  const [customSkill, setCustomSkill] = useState('');

  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed]);
      setCustomSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Popular In-Demand Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map(skill => {
            const isSelected = skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={addCustomSkill} className="flex gap-2">
        <input
          type="text"
          value={customSkill}
          onChange={e => setCustomSkill(e.target.value)}
          placeholder="Add other skills (e.g. Docker, Figma)..."
          className="flex-1 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!customSkill.trim()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-sm font-semibold flex items-center gap-1 transition-all"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      {skills.length > 0 && (
        <div className="pt-2">
          <span className="text-xs text-slate-400 font-medium">Selected ({skills.length}):</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-red-400 transition-colors"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

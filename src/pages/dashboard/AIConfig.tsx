import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Settings2, 
  MessageSquare, 
  Trophy, 
  Zap, 
  HelpCircle,
  Play,
  Plus,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const AIConfig = () => {
  const [personality, setPersonality] = useState('technical');
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Tell me about a complex electrical failure you diagnosed and fixed.', category: 'Experience' },
    { id: 2, text: 'How do you ensure safety protocols are followed in a high-voltage environment?', category: 'Safety' },
    { id: 3, text: 'What is your process for reading industrial blueprints?', category: 'Technical' }
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            AI Interview Config
            <span className="text-xs font-normal text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">Agent Settings</span>
          </h1>
          <p className="text-gray-400 mt-1">Configure your AI recruiting agents and interview criteria.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Play size={18} /> Test Agent
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Zap size={18} /> Deploy Agent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personality & Parameters */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3 text-white mb-2">
              <Cpu className="text-purple-400" size={20} />
              <h2 className="font-bold">Agent Personality</h2>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'formal', title: 'Formal & Professional', desc: 'Direct, structured, and strictly business.' },
                { id: 'technical', title: 'Technical Expert', desc: 'Deep-dives into skills and specific scenarios.' },
                { id: 'conversational', title: 'Conversational', desc: 'Relaxed tone to help candidates feel at ease.' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPersonality(p.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    personality === p.id 
                      ? 'border-purple-600 bg-purple-600/10' 
                      : 'border-gray-800 bg-gray-900/40 hover:border-gray-700'
                  }`}
                >
                  <h3 className={`text-sm font-bold ${personality === p.id ? 'text-white' : 'text-gray-400'}`}>{p.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{p.desc}</p>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-800 space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Interview Parameters</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] mb-2">
                    <span className="text-gray-400">Response Depth</span>
                    <span className="text-purple-400 font-bold">Deep</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full">
                    <div className="h-full bg-purple-500 w-[80%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-2">
                    <span className="text-gray-400">Technical Rigor</span>
                    <span className="text-purple-400 font-bold">High</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full">
                    <div className="h-full bg-purple-500 w-[95%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 p-6 rounded-3xl">
             <div className="flex items-center gap-2 text-indigo-400 mb-2">
               <ShieldCheck size={18} />
               <h3 className="text-sm font-bold">Fairness Engine</h3>
             </div>
             <p className="text-[10px] text-gray-400 leading-relaxed">
               Our AI uses a standardized scoring rubric to eliminate bias and ensure every candidate is evaluated on skills alone.
             </p>
          </div>
        </div>

        {/* Middle Column: Question Builder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-blue-400" size={20} />
                <h2 className="text-xl font-bold text-white">Interview Question Set</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-all border border-gray-700">
                <Plus size={14} /> Add Question
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="group bg-gray-900/40 border border-gray-800 p-5 rounded-2xl hover:border-blue-500/30 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Question {i + 1}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">{q.category}</span>
                      </div>
                      <p className="text-sm text-white font-medium">{q.text}</p>
                    </div>
                    <button className="text-gray-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
               <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                 <Trophy size={18} className="text-amber-400" />
                 Success Rubric
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Pass Score</p>
                    <p className="text-lg font-bold text-white">75 / 100</p>
                 </div>
                 <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Key Competency</p>
                    <p className="text-lg font-bold text-white">Safety Compliance</p>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-6 bg-gray-900/40 border border-gray-800 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <HelpCircle size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Need help with questions?</h4>
                <p className="text-xs text-gray-500">Let AI generate a tailored question set for this role.</p>
              </div>
            </div>
            <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Generate Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConfig;

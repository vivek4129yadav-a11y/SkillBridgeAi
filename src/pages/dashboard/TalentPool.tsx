import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import api from '@/lib/api';

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkill, setFilterSkill] = useState('');

  const { data: talentMatches, isLoading } = useQuery({
    queryKey: ['talent-matches-detailed', searchQuery, filterSkill],
    queryFn: async () => {
      try {
        const { data } = await api.get('/talent/matches');
        return data.data;
      } catch (err) {
        return [];
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Talent Pool</h1>
          <p className="text-gray-400 mt-1">Discover AI-matched candidates for your current and future roles.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-gray-900/60 border border-gray-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, role, or skills..." 
            className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all"
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Welding">Welding</option>
            <option value="IT">IT & Software</option>
          </select>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-gray-900/40 animate-pulse rounded-3xl border border-gray-800" />
          ))
        ) : talentMatches?.length > 0 ? (
          talentMatches.map((person: any, i: number) => (
            <div key={person.id || i} className="bg-gray-900/40 border border-gray-800 p-6 rounded-3xl hover:border-indigo-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/20 text-[10px] font-bold">
                  <Star size={12} fill="currentColor" />
                  {person.match || '90%'}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all border border-gray-700">
                  <Users size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{person.name || `Candidate ${i + 1}`}</h3>
                  <p className="text-sm text-gray-500">{person.role || 'Skilled Professional'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-rose-400" /> {person.location || 'Bhopal, MP'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-indigo-400 font-bold"><ShieldCheck size={14} /> Verified</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(person.top_skills || ['Teamwork', 'Punctuality']).map((s: string, idx: number) => (
                    <span key={idx} className="text-[10px] px-2.5 py-1 bg-gray-800/50 text-gray-400 rounded-lg border border-gray-700">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    View Full Profile <ExternalLink size={14} />
                  </button>
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-900/20 border border-dashed border-gray-800 rounded-3xl">
            <Users size={48} className="mx-auto text-gray-700 mb-4" />
            <h3 className="text-gray-400 font-bold text-xl">No candidates found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filters to find more talent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentPool;

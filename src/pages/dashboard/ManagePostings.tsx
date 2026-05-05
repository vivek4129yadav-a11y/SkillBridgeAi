import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Briefcase, 
  Plus, 
  MoreVertical, 
  MapPin, 
  Clock, 
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  AlertCircle,
  Search
} from 'lucide-react';
import api from '@/lib/api';

const ManagePostings = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: jobPostings, isLoading } = useQuery({
    queryKey: ['my-postings-detailed'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/jobs/my-postings');
        return data.data;
      } catch (err) {
        return [];
      }
    }
  });

  const filteredPostings = React.useMemo(() => {
    if (!jobPostings) return [];
    if (!searchQuery) return jobPostings;
    const q = searchQuery.toLowerCase();
    return jobPostings.filter((job: any) => 
      job.title?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q) ||
      job.location_city?.toLowerCase().includes(q) ||
      job.company_name?.toLowerCase().includes(q)
    );
  }, [jobPostings, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Job Postings</h1>
          <p className="text-gray-400 mt-1">Track, edit, and manage your active and closed job listings.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 whitespace-nowrap">
            <Plus size={20} />
            Create New
          </button>
        </div>
      </div>

      {/* Postings Table/List */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/60 border-b border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applicants</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-8"><div className="h-10 bg-gray-800 rounded-lg w-2/3" /></td>
                    <td className="px-6 py-8"><div className="h-6 bg-gray-800 rounded-lg w-12" /></td>
                    <td className="px-6 py-8"><div className="h-6 bg-gray-800 rounded-lg w-20" /></td>
                    <td className="px-6 py-8"><div className="h-10 bg-gray-800 rounded-lg w-full" /></td>
                  </tr>
                ))
              ) : filteredPostings?.length > 0 ? (
                filteredPostings.map((job: any) => (
                  <tr key={job.id} className="hover:bg-gray-800/30 transition-all group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                          <Briefcase size={22} />
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">{job.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location_city || 'Bhopal'}</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> 2 days ago</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{job.applicants_count || 0}</span>
                        <span className="text-xs text-gray-500">Applied</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded-lg border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button title="View Applicants" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all">
                          <Eye size={18} />
                        </button>
                        <button title="Edit Job" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button title="Delete" className="p-2 bg-gray-800 hover:bg-rose-500/20 rounded-lg text-gray-400 hover:text-rose-400 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle size={40} className="text-gray-700" />
                      <p className="text-gray-400 font-bold">No job postings found</p>
                      <p className="text-gray-600 text-sm">Start by creating your first job listing.</p>
                    </div>
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

export default ManagePostings;

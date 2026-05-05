import React from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Plus,
  Filter
} from 'lucide-react';

const interviews = [
  {
    id: 1,
    candidate: 'Arjun Mehra',
    role: 'Senior Electrician',
    time: '10:30 AM',
    date: 'Today',
    type: 'Video Call',
    status: 'Upcoming',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun'
  },
  {
    id: 2,
    candidate: 'Priya Sharma',
    role: 'Project Manager',
    time: '02:00 PM',
    date: 'Today',
    type: 'In-person',
    status: 'Confirmed',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  },
  {
    id: 3,
    candidate: 'Rohan Gupta',
    role: 'Solar Technician',
    time: '11:00 AM',
    date: 'Tomorrow',
    type: 'Phone Screen',
    status: 'Pending',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan'
  }
];

const Interviews = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Interview Hub
          </h1>
          <p className="text-gray-400 mt-1">Manage your interview schedules and candidate evaluations.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="btn-secondary flex-1 md:flex-none">
            <Filter size={18} />
            Filter
          </button>
          <button className="btn-primary flex-1 md:flex-none">
            <Plus size={18} />
            Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upcoming List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock size={20} className="text-indigo-400" />
              Upcoming Interviews
            </h2>
            <span className="text-xs text-gray-500 font-medium">3 scheduled for next 48h</span>
          </div>

          <div className="space-y-4">
            {interviews.map((interview) => (
              <div 
                key={interview.id}
                className="group bg-gray-900/40 border border-gray-800 p-5 rounded-3xl hover:border-indigo-500/50 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className="relative">
                    <img 
                      src={interview.image} 
                      alt={interview.candidate} 
                      className="w-14 h-14 rounded-2xl bg-gray-800 border-2 border-gray-700 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-gray-900 rounded-full" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">
                          {interview.candidate}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">{interview.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{interview.time}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{interview.date}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        {interview.type === 'Video Call' ? <Video size={14} /> : <MapPin size={14} />}
                        {interview.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        interview.status === 'Upcoming' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        interview.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                  </div>

                  <button className="p-2 text-gray-600 hover:text-white transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 border-2 border-dashed border-gray-800 rounded-3xl text-gray-500 text-sm font-bold hover:border-gray-700 hover:text-gray-400 transition-all flex items-center justify-center gap-2">
            <Plus size={16} />
            Schedule more interviews
          </button>
        </div>

        {/* Right Sidebar: Quick Actions & Stats */}
        <div className="space-y-6">
          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-3xl">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <CalendarIcon size={18} className="text-indigo-400" />
              Calendar View
            </h3>
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <span key={d} className="text-[10px] font-bold text-gray-600 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: 31 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer
                    ${i + 1 === 5 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:bg-gray-800'}
                    ${[12, 18, 25].includes(i + 1) ? 'relative after:content-[\'\'] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-indigo-400 after:rounded-full' : ''}
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-indigo-900/20 border border-gray-800 p-6 rounded-3xl">
            <h3 className="text-white font-bold mb-4">Pipeline Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Total Applicants</span>
                <span className="text-sm font-bold text-white">124</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Shortlisted</span>
                <span className="text-sm font-bold text-white">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Interviewed</span>
                <span className="text-sm font-bold text-white">42</span>
              </div>
              <div className="h-px bg-gray-800 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-emerald-400 font-bold">Hired</span>
                <span className="text-sm font-bold text-emerald-400">8</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={18} className="text-amber-400" />
              <h4 className="text-sm font-bold text-white">AI Interview Prep</h4>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
              Get AI-generated questions based on the candidate\'s skills and your job requirements.
            </p>
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest">
              Generate Prep Kit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Interviews;

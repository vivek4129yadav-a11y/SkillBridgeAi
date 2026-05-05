import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Camera, 
  Save, 
  Plus,
  Shield,
  Trash2,
  ExternalLink,
  Mail
} from 'lucide-react';

const teamMembers = [
  { id: 1, name: 'Siddharth Varma', role: 'Admin', email: 'sid@acme.com', status: 'Active' },
  { id: 2, name: 'Ananya Rao', role: 'Recruiter', email: 'ananya@acme.com', status: 'Active' },
  { id: 3, name: 'Rahul Dev', role: 'Hiring Manager', email: 'rahul@acme.com', status: 'Pending' },
];

const OrgSettings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Organization Settings
          </h1>
          <p className="text-gray-400 mt-1">Configure your company identity and manage team access.</p>
        </div>
        <button className="btn-primary">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Profile & Branding */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Company Identity */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Building2 size={22} className="text-indigo-400" />
              Company Profile
            </h2>
            
            <div className="flex items-center gap-8 p-6 bg-gray-900/40 border border-gray-800 rounded-3xl">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-3xl bg-gray-800 border-2 border-gray-700 flex items-center justify-center overflow-hidden group-hover:border-indigo-500 transition-all">
                  <Building2 size={40} className="text-gray-600 group-hover:text-indigo-400 transition-all" />
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-xl shadow-lg border-4 border-gray-900 group-hover:scale-110 transition-all">
                  <Camera size={14} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg">Company Logo</h4>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG or SVG. Max 2MB.</p>
                <div className="mt-3 flex gap-3">
                  <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">Upload New</button>
                  <button className="text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-300 transition-colors">Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Company Name</label>
                <input type="text" defaultValue="Acme Corporation" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Website</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input type="text" defaultValue="https://acme.co" className="input-field pl-12" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">About the Organization</label>
                <textarea rows={4} className="input-field resize-none" defaultValue="Acme Corp is a leading innovation hub focused on sustainable energy solutions..." />
              </div>
            </div>
          </section>

          {/* Locations */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin size={22} className="text-emerald-400" />
                Locations
              </h2>
              <button className="text-xs font-black text-emerald-400 flex items-center gap-1 uppercase tracking-widest">
                <Plus size={14} /> Add Branch
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-gray-900/40 border border-gray-800 rounded-3xl hover:border-emerald-500/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Building2 size={16} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="text-gray-500 hover:text-white transition-colors"><Save size={14} /></button>
                    <button className="text-gray-500 hover:text-rose-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
                <h4 className="text-white font-bold">Main Headquarters</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Tech Park, Phase II, Bhopal, MP 462001</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md text-[10px] font-bold">Primary</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Team Management */}
        <div className="space-y-8">
          <section className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users size={20} className="text-amber-400" />
                Our Team
              </h2>
              <button className="p-2 bg-amber-500/10 text-amber-400 rounded-xl hover:bg-amber-500 hover:text-white transition-all">
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-5">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-xs font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{member.name}</p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Shield size={10} className="text-amber-500" /> {member.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold ${member.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-2xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2">
              <Mail size={14} />
              Invite via Email
            </button>
          </section>

          <section className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-[2.5rem] space-y-4">
             <h3 className="text-white font-bold text-sm">Need help?</h3>
             <p className="text-xs text-gray-400 leading-relaxed">
               Setting up a large enterprise? Contact our support for specialized team management features.
             </p>
             <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-all">
               Visit Help Center <ExternalLink size={12} />
             </button>
          </section>
        </div>

      </div>
    </div>
  );
};

export default OrgSettings;

import React, { useState } from 'react';
import { 
  Building2, 
  Upload, 
  Globe, 
  Camera, 
  Layout, 
  Save, 
  Eye, 
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

const BrandCenter = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const companyData = {
    name: 'Acme Corporation',
    logo: null,
    banner: null,
    tagline: 'Building the future of sustainable energy.',
    description: 'We are a global leader in renewable energy solutions, specializing in smart grid technology and industrial-scale solar installations.',
    website: 'https://acme-corp.com',
    location: 'Bhopal, Madhya Pradesh',
    perks: ['Health Insurance', 'Flexible Hours', 'Skill Development', 'Quarterly Bonuses']
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Brand Center
            <span className="text-xs font-normal text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">Employer Identity</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage how your company appears to prospective candidates.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Eye size={18} /> Preview Profile
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'profile', label: 'Company Profile', icon: Building2 },
            { id: 'visuals', label: 'Visual Assets', icon: ImageIcon },
            { id: 'perks', label: 'Culture & Perks', icon: Layout },
            { id: 'links', label: 'Social & Links', icon: Globe },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-gray-500 hover:bg-gray-800/40 hover:text-gray-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}

          <div className="mt-8 p-4 bg-gray-900/40 border border-gray-800 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <CheckCircle2 size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Profile Strength</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-emerald-500 w-[85%]" />
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Add your company vision to reach 100% and get better talent matches.
            </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-9">
          <div className="glass-card p-8 space-y-8">
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">Company Name</label>
                    <input type="text" className="input-field" defaultValue={companyData.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">Website URL</label>
                    <input type="text" className="input-field" defaultValue={companyData.website} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Tagline</label>
                  <input type="text" className="input-field" defaultValue={companyData.tagline} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">About the Company</label>
                  <textarea rows={6} className="input-field resize-none" defaultValue={companyData.description}></textarea>
                </div>
              </div>
            )}

            {activeTab === 'visuals' && (
              <div className="space-y-8 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-400">Company Logo</label>
                    <div className="w-32 h-32 bg-gray-800 border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-indigo-500 transition-all">
                      <Camera size={24} className="text-gray-500 group-hover:text-indigo-400" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Upload</span>
                    </div>
                    <p className="text-[10px] text-gray-600">Recommended size: 400x400px. PNG, SVG, or JPG.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-400">Profile Banner</label>
                    <div className="w-full h-32 bg-gray-800 border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-indigo-500 transition-all">
                      <Upload size={24} className="text-gray-500 group-hover:text-indigo-400" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Upload Cover</span>
                    </div>
                    <p className="text-[10px] text-gray-600">Wide format recommended (e.g. 1200x300px).</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-bold text-white">Brand Colors</h3>
                  <div className="flex gap-4">
                    {['#6366f1', '#10b981', '#f59e0b', '#3b82f6'].map(color => (
                      <div key={color} className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-gray-800 shadow-lg" style={{ backgroundColor: color }} />
                        <span className="text-[9px] font-mono text-gray-500 uppercase">{color}</span>
                      </div>
                    ))}
                    <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-500 hover:border-white transition-all">
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'perks' && (
              <div className="space-y-6 animate-slide-up">
                <h3 className="text-sm font-bold text-white mb-4">Employee Perks & Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyData.perks.map((perk, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700 rounded-xl group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-sm text-gray-300 font-medium">{perk}</span>
                      </div>
                      <button className="text-gray-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all">×</button>
                    </div>
                  ))}
                  <button className="p-4 border-2 border-dashed border-gray-800 rounded-xl text-gray-600 hover:text-gray-400 hover:bg-gray-800/20 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    + Add New Perk
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCenter;

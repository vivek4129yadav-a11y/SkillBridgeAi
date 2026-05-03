import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingService } from '@/services/onboardingService';
import { useAuthStore } from '@/store/authStore';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Delhi'
];

const INDUSTRIES = [
  'IT & Software', 'Manufacturing', 'Retail', 'Healthcare', 'Construction', 
  'Finance', 'Education', 'Logistics', 'Automobile', 'Other'
];

const COMPANY_SIZES = [
  { val: '1-10', label: 'Startup (1-10)' },
  { val: '11-50', label: 'Small Business (11-50)' },
  { val: '51-200', label: 'Medium Enterprise (51-200)' },
  { val: '200+', label: 'Large Corporate (200+)' }
];

const WORK_TYPES = [
  { id: 'Full-time', icon: '👔' },
  { id: 'Part-time', icon: '🕒' },
  { id: 'Contract', icon: '📄' },
  { id: 'Apprenticeship', icon: '🎓' }
];

const SKILLS = [
  'Java', 'React', 'Python', 'Welding', 'Electrical', 'Plumbing', 
  'Sales', 'Marketing', 'Accounting', 'Project Management', 'Data Analysis'
];

const EmployerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roleInput, setRoleInput] = useState('');

  const [formData, setFormData] = useState({
    contact_name: '',
    designation: '',
    company_name: '',
    industry: 'IT & Software',
    company_size: '11-50',
    state: '',
    city: '',
    hiring_roles: [],
    candidate_skills: [],
    work_types: []
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const addRole = (e) => {
    if (e.key === 'Enter' && roleInput.trim()) {
      e.preventDefault();
      if (!formData.hiring_roles.includes(roleInput.trim())) {
        setFormData(prev => ({
          ...prev,
          hiring_roles: [...prev.hiring_roles, roleInput.trim()]
        }));
      }
      setRoleInput('');
    }
  };

  const removeRole = (role) => {
    setFormData(prev => ({
      ...prev,
      hiring_roles: prev.hiring_roles.filter(r => r !== role)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 5) {
      nextStep();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        contact_person_name: formData.contact_name,
        designation: formData.designation,
        company_name: formData.company_name,
        industry_sector: formData.industry,
        company_size: formData.company_size,
        state: formData.state,
        city: formData.city,
        roles_hiring_for: formData.hiring_roles,
        preferred_skills: formData.candidate_skills,
        work_type_offered: formData.work_types.length > 0 ? formData.work_types[0] : null
      };
      await onboardingService.submitEmployerOnboarding(payload);
      
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }

      navigate('/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(Array.isArray(detail) ? detail[0].msg : (detail || 'Failed to submit profile. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white mb-6 shadow-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hiring Partner</h2>
              <p className="text-slate-500 mt-2 text-lg font-medium">Identify yourself as a recruiter or owner</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="contact_name"
                  required
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 transition-all outline-none bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  required
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g. Chief Talent Officer"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 transition-all outline-none bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-6 shadow-xl shadow-indigo-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Company Info</h2>
              <p className="text-slate-500 mt-2 text-lg font-medium">Tell us about your organization</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  required
                  value={formData.company_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corporation"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1 uppercase tracking-widest text-center">Industry Sector</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INDUSTRIES.map(ind => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, industry: ind }))}
                      className={`px-4 py-4 rounded-2xl border-2 text-sm font-bold transition-all ${
                        formData.industry === ind
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md scale-105'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white mb-6 shadow-xl shadow-emerald-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Scale & Presence</h2>
              <p className="text-slate-500 mt-2 text-lg font-medium">Headquarters and team size</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 text-center uppercase tracking-widest">Company Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {COMPANY_SIZES.map(size => (
                    <button
                      key={size.val}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, company_size: size.val }))}
                      className={`p-4 rounded-2xl border-2 transition-all text-xs font-black ${
                        formData.company_size === size.val
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">State</label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-white font-bold"
                  >
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none bg-slate-50/50"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 text-white mb-6 shadow-xl shadow-amber-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Job Roles</h2>
              <p className="text-slate-500 mt-2 text-lg font-medium">What positions are you looking to fill?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Active Roles</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyDown={addRole}
                    placeholder="Type role & press Enter (e.g. Electrician)"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none bg-slate-50/50 font-medium"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500">
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold">ENTER</kbd>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.hiring_roles.map(role => (
                    <span key={role} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold border border-slate-800 shadow-sm animate-in zoom-in-50 duration-200">
                      {role}
                      <button onClick={() => removeRole(role)} className="hover:text-amber-400 transition-colors">×</button>
                    </span>
                  ))}
                  {formData.hiring_roles.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No roles added yet</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 text-center uppercase tracking-widest">Key Skills Needed</label>
                <div className="flex flex-wrap justify-center gap-2">
                  {SKILLS.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleArrayItem('candidate_skills', skill)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        formData.candidate_skills.includes(skill)
                          ? 'bg-amber-500 text-white shadow-lg'
                          : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white mb-6 shadow-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04custom 11.666 11.666 0 00-1.022 7.711 11.908 11.908 0 005.158 7.377 12.13 12.13 0 005.482 1.922 12.13 12.13 0 005.482-1.922 11.908 11.908 0 005.158-7.377 11.666 11.666 0 00-1.022-7.711z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Contract Types</h2>
              <p className="text-slate-500 mt-2 text-lg font-medium">Final selection for your profile</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700 text-center uppercase tracking-tighter">Employment Models</label>
              <div className="grid grid-cols-1 gap-3">
                {WORK_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleArrayItem('work_types', type.id)}
                    className={`p-5 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
                      formData.work_types.includes(type.id)
                        ? 'border-slate-900 bg-slate-50 shadow-md'
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{type.icon}</span>
                      <span className={`text-lg font-bold ${formData.work_types.includes(type.id) ? 'text-slate-900' : 'text-slate-500'}`}>
                        {type.id}
                      </span>
                    </div>
                    {formData.work_types.includes(type.id) && (
                      <div className="w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress System */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-1000 ease-in-out relative"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
          <span className="text-sm font-black text-slate-900 w-12 text-right">{Math.round((currentStep / 5) * 100)}%</span>
        </div>

        {/* Master Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_60px_120px_-20px_rgba(15,23,42,0.12)] border-2 border-slate-50 overflow-hidden">
          <div className="p-10 md:p-16">
            <form onSubmit={handleSubmit}>
              {renderStep()}

              {error && (
                <div className="mt-8 p-5 bg-rose-50 border-2 border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in slide-in-from-top-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="mt-14 flex gap-5">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={loading}
                    className="flex-1 px-8 py-5 border-2 border-slate-100 text-slate-400 font-bold rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] px-8 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-black hover:shadow-2xl hover:shadow-slate-300 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 group"
                >
                  {loading ? (
                    <div className="w-8 h-8 border-4 border-slate-600 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{currentStep === 5 ? 'Launch Dashboard' : 'Continue'}</span>
                      <svg className="w-6 h-6 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-slate-50/50 p-6 border-t border-slate-50 flex justify-between items-center">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-slate-900' : 'bg-slate-200'}`} />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Enterprise Secured</span>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center items-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="font-black text-xl tracking-tighter">SANKALP</div>
          <div className="h-4 w-[1px] bg-slate-400" />
          <div className="text-[10px] font-bold uppercase tracking-widest">SkillBridge AI Partnership</div>
        </div>
      </div>
    </div>
  );
};

export default EmployerOnboarding;

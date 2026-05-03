import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingService } from '@/services/onboardingService';
import { useAuthStore } from '@/store/authStore';

const SECTORS = [
  { id: 'Skilling', label: 'Skilling & Training', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'Employment', label: 'Employment Linkage', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'Women Empowerment', label: 'Women Empowerment', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'Youth Development', label: 'Youth Development', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id: 'Digital Literacy', label: 'Digital Literacy', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'Other', label: 'Other Social Work', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

const BENEFICIARIES = [
  { id: 'Youth', label: 'Rural/Urban Youth' },
  { id: 'Women', label: 'Women & SHGs' },
  { id: 'Blue Collar', label: 'Technical Trades' },
  { id: 'Informal Workers', label: 'Daily Wage Earners' },
  { id: 'All', label: 'Universal Support' }
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Delhi'
];

const NGOOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    org_name: '',
    reg_number: '',
    focus_sectors: [],
    coverage_areas: [],
    beneficiary_types: [],
    contact_name: '',
    contact_designation: ''
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      nextStep();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submitData = {
        organization_name: formData.org_name,
        registration_number: formData.reg_number,
        primary_focus_sectors: formData.focus_sectors,
        operating_states: formData.coverage_areas,
        beneficiary_demographic: formData.beneficiary_types,
        contact_person_name: formData.contact_name,
        official_designation: formData.contact_designation
      };

      await onboardingService.submitNgoOnboarding(submitData);
      
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }

      navigate('/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(Array.isArray(detail) ? detail[0].msg : (detail || 'Failed to complete onboarding. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 mb-6 transform rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Organization Profile</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Tell us about your impactful work</p>
            </div>

            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Organization Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="org_name"
                    required
                    value={formData.org_name}
                    onChange={handleInputChange}
                    placeholder="e.g. Hope Social Foundation"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Registration Number (Optional)</label>
                <div className="relative">
                  <input
                    type="text"
                    name="reg_number"
                    value={formData.reg_number}
                    onChange={handleInputChange}
                    placeholder="e.g. NGO/2024/HR/001"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 mb-6 transform -rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Focus Areas</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Select sectors where your NGO operates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SECTORS.map(sector => (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => toggleItem('focus_sectors', sector.id)}
                  className={`flex flex-col items-start p-6 rounded-[2rem] border-2 transition-all group relative overflow-hidden ${
                    formData.focus_sectors.includes(sector.id)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xl shadow-emerald-100'
                      : 'border-slate-100 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className={`p-3 rounded-2xl mb-4 transition-colors ${
                    formData.focus_sectors.includes(sector.id) ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={sector.icon} />
                    </svg>
                  </div>
                  <span className="font-bold text-lg">{sector.label}</span>
                  {formData.focus_sectors.includes(sector.id) && (
                    <div className="absolute top-4 right-4 text-emerald-500">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 mb-6 transform rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Reach & Impact</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Define your geographical and human reach</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Operating Regions (States)</label>
                <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-4 bg-slate-50/50 rounded-[2rem] border-2 border-slate-100 scrollbar-hide">
                  {STATES.map(state => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => toggleItem('coverage_areas', state)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        formData.coverage_areas.includes(state)
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Key Beneficiaries</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {BENEFICIARIES.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => toggleItem('beneficiary_types', type.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                        formData.beneficiary_types.includes(type.id)
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-emerald-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 mb-6 transform -rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Point of Contact</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Who represents this organization?</p>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="contact_name"
                  required
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Priya Singh"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Official Designation</label>
                <input
                  type="text"
                  name="contact_designation"
                  required
                  value={formData.contact_designation}
                  onChange={handleInputChange}
                  placeholder="e.g. Managing Director"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Modern Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Milestone {currentStep} of 4</span>
              <h3 className="text-xl font-bold text-slate-900">
                {currentStep === 1 && 'Basic Identity'}
                {currentStep === 2 && 'Domain Focus'}
                {currentStep === 3 && 'Service Area'}
                {currentStep === 4 && 'Verification'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-300 italic">{Math.round((currentStep / 4) * 100)}%</span>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-2xl overflow-hidden p-1">
            <div 
              className="h-full bg-emerald-500 rounded-xl transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Premium Main Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 md:p-16 border border-slate-50 relative overflow-hidden">
          {/* Subtle Accent Gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10">
            {renderStep()}

            {error && (
              <div className="mt-8 p-5 bg-rose-50 border-2 border-rose-100 text-rose-700 rounded-[2rem] text-sm flex items-start gap-4 animate-shake">
                <div className="p-2 bg-rose-100 rounded-xl">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="pt-1.5">
                  <span className="font-bold block mb-0.5">Submission Error</span>
                  <p className="opacity-90">{error}</p>
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="flex-1 px-8 py-5 border-2 border-slate-100 text-slate-500 rounded-3xl font-black hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-xs"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] px-8 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs group"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Synchronizing...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 4 ? 'Activate NGO Account' : 'Move Forward'}</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-4 text-slate-300">
            <div className="h-px w-12 bg-current opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Partner in Social Progress</span>
            <div className="h-px w-12 bg-current opacity-20" />
          </div>
          <p className="text-slate-400 text-xs font-medium max-w-sm mx-auto leading-relaxed">
            Your organization's data is protected by industry-standard encryption and used solely for skilling initiatives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NGOOnboarding;

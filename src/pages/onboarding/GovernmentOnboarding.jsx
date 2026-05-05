import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingService } from '@/services/onboardingService';
import { useAuthStore } from '@/store/authStore';

const DEPARTMENTS = [
  { id: 'Labour', label: 'Ministry of Labour', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'Skill Development', label: 'Skill Development', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { id: 'Education', label: 'Education Dept', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'Other', label: 'Other Ministry', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' }
];

const ACCESS_LEVELS = [
  { id: 'District', label: 'District' },
  { id: 'State', label: 'State' },
  { id: 'National', label: 'National' }
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Delhi'
];

const DISTRICTS = [
  'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi',
  'Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane',
  'Bangalore Urban', 'Bangalore Rural', 'Mysore', 'Dharwad',
  'Chennai', 'Coimbatore', 'Madurai', 'Salem',
  'Hyderabad', 'Rangareddy', 'Warangal',
  'Lucknow', 'Kanpur', 'Agra', 'Varanasi'
];

const GovernmentOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    designation: '',
    department: 'Labour',
    state_jurisdiction: '',
    district_jurisdiction: [],
    access_level: 'State'
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleDistrict = (district) => {
    setFormData(prev => ({
      ...prev,
      district_jurisdiction: prev.district_jurisdiction.includes(district)
        ? prev.district_jurisdiction.filter(d => d !== district)
        : [...prev.district_jurisdiction, district]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      nextStep();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submitData = {
        full_name: formData.full_name,
        designation: formData.designation,
        department: formData.department,
        state_jurisdiction: formData.state_jurisdiction,
        access_level: formData.access_level,
        district_jurisdiction: formData.district_jurisdiction
      };

      await onboardingService.submitGovtOnboarding(submitData);
      
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-900 mb-6 border-2 border-blue-100 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Official Credentials</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Verify your administrative identity</p>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name (with Prefix)</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Shri Rajesh Varma"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Official Designation</label>
                <input
                  type="text"
                  name="designation"
                  required
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g. District Magistrate"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-900 mb-6 border-2 border-blue-100 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Department & State</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Select your primary jurisdiction</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1 text-center uppercase tracking-widest">Governing Department</label>
                <div className="grid grid-cols-2 gap-4">
                  {DEPARTMENTS.map(dept => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, department: dept.id }))}
                      className={`flex flex-col items-center gap-3 p-5 rounded-[2rem] border-2 transition-all ${
                        formData.department === dept.id
                          ? 'border-blue-900 bg-blue-50 text-blue-900 shadow-lg shadow-blue-100'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200'
                      }`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={dept.icon} />
                      </svg>
                      <span className="font-bold text-xs text-center">{dept.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1 text-center uppercase tracking-widest">State Jurisdiction</label>
                <div className="relative">
                  <select
                    name="state_jurisdiction"
                    required
                    value={formData.state_jurisdiction}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-white focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer text-center"
                  >
                    <option value="">Select State</option>
                    {STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-900 mb-6 border-2 border-blue-100 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 1.637 9.338 4.398 12.93a11.948 11.948 0 0012.44 0c2.76-3.592 4.398-8.1 4.398-12.93z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Access Level</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Define your administrative reach</p>
            </div>

            <div className="space-y-8">
              <div className="p-2 bg-slate-100 rounded-[2rem] flex gap-2">
                {ACCESS_LEVELS.map(level => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, access_level: level.id }))}
                    className={`flex-1 py-4 rounded-[1.5rem] text-sm font-black transition-all ${
                      formData.access_level === level.id
                        ? 'bg-white text-blue-900 shadow-xl'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4 ml-1">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">District Jurisdiction</label>
                  <span className="text-xs font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-full">{formData.district_jurisdiction.length} Selected</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-4 bg-slate-50/50 rounded-[2.5rem] border-2 border-slate-100 scrollbar-hide">
                  {DISTRICTS.map(district => (
                    <button
                      key={district}
                      type="button"
                      onClick={() => toggleDistrict(district)}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all border-2 text-left flex items-center justify-between ${
                        formData.district_jurisdiction.includes(district)
                          ? 'bg-blue-900 text-white border-blue-900 shadow-lg shadow-blue-100'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200'
                      }`}
                    >
                      <span>{district}</span>
                      {formData.district_jurisdiction.includes(district) && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div data-theme="light" className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* State Grade Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-4">
              <div 
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all duration-500 ${
                  currentStep >= step 
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-100 rotate-12' 
                    : 'bg-white text-slate-300 border-2 border-slate-100'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`h-1 w-8 rounded-full transition-all duration-700 ${
                  currentStep > step ? 'bg-blue-900' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Official Main Card */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] p-12 md:p-16 border border-white relative overflow-hidden">
          {/* Subtle Royal Patterns */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-50/50 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10">
            {renderStep()}

            {error && (
              <div className="mt-10 p-6 bg-red-50 border-2 border-red-100 text-red-900 rounded-[2rem] text-sm flex items-start gap-4 animate-shake">
                <div className="p-2 bg-red-100 rounded-xl">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="pt-1.5 font-bold">
                  {error}
                </div>
              </div>
            )}

            <div className="mt-12 flex gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="flex-1 px-8 py-5 border-2 border-slate-100 text-slate-500 rounded-3xl font-black hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em] text-[10px]"
                >
                  Return
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] px-8 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-black hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px] group"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>{currentStep === 3 ? 'Finalize Onboarding' : 'Next Protocol'}</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Formal Footer */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-8 opacity-30 grayscale pointer-events-none">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GOI" className="h-12" />
            <div className="h-10 w-px bg-slate-400" />
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight">
                Digital Skill Infrastructure<br />National Portal
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] text-center max-w-xs leading-relaxed">
            Authorized Personnel Only. All activities are monitored for security compliance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernmentOnboarding;

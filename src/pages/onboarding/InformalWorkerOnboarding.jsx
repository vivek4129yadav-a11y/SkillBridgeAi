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

const WORK_TYPES = [
  { id: 'Street Vendor', label: 'Street Vendor', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'Domestic Worker', label: 'Domestic Help', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'Daily Wage Labor', label: 'Daily Wage', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'Home-based Work', label: 'Home-based', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'Agricultural Work', label: 'Agriculture', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
  { id: 'Other', label: 'Others', icon: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' }
];

const INCOME_RANGES = ['Below 5k', '5k-10k', '10k-20k', 'Above 20k'];

const LITERACY_LEVELS = [
  { val: 'None', label: 'Need Assistance', subtext: 'I need help with apps' },
  { val: 'Basic', label: 'Basic Use', subtext: 'I use basic phone features' },
  { val: 'Apps', label: 'App Savvy', subtext: 'I use WhatsApp and apps' },
  { val: 'Comfortable', label: 'Comfortable', subtext: 'I use internet regularly' }
];

const GOALS = ['Increase Income', 'Learn New Skills', 'Start Business', 'Formal Job'];
const LANGUAGES = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Punjabi', 'Malayalam'];

const InformalWorkerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: 'Male',
    state: '',
    city_village: '',
    work_type: 'Street Vendor',
    monthly_income: '5k-10k',
    digital_literacy: 'Basic',
    owns_smartphone: true,
    languages: [],
    goals: []
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 5) {
      nextStep();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onboardingService.submitInformalWorkerOnboarding(formData);
      
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.');
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 mb-6 transform rotate-3">
                <span className="text-4xl">👋</span>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Namaste!</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Let's start with your basics</p>
            </div>

            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Suraj Kumar"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-medium text-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="35"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none text-slate-800 font-medium text-lg"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer text-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 mb-6 transform -rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Location</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Where do you live?</p>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">State</label>
                <select
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-amber-500 transition-all outline-none text-slate-800 font-bold text-lg"
                >
                  <option value="">Select State</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">City or Village</label>
                <input
                  type="text"
                  name="city_village"
                  required
                  value={formData.city_village}
                  onChange={handleInputChange}
                  placeholder="e.g. Rampur"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-amber-500 transition-all outline-none text-slate-800 font-medium text-lg"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 mb-6 transform rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Work</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Tell us about your daily work</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Type of Work</label>
                <div className="grid grid-cols-2 gap-3">
                  {WORK_TYPES.map(work => (
                    <button
                      key={work.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, work_type: work.id }))}
                      className={`flex flex-col items-center justify-center p-5 rounded-[2.5rem] border-2 transition-all ${
                        formData.work_type === work.id
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-lg shadow-amber-100 scale-105'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-amber-200'
                      }`}
                    >
                      <div className={`p-3 rounded-2xl mb-2 ${formData.work_type === work.id ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={work.icon} />
                        </svg>
                      </div>
                      <span className="font-bold text-xs uppercase tracking-wider text-center">{work.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Monthly Income Range</label>
                <div className="grid grid-cols-2 gap-3">
                  {INCOME_RANGES.map(range => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, monthly_income: range }))}
                      className={`py-4 rounded-2xl border-2 transition-all font-bold ${
                        formData.monthly_income === range
                          ? 'border-amber-600 bg-amber-50 text-amber-900'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-amber-200'
                      }`}
                    >
                      {range}
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 mb-6 transform -rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Digital Skills</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Are you comfortable using apps?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                {LITERACY_LEVELS.map(level => (
                  <button
                    key={level.val}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, digital_literacy: level.val }))}
                    className={`w-full flex items-center p-5 rounded-[1.5rem] border-2 transition-all text-left ${
                      formData.digital_literacy === level.val
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md'
                        : 'border-slate-100 bg-white text-slate-600 hover:border-amber-200'
                    }`}
                  >
                    <div className={`p-3 rounded-xl mr-4 ${formData.digital_literacy === level.val ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{level.label}</h4>
                      <p className="text-sm opacity-70 font-medium">{level.subtext}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-6 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Owns Smartphone</h4>
                    <p className="text-xs text-slate-500 font-medium">Required for skill updates</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, owns_smartphone: !prev.owns_smartphone }))}
                  className={`w-16 h-9 rounded-full transition-all relative ${
                    formData.owns_smartphone ? 'bg-amber-600' : 'bg-slate-300'
                  }`}
                >
                  <div className={`absolute top-1 w-7 h-7 bg-white rounded-full transition-all shadow-sm ${
                    formData.owns_smartphone ? 'left-8' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Goals</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">What is your target?</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Languages (Select multiple)</label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 bg-slate-50/50 rounded-[2rem] border-2 border-slate-100 scrollbar-hide">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleArrayItem('languages', lang)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        formData.languages.includes(lang)
                          ? 'bg-amber-600 text-white shadow-lg shadow-amber-200'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-amber-300 hover:text-amber-600'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">My Main Goals</label>
                <div className="grid grid-cols-2 gap-3">
                  {GOALS.map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleArrayItem('goals', goal)}
                      className={`p-4 rounded-2xl border-2 transition-all font-bold text-xs text-center leading-tight ${
                        formData.goals.includes(goal)
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-amber-200'
                      }`}
                    >
                      {goal}
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
    <div data-theme="light" className="min-h-screen bg-[#FDFDFD] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <span className="text-xs font-black text-amber-600 uppercase tracking-[0.2em]">Step {currentStep} of 5</span>
              <h3 className="text-xl font-bold text-slate-900">
                {currentStep === 1 && 'Personal Info'}
                {currentStep === 2 && 'Your Residence'}
                {currentStep === 3 && 'Current Work'}
                {currentStep === 4 && 'Digital Access'}
                {currentStep === 5 && 'Your Ambitions'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-300 italic">{Math.round((currentStep / 5) * 100)}%</span>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-2xl overflow-hidden p-1">
            <div 
              className="h-full bg-amber-600 rounded-xl transition-all duration-700 ease-out shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 md:p-16 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

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
                  <span className="font-bold block mb-0.5">Error</span>
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
                className="flex-[2] px-8 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-amber-600 hover:shadow-2xl hover:shadow-amber-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs group"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 5 ? 'Register Me' : 'Continue'}</span>
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">SkillBridge AI — Supporting Every Worker</span>
            <div className="h-px w-12 bg-current opacity-20" />
          </div>
          <p className="text-slate-400 text-xs font-medium max-w-sm mx-auto leading-relaxed">
            Every step you take here brings you closer to better earning and learning opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformalWorkerOnboarding;

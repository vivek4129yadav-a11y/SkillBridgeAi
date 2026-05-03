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

const TRADES = [
  { id: 'Electrician', label: 'Electrician', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-amber-500' },
  { id: 'Plumber', label: 'Plumber', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-4.827-.63l-1.04-1.04a4 4 0 01-.63-4.826l.337-.674a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-1.022-1.547l-.318-.158a2 2 0 00-2.827 1.022l-.158.318a2 2 0 001.022 2.827l.318.158a2 2 0 002.827-1.022l.158-.318a2 2 0 00-1.022-2.827l-.318-.158', color: 'bg-blue-500' },
  { id: 'Carpenter', label: 'Carpenter', icon: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.07 7.07l-3.77 3.77a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 017.07-7.07l-3.77-3.77z', color: 'bg-orange-600' },
  { id: 'Welder', label: 'Welder', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-slate-700' },
  { id: 'Mason', label: 'Mason', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'bg-red-600' },
  { id: 'Painter', label: 'Painter', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', color: 'bg-rose-500' },
  { id: 'Mechanic', label: 'Mechanic', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', color: 'bg-slate-600' },
  { id: 'Other', label: 'Other', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4', color: 'bg-slate-400' }
];

const EXP_YEARS = ['0-1', '1-3', '3-5', '5+'];
const EMPLOYMENT_STATUS = ['Yes', 'No', 'Seasonal'];
const RADII = ['Local', 'District', 'State', 'Anywhere'];
const LANGUAGES = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Punjabi', 'Malayalam'];

const BlueCollarOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: 'Male',
    state: '',
    city: '',
    village_district: '',
    primary_trade: 'Electrician',
    secondary_skills: [],
    years_experience: '1-3',
    currently_employed: 'No',
    work_radius: 'Local',
    languages: [],
    owns_smartphone: true
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
      await onboardingService.submitBlueCollarOnboarding(formData);
      
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit onboarding. Please try again.');
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-50 text-orange-600 mb-6 transform rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Identity</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Tell us who you are</p>
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
                  placeholder="e.g. Mohan Das"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-medium"
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
                    placeholder="28"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-800 font-medium"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer"
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-50 text-orange-600 mb-6 transform -rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Location</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Where do you usually work?</p>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">State</label>
                <select
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-orange-500 transition-all outline-none text-slate-800 font-bold"
                >
                  <option value="">Select State</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Pune"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-orange-500 transition-all outline-none text-slate-800 font-medium"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">District / Village</label>
                  <input
                    type="text"
                    name="village_district"
                    value={formData.village_district}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-orange-500 transition-all outline-none text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-50 text-orange-600 mb-6 transform rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Trade</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">What is your area of expertise?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Primary Trade</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TRADES.map(trade => (
                    <button
                      key={trade.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, primary_trade: trade.id }))}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        formData.primary_trade === trade.id
                          ? 'border-orange-600 bg-orange-50 text-orange-900 shadow-lg shadow-orange-100 scale-105'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-orange-200'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mb-2 ${formData.primary_trade === trade.id ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={trade.icon} />
                        </svg>
                      </div>
                      <span className="font-bold text-[10px] uppercase tracking-wider">{trade.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Secondary Skills (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {TRADES.filter(t => t.id !== formData.primary_trade).map(trade => (
                    <button
                      key={trade.id}
                      type="button"
                      onClick={() => toggleArrayItem('secondary_skills', trade.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        formData.secondary_skills.includes(trade.id)
                          ? 'bg-slate-900 text-white shadow-lg'
                          : 'bg-white text-slate-500 border-2 border-slate-100 hover:border-orange-300'
                      }`}
                    >
                      {trade.label}
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-50 text-orange-600 mb-6 transform -rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Experience</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Your professional journey</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1 text-center uppercase tracking-widest">Years of Experience</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {EXP_YEARS.map(years => (
                    <button
                      key={years}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, years_experience: years }))}
                      className={`py-4 rounded-2xl border-2 transition-all font-black text-lg ${
                        formData.years_experience === years
                          ? 'border-orange-600 bg-orange-50 text-orange-900 shadow-md'
                          : 'border-slate-100 bg-white text-slate-400 hover:border-orange-200'
                      }`}
                    >
                      {years}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1 text-center uppercase tracking-widest">Currently Working?</label>
                <div className="flex p-1.5 bg-slate-100 rounded-[2rem]">
                  {EMPLOYMENT_STATUS.map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, currently_employed: status }))}
                      className={`flex-1 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-wider transition-all ${
                        formData.currently_employed === status
                          ? 'bg-white text-orange-700 shadow-lg'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-50 text-orange-600 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48V22M12 21.48c1.11 0 2.193-.203 3.2-.582m-3.2.582a11.955 11.955 0 01-3.2-.582m3.2.582V22m0-21.48c1.11 0 2.193.203 3.2.582m-3.2-.582a11.955 11.955 0 01-3.2.582M3.382 7.04C3.13 8.583 3 10.267 3 12c0 4.592 2.572 8.582 6.382 10.618M20.618 7.04c.252 1.543.382 3.227.382 5 0 4.592-2.572 8.582-6.382 10.618" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Preferences</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Finalizing your profile</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Preferred Work Radius</label>
                <div className="grid grid-cols-2 gap-3">
                  {RADII.map(radius => (
                    <button
                      key={radius}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, work_radius: radius }))}
                      className={`p-4 rounded-2xl border-2 transition-all font-bold ${
                        formData.work_radius === radius
                          ? 'border-orange-600 bg-orange-50 text-orange-900 shadow-md'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-orange-200'
                      }`}
                    >
                      {radius}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-orange-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Owns Smartphone</h4>
                    <p className="text-xs text-slate-500 font-medium">Essential for app updates</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, owns_smartphone: !prev.owns_smartphone }))}
                  className={`w-16 h-9 rounded-full transition-all relative ${
                    formData.owns_smartphone ? 'bg-orange-600' : 'bg-slate-300'
                  }`}
                >
                  <div className={`absolute top-1 w-7 h-7 bg-white rounded-full transition-all shadow-sm ${
                    formData.owns_smartphone ? 'left-8' : 'left-1'
                  }`} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Languages (Select multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.slice(0, 8).map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleArrayItem('languages', lang)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        formData.languages.includes(lang)
                          ? 'bg-orange-600 text-white shadow-lg'
                          : 'bg-white text-slate-500 border-2 border-slate-100 hover:border-orange-200'
                      }`}
                    >
                      {lang}
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
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <span className="text-xs font-black text-orange-600 uppercase tracking-[0.2em]">Step {currentStep} of 5</span>
              <h3 className="text-xl font-bold text-slate-900">
                {currentStep === 1 && 'Personal Info'}
                {currentStep === 2 && 'Work Location'}
                {currentStep === 3 && 'Core Trade'}
                {currentStep === 4 && 'Experience'}
                {currentStep === 5 && 'Final Details'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-300 italic">{Math.round((currentStep / 5) * 100)}%</span>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-2xl overflow-hidden p-1">
            <div 
              className="h-full bg-orange-600 rounded-xl transition-all duration-700 ease-out shadow-[0_0_15px_rgba(234,88,12,0.4)]"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 md:p-16 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

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
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] px-8 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs group"
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
                    <span>{currentStep === 5 ? 'Get Started' : 'Continue'}</span>
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">SkillBridge AI — Empowering Work</span>
            <div className="h-px w-12 bg-current opacity-20" />
          </div>
          <p className="text-slate-400 text-xs font-medium max-w-sm mx-auto leading-relaxed">
            Your skills are your strength. We help you connect with the best employers in your trade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlueCollarOnboarding;

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

const EDUCATION_LEVELS = [
  { id: '10th', label: '10th Standard', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: '12th', label: '12th Standard', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
  { id: 'Graduate', label: 'College Graduate', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l9 5-9 5-9-5 9-5z' },
  { id: 'Postgraduate', label: 'Master / PhD', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'Dropout', label: 'Other / Dropout', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

const STREAMS = [
  { id: 'Science', label: 'Science & Tech' },
  { id: 'Commerce', label: 'Commerce & Finance' },
  { id: 'Arts', label: 'Arts & Humanities' },
  { id: 'Vocational', label: 'Vocational Training' },
  { id: 'Other', label: 'Others' }
];

const INTERESTS = [
  'Software Development', 'Data Science', 'AI/ML', 'Digital Marketing', 'Graphic Design', 
  'Healthcare', 'Finance', 'Teaching', 'Sales', 'UI/UX Design', 'Management', 'Legal'
];

const LANGUAGES = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Punjabi', 'Malayalam'];

const StudentOnboarding = () => {
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
    education_level: '12th',
    stream: 'Science',
    college_name: '',
    career_interests: [],
    preferred_location: 'Anywhere',
    languages: []
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
      await onboardingService.submitStudentOnboarding(formData);
      
      const { user } = useAuthStore.getState();
      if (user) {
        useAuthStore.setState({ user: { ...user, onboarding_done: true } });
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to complete onboarding. Please try again.');
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 mb-6 transform rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Identity</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Let's start with your profile basics</p>
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
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-medium"
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
                    placeholder="20"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-800 font-medium"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer"
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 mb-6 transform -rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l9 5-9 5-9-5 9-5z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Education</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Your current academic status</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">State</label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-indigo-500 transition-all outline-none text-slate-800 font-bold"
                  >
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Pune"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-indigo-500 transition-all outline-none text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Highest Qualification</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EDUCATION_LEVELS.map(level => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, education_level: level.id }))}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                        formData.education_level === level.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-lg shadow-indigo-100'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${formData.education_level === level.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={level.icon} />
                        </svg>
                      </div>
                      <span className="font-bold text-sm">{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 mb-6 transform rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Specialization</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Your stream and institution</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Study Stream</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STREAMS.map(stream => (
                    <button
                      key={stream.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, stream: stream.id }))}
                      className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                        formData.stream === stream.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'
                      }`}
                    >
                      {stream.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">College / School Name</label>
                <input
                  type="text"
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleInputChange}
                  placeholder="e.g. St. Xavier's College"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/30 focus:bg-white focus:border-indigo-500 transition-all outline-none text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 mb-6 transform -rotate-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Ambitions</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">What drives you forward?</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Career Interests (Select multiple)</label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 bg-slate-50/50 rounded-[2rem] border-2 border-slate-100 scrollbar-hide">
                  {INTERESTS.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleArrayItem('career_interests', interest)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        formData.career_interests.includes(interest)
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Preferred Work Region</label>
                <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                  {['Same City', 'State', 'Anywhere'].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, preferred_location: loc }))}
                      className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        formData.preferred_location === loc
                          ? 'bg-white text-indigo-700 shadow-md'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {loc}
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Languages</h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">Communication skills</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleArrayItem('languages', lang)}
                  className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                    formData.languages.includes(lang)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md shadow-indigo-100'
                      : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
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
              <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Step {currentStep} of 5</span>
              <h3 className="text-xl font-bold text-slate-900">
                {currentStep === 1 && 'Personal Info'}
                {currentStep === 2 && 'Academic Level'}
                {currentStep === 3 && 'Current Studies'}
                {currentStep === 4 && 'Career Path'}
                {currentStep === 5 && 'Communication'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-300 italic">{Math.round((currentStep / 5) * 100)}%</span>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-2xl overflow-hidden p-1">
            <div 
              className="h-full bg-indigo-600 rounded-xl transition-all duration-700 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 md:p-16 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

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
                className="flex-[2] px-8 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs group"
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
                    <span>{currentStep === 5 ? 'Launch My Career' : 'Continue'}</span>
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">SkillBridge AI — Future Ready</span>
            <div className="h-px w-12 bg-current opacity-20" />
          </div>
          <p className="text-slate-400 text-xs font-medium max-w-sm mx-auto leading-relaxed">
            Your data helps our AI recommend the best career paths and skilling opportunities tailored specifically for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboarding;

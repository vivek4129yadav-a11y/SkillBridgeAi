import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar, FiMapPin, FiBookOpen, FiCamera, FiFileText, FiCheckCircle, FiAlertCircle, FiStar } from 'react-icons/fi';

const AI_SKILL_SUGGESTIONS = {
    javascript: ['React', 'Node.js', 'TypeScript', 'Frontend Development'],
    python: ['Data Analysis', 'Machine Learning', 'Django', 'TensorFlow'],
    react: ['Next.js', 'Redux', 'Tailwind CSS', 'UI/UX Design'],
    java: ['Spring Boot', 'Backend Development', 'Microservices', 'SQL'],
    design: ['Figma', 'UI/UX', 'Adobe XD', 'Prototyping'],
    data: ['SQL', 'Python', 'Tableau', 'Statistics'],
    marketing: ['SEO', 'Content Strategy', 'Social Media', 'Google Analytics'],
    business: ['Project Management', 'Agile', 'Leadership', 'Strategy']
};

const ProfileCreation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dob: '',
        gender: '',
        city: '',
        education: '',
        profilePic: null,
        resume: null,
    });

    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [suggestedSkills, setSuggestedSkills] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Basic Phone Regex (10 to 15 digits)
    const phoneRegex = /^\+?[\d\s-]{10,15}$/;

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
            // Clear error when user types
            if (errors[name]) {
                setErrors({ ...errors, [name]: null });
            }
        }

        // Real-time validation
        if (name === 'email') {
            if (!emailRegex.test(value) && value.length > 0) {
                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
            } else {
                setErrors(prev => ({ ...prev, email: null }));
            }
        }

        if (name === 'phone') {
            if (!phoneRegex.test(value) && value.length > 0) {
                setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number.' }));
            } else {
                setErrors(prev => ({ ...prev, phone: null }));
            }
        }

        if (name === 'confirmPassword' || name === 'password') {
            if (name === 'confirmPassword' && value !== formData.password && value.length > 0) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
            } else if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: null }));
            }
        }
    };

    const handleSkillAdd = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();
            const newSkill = currentSkill.trim();
            if (newSkill && !skills.includes(newSkill)) {
                setSkills([...skills, newSkill]);
                setCurrentSkill('');
                updateSuggestions([...skills, newSkill]);
            }
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        const newSkills = skills.filter(skill => skill !== skillToRemove);
        setSkills(newSkills);
        updateSuggestions(newSkills);
    };

    const addSuggestedSkill = (skill) => {
        if (!skills.includes(skill)) {
            setSkills([...skills, skill]);
            updateSuggestions([...skills, skill]);
            setSuggestedSkills(suggestedSkills.filter(s => s !== skill));
        }
    };

    const updateSuggestions = (currentSkills) => {
        let newSuggestions = new Set();
        currentSkills.forEach(skill => {
            const lowerSkill = skill.toLowerCase();
            // Find matching categories in our mock AI database
            Object.keys(AI_SKILL_SUGGESTIONS).forEach(key => {
                if (lowerSkill.includes(key) || key.includes(lowerSkill)) {
                    AI_SKILL_SUGGESTIONS[key].forEach(s => {
                        if (!currentSkills.includes(s)) newSuggestions.add(s);
                    });
                }
            });
        });
        setSuggestedSkills(Array.from(newSuggestions).slice(0, 5)); // Show max 5 suggestions
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Valid Email is required.';
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) newErrors.phone = 'Valid Phone is required.';
        if (!formData.password) newErrors.password = 'Password is required.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            // Simulate API call and AI Processing
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);

                // Redirect after success animation
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }, 2500);
        } else {
            // Scroll to the top of the form if there are errors (simplistic approach)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const inputClasses = "w-full bg-[#0f172a]/50 border border-slate-700 rounded-xl px-4 py-3 pl-11 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 placeholder-slate-500";
    const labelClasses = "block text-sm font-medium text-slate-300 mb-1.5";
    const iconClasses = "absolute left-3.5 top-3.5 text-slate-400";

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#0f172a]/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-10 max-w-md w-full text-center shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <FiCheckCircle className="text-emerald-400 text-5xl" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Profile Created!</h2>
                    <p className="text-slate-400 mb-6">Your AI career matrix has been initialized. Redirecting to dashboard...</p>

                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8 }}
                            className="bg-cyan-400 h-full"
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-[#030014] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-white">

            {/* Background AI Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-purple-600/10 blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:30px_30px]" />

                {/* Floating particles */}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-cyan-400/30 rounded-full"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl z-10"
            >
                <div className="text-center mb-8 space-y-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4"
                    >
                        <FiStar className="animate-pulse" />
                        <span>Complete your profile to get better AI career recommendations.</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-200">
                        Initialize Your Profile
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                        Provide your details so our AI can accurately map your skills to the perfect career trajectory.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#0f172a]/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 md:p-10 relative overflow-hidden">

                    {/* Decorative glowing top border */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <div className="col-span-1 md:col-span-2">
                            <label className={labelClasses}>Full Name *</label>
                            <div className="relative">
                                <FiUser className={iconClasses} />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Vivek Yadav"
                                    className={`${inputClasses} ${errors.fullName ? 'border-rose-500/50 focus:ring-rose-500/50 focus:border-rose-500' : ''}`}
                                />
                            </div>
                            {errors.fullName && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle /> {errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelClasses}>Email Address *</label>
                            <div className="relative">
                                <FiMail className={iconClasses} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@gmail.com"
                                    className={`${inputClasses} ${errors.email ? 'border-rose-500/50 focus:ring-rose-500/50 focus:border-rose-500' : ''}`}
                                />
                            </div>
                            {errors.email && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle /> {errors.email}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className={labelClasses}>Phone Number *</label>
                            <div className="relative">
                                <FiPhone className={iconClasses} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 1500000056"
                                    className={`${inputClasses} ${errors.phone ? 'border-rose-500/50 focus:ring-rose-500/50 focus:border-rose-500' : ''}`}
                                />
                            </div>
                            {errors.phone && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle /> {errors.phone}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelClasses}>Password *</label>
                            <div className="relative">
                                <FiLock className={iconClasses} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`${inputClasses} ${errors.password ? 'border-rose-500/50 focus:ring-rose-500/50 focus:border-rose-500' : ''}`}
                                />
                            </div>
                            {errors.password && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle /> {errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className={labelClasses}>Confirm Password *</label>
                            <div className="relative">
                                <FiLock className={iconClasses} />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`${inputClasses} ${errors.confirmPassword ? 'border-rose-500/50 focus:ring-rose-500/50 focus:border-rose-500' : ''}`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle /> {errors.confirmPassword}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className={labelClasses}>Date of Birth</label>
                            <div className="relative">
                                <FiCalendar className={iconClasses} />
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`${inputClasses} [color-scheme:dark]`}
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className={labelClasses}>Gender</label>
                            <div className="relative">
                                <FiUser className={iconClasses} />
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`${inputClasses} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled className="bg-slate-800 text-slate-400">Select Gender</option>
                                    <option value="Male" className="bg-slate-800">Male</option>
                                    <option value="Female" className="bg-slate-800">Female</option>
                                    <option value="Other" className="bg-slate-800">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* City */}
                        <div>
                            <label className={labelClasses}>Location / City</label>
                            <div className="relative">
                                <FiMapPin className={iconClasses} />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Utter Pradesh, India"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Education Level */}
                        <div>
                            <label className={labelClasses}>Education Level</label>
                            <div className="relative">
                                <FiBookOpen className={iconClasses} />
                                <select
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className={`${inputClasses} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled className="bg-slate-800 text-slate-400">Select Education</option>
                                    <option value="High School" className="bg-slate-800">High School</option>
                                    <option value="Diploma" className="bg-slate-800">Diploma</option>
                                    <option value="Graduate" className="bg-slate-800">Graduate</option>
                                    <option value="Postgraduate" className="bg-slate-800">Postgraduate</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-slate-700/50 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Skills Section */}
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <label className={labelClasses}>Current Skills</label>

                            <div className="bg-[#0f172a]/50 border border-slate-700 rounded-xl p-3 focus-within:ring-2 focus-within:ring-cyan-500/50 focus-within:border-cyan-500 transition-all duration-300">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <AnimatePresence>
                                        {skills.map(skill => (
                                            <motion.span
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                key={skill}
                                                className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-1.5 group cursor-pointer"
                                                onClick={() => handleSkillRemove(skill)}
                                            >
                                                {skill}
                                                <span className="text-cyan-400 group-hover:text-rose-400 transition-colors">&times;</span>
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                <input
                                    type="text"
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                    onKeyDown={handleSkillAdd}
                                    placeholder="Type a skill and press Enter..."
                                    className="w-full bg-transparent border-none focus:outline-none text-slate-300 placeholder-slate-500 px-1"
                                />
                            </div>

                            {/* AI Suggestions */}
                            {suggestedSkills.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3"
                                >
                                    <p className="text-xs text-purple-400 font-medium mb-2 flex items-center gap-1.5">
                                        <FiStar className="animate-spin-slow" /> AI Suggested Skills
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedSkills.map(skill => (
                                            <button
                                                type="button"
                                                key={skill}
                                                onClick={() => addSuggestedSkill(skill)}
                                                className="text-xs px-2.5 py-1 rounded-md bg-[#1e293b] hover:bg-purple-500/20 hover:text-purple-300 text-slate-400 border border-slate-700 hover:border-purple-500/50 transition-colors"
                                            >
                                                + {skill}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Profile Picture Upload */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Profile Picture</label>
                            <div className="relative group cursor-pointer">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-xl bg-[#0f172a]/30 hover:bg-[#0f172a]/70 hover:border-cyan-500/50 transition-all cursor-pointer overflow-hidden">
                                    {formData.profilePic ? (
                                        <div className="text-center">
                                            <p className="text-emerald-400 font-medium text-sm flex items-center justify-center gap-1"><FiCheckCircle /> Uploaded</p>
                                            <p className="text-xs text-slate-400 max-w-[150px] truncate">{formData.profilePic.name}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 group-hover:text-cyan-400 transition-colors">
                                            <FiCamera className="w-8 h-8 mb-2 opacity-50" />
                                            <p className="mb-1 text-sm font-medium">Click to upload image</p>
                                            <p className="text-xs opacity-70">PNG, JPG up to 5MB</p>
                                        </div>
                                    )}
                                    <input type="file" name="profilePic" className="hidden" accept="image/*" onChange={handleChange} />
                                </label>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Resume / CV <span className="text-slate-500 font-normal">(Optional)</span></label>
                            <div className="relative group cursor-pointer">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-xl bg-[#0f172a]/30 hover:bg-[#0f172a]/70 hover:border-purple-500/50 transition-all cursor-pointer overflow-hidden">
                                    {formData.resume ? (
                                        <div className="text-center">
                                            <p className="text-emerald-400 font-medium text-sm flex items-center justify-center gap-1"><FiCheckCircle /> Uploaded</p>
                                            <p className="text-xs text-slate-400 max-w-[150px] truncate">{formData.resume.name}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 group-hover:text-purple-400 transition-colors">
                                            <FiFileText className="w-8 h-8 mb-2 opacity-50" />
                                            <p className="mb-1 text-sm font-medium">Click to upload resume</p>
                                            <p className="text-xs opacity-70">PDF, DOCX up to 10MB</p>
                                        </div>
                                    )}
                                    <input type="file" name="resume" className="hidden" accept=".pdf,.doc,.docx" onChange={handleChange} />
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="mt-10">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <FiAlertCircle className="animate-spin" />
                                    Processing Profile...
                                </>
                            ) : (
                                <>
                                    Create Profile
                                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ProfileCreation;

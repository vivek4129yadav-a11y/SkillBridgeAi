import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FiMail, FiLock, FiCpu, FiUser, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const paths = [
    { id: 1, d: "M -100,100 L 200,100 L 300,200 L 300,500 L 500,700 L 1000,700", dur: 4, delay: 0 },
    { id: 2, d: "M 0,400 L 200,400 L 400,600 L 800,600 L 1000,800", dur: 5, delay: 1 },
    { id: 3, d: "M -50,700 L 150,700 L 250,600 L 450,600 L 600,450 L 1000,450", dur: 4.5, delay: 2 },
    { id: 4, d: "M 0,900 L 300,900 L 500,700 L 700,700 L 800,600 L 1000,600", dur: 6, delay: 0.5 },
];

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    // Random floating particles
    const particles = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        color: i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-500',
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, fullName);
            navigate('/');
        } catch (err) {
            setError('Failed to create an account. Email might already be in use.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError('Failed to sign up with Google.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050b14] flex items-center justify-center overflow-hidden font-sans">

            <style>{`
                @keyframes data-flow {
                    0% { stroke-dashoffset: 2000; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className={`absolute rounded-full ${p.color} opacity-30`}
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color === 'bg-cyan-400' ? '#06b6d4' : '#a855f7'}`
                        }}
                        animate={{ y: [0, -40, 0], x: [0, Math.random() * 30 - 15, 0], opacity: [0.1, 0.5, 0.1] }}
                        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                    />
                ))}
            </div>

            {/* Circuit Background Graphic - positioned left */}
            <div className="absolute left-0 top-0 w-full lg:w-[60%] h-full pointer-events-none z-0 opacity-40 sm:opacity-60 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-1/4 left-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />

                <svg viewBox="0 0 1000 1000" className="absolute top-0 left-0 w-full h-full text-white" preserveAspectRatio="none">
                    <defs>
                        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    {paths.map((p) => {
                        const isCyan = p.id % 2 === 0;
                        const color = isCyan ? "#06b6d4" : "#a855f7";
                        return (
                            <g key={p.id}>
                                <path d={p.d} stroke={color} strokeWidth="1" strokeOpacity="0.2" fill="none" />
                                <path d={p.d} stroke={color} strokeWidth="2.5" fill="none" strokeDasharray="100 2000" filter="url(#neon-glow)" style={{ animation: `data-flow ${p.dur}s linear infinite ${p.delay}s` }} />
                            </g>
                        );
                    })}
                </svg>

                <motion.div
                    className="hidden lg:flex absolute left-[20%] top-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 bg-black/50 backdrop-blur-md rounded-3xl items-center justify-center rotate-12 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                    animate={{ y: [-10, 10, -10], rotate: [12, 10, 12] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="absolute inset-0 border-2 border-dashed border-purple-500/20 rounded-3xl animate-[spin_20s_linear_infinite]" />
                    <FiCpu className="text-6xl text-purple-500/50 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                </motion.div>
            </div>

            {/* Main Content Layout */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 my-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Left Side: Marketing / AI Visuals */}
                    <div className="hidden lg:flex flex-col flex-1 text-left">
                        <Link to="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity w-max">
                            <FiCpu className="text-3xl text-cyan-400" />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Skill<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">BridgeAI</span>
                            </span>
                        </Link>

                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6"
                        >
                            Build your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-md">AI Identity</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-slate-400 max-w-md"
                        >
                            Join thousands of professionals accelerating their careers through artificial intelligence and personalized skill tracking.
                        </motion.p>
                    </div>

                    {/* Right Side: Glassmorphism Signup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md lg:w-[450px]"
                    >
                        {/* Mobile logo (hidden on desktop) */}
                        <Link to="/" className="flex lg:hidden items-center justify-center gap-2 mb-8">
                            <FiCpu className="text-3xl text-cyan-400" />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Skill<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">BridgeAI</span>
                            </span>
                        </Link>

                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                            {/* Card top border glow */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 block" />

                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
                            <p className="text-sm text-slate-400 mb-8">Sign up to get started with SkillBridgeAI.</p>

                            {error && (
                                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiUser className="text-slate-500 group-focus-within/input:text-cyan-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:bg-white/10 transition-all shadow-inner"
                                        placeholder="Full Name"
                                    />
                                </div>

                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiMail className="text-slate-500 group-focus-within/input:text-cyan-400 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:bg-white/10 transition-all shadow-inner"
                                        placeholder="Email Address"
                                    />
                                </div>

                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiLock className="text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 focus:bg-white/10 transition-all shadow-inner"
                                        placeholder="Password (min. 6 chars)"
                                    />
                                </div>

                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiLock className="text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 focus:bg-white/10 transition-all shadow-inner"
                                        placeholder="Confirm Password"
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3.5 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95 disabled:opacity-70 disabled:pointer-events-none mt-2 border border-white/10"
                                >
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                    {!loading && <FiArrowRight />}
                                </button>
                            </form>

                            <div className="mt-5 flex items-center gap-4">
                                <div className="flex-1 h-[1px] bg-white/10"></div>
                                <span className="text-xs text-slate-500 font-medium">OR</span>
                                <div className="flex-1 h-[1px] bg-white/10"></div>
                            </div>

                            <button
                                disabled={loading}
                                onClick={handleGoogleSignup}
                                className="mt-5 w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-70"
                            >
                                <FcGoogle className="text-xl" />
                                Continue with Google
                            </button>

                            <p className="mt-6 text-center text-sm text-slate-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

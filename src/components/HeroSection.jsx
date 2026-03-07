import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiCpu, FiArrowRight } from 'react-icons/fi';

const paths = [
    { id: 1, d: "M 200,200 L 500,200 L 800,500 L 800,800 L 950,950", dur: 3, delay: 0 },
    { id: 2, d: "M 100,500 L 400,500 L 600,700 L 900,700 L 950,850", dur: 4, delay: 1 },
    { id: 3, d: "M 1800,200 L 1500,200 L 1200,500 L 1200,800 L 1050,950", dur: 3.5, delay: 0.5 },
    { id: 4, d: "M 1900,500 L 1600,500 L 1400,700 L 1100,700 L 1050,850", dur: 4.5, delay: 2 },
    { id: 5, d: "M 200,1800 L 500,1800 L 800,1500 L 800,1200 L 950,1050", dur: 3, delay: 1.5 },
    { id: 6, d: "M 100,1500 L 400,1500 L 600,1300 L 900,1300 L 950,1150", dur: 4, delay: 0 },
    { id: 7, d: "M 1800,1800 L 1500,1800 L 1200,1500 L 1200,1200 L 1050,1050", dur: 3.5, delay: 2.5 },
    { id: 8, d: "M 1900,1500 L 1600,1500 L 1400,1300 L 1100,1300 L 1050,1150", dur: 5, delay: 1 },
    { id: 9, d: "M 1000,0 L 1000,400 L 900,500 L 900,800 L 980,920", dur: 4, delay: 3 },
    { id: 10, d: "M 1000,2000 L 1000,1600 L 1100,1500 L 1100,1200 L 1020,1080", dur: 4.5, delay: 0 },
    { id: 11, d: "M 0,1000 L 400,1000 L 500,900 L 800,900 L 920,980", dur: 3.5, delay: 1 },
    { id: 12, d: "M 2000,1000 L 1600,1000 L 1500,1100 L 1200,1100 L 1080,1020", dur: 4, delay: 2 },
];

const HeroSection = () => {
    // Generate random particles
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-blue-500' : 'bg-purple-500',
    }));

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0a1128] to-[#010512] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16" id="home">

            {/* CSS Animation for the SVG circuit lights */}
            <style>{`
                @keyframes flow {
                    0% { stroke-dashoffset: 150; }
                    100% { stroke-dashoffset: -2500; }
                }
            `}</style>

            {/* Background Particles Container */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className={`absolute rounded-full ${particle.color} opacity-40`}
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color === 'bg-cyan-400' ? '#06b6d4' : particle.color === 'bg-blue-500' ? '#3b82f6' : '#a855f7'}`
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, Math.random() * 40 - 20, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Motherboard Circuit Lines Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px] pointer-events-none z-0 opacity-40 sm:opacity-60">
                <svg viewBox="0 0 2000 2000" className="w-full h-full text-white">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {paths.map(p => {
                        const colors = ["#06b6d4", "#3b82f6", "#a855f7"];
                        const color = colors[p.id % 3];
                        return (
                            <g key={p.id}>
                                {/* Base faint circuit line */}
                                <path
                                    d={p.d}
                                    stroke={color}
                                    strokeWidth="1.5"
                                    strokeOpacity="0.15"
                                    fill="none"
                                    strokeLinejoin="round"
                                />
                                {/* Glowing moving light pulse */}
                                <path
                                    d={p.d}
                                    stroke={color}
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="150 2500"
                                    filter="url(#glow)"
                                    style={{
                                        animation: `flow ${p.dur}s linear infinite ${p.delay}s`
                                    }}
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center flex-1 py-10">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center w-full"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
                        Discover Your True Potential with
                        <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#a855f7] drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                            AI
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto text-center font-light leading-relaxed drop-shadow-md"
                >
                    SkillBridgeAI helps you analyze your skills, upload your resume, and discover the best career path powered by artificial intelligence.
                </motion.p>

                {/* Central AI Chip Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative flex items-center justify-center my-6 md:my-10 z-0 group"
                >
                    {/* Rotating Energy Rings */}
                    <div className="absolute inset-0 -mx-[50px] -my-[50px] sm:-mx-[70px] sm:-my-[70px] border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_12s_linear_infinite]" />
                    <div className="absolute inset-0 -mx-[65px] -my-[65px] sm:-mx-[90px] sm:-my-[90px] border-t-2 border-r-2 border-purple-500/40 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 -mx-[30px] -my-[30px] border border-[#3b82f6]/50 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />

                    {/* Core Chip Box */}
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-black/80 backdrop-blur-xl border-2 border-cyan-400/50 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.7)] group-hover:border-purple-400/80">
                        {/* Constant Pulsing Inner Glow */}
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-purple-600/20 animate-[pulse_2s_ease-in-out_infinite]" />

                        {/* Processor Icon */}
                        <FiCpu className="relative z-10 text-5xl sm:text-7xl text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,1)] group-hover:text-purple-400 transition-colors duration-500" />

                        {/* Micro-chips blinking details */}
                        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,1)]" style={{ animation: 'pulse 1.5s infinite' }} />
                        <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] animate-ping" />
                    </div>
                </motion.div>

                {/* Call to Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10 md:mt-12 w-full sm:w-auto"
                >
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] hover:-translate-y-1 active:scale-95 group/btn border border-white/10">
                        Get Started
                        <FiArrowRight className="text-xl group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black/40 border-2 border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white px-8 py-4 rounded-full font-medium text-lg backdrop-blur-md transition-all duration-300 hover:bg-slate-800/80 hover:-translate-y-1 active:scale-95 shadow-lg group/btn2">
                        <FiUpload className="text-xl text-cyan-500 group-hover/btn2:-translate-y-1 transition-transform" />
                        Upload Resume
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default HeroSection;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiCpu } from 'react-icons/fi';

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Explore Skills', href: '#explore' },
    { name: 'Resume AI', href: '#resume' },
    { name: 'Career Path', href: '#career' },
    { name: 'About', href: '#about' },
];

const DynamicIslandNavbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');

    const springConfig = { type: "spring", stiffness: 350, damping: 25 };

    return (
        <div className="fixed top-6 left-0 w-full flex justify-center z-50 px-4 pointer-events-none">
            <motion.nav
                layout
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                transition={springConfig}
                className={`
                    pointer-events-auto relative flex flex-col sm:flex-row items-center justify-between p-2 lg:px-4 
                    ${isMobileOpen ? 'w-[90%] max-w-sm rounded-[2.5rem] p-5' : 'rounded-full w-[95%] max-w-4xl group-hover:max-w-5xl'}
                    transition-[max-width,border-radius] duration-500 ease-out group
                `}
            >
                {/* 1) Outer soft glow layer around the border */}
                <div className="absolute -inset-[15px] z-[-3] overflow-hidden rounded-[inherit] pointer-events-none opacity-50 transition-opacity duration-500 group-hover:opacity-100 hidden sm:block">
                    <div className="absolute w-[2000px] h-[2000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] blur-2xl"
                        style={{ background: 'conic-gradient(from 0deg, transparent 50%, #06b6d4 70%, #3b82f6 85%, #a855f7 100%)' }}
                    />
                </div>

                {/* Outer glow for mobile to avoid edge cutoffs */}
                <div className="absolute -inset-[10px] z-[-3] overflow-hidden rounded-[inherit] pointer-events-none opacity-50 block sm:hidden">
                    <div className="absolute w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] blur-xl"
                        style={{ background: 'conic-gradient(from 0deg, transparent 50%, #06b6d4 70%, #3b82f6 85%, #a855f7 100%)' }}
                    />
                </div>

                {/* 2) Sharp rotating neon border line */}
                <div className="absolute -inset-[1px] z-[-2] overflow-hidden rounded-[inherit] pointer-events-none">
                    <div className="absolute w-[2000px] h-[2000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite]"
                        style={{ background: 'conic-gradient(from 0deg, transparent 50%, #06b6d4 70%, #3b82f6 85%, #a855f7 100%)' }}
                    />
                </div>

                {/* 3) Main Island Background */}
                <div className="absolute inset-0 z-[-1] rounded-[inherit] bg-black/60 backdrop-blur-xl shadow-2xl transition-all duration-500"
                    style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)' }}
                />

                {/* Nav Content Box to ensure z-index layering */}
                <div className="flex flex-col sm:flex-row items-center justify-between w-full h-full z-10">

                    {/* Logo and Mobile Toggle */}
                    <div className="flex items-center justify-between w-full sm:w-auto px-2 lg:px-4 py-1.5">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <motion.div layout>
                                <FiCpu className="text-2xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            </motion.div>
                            <motion.div layout className="text-xl font-bold tracking-tight select-none flex items-center">
                                <span className="text-white">Skill</span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#a855f7] drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">
                                    BridgeAI
                                </span>
                            </motion.div>
                        </div>

                        <motion.button
                            layout
                            className="sm:hidden text-white/80 hover:text-white transition-colors p-1 ml-auto"
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                        >
                            {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </motion.button>
                    </div>

                    {/* Desktop Nav Links */}
                    <AnimatePresence>
                        {!isMobileOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hidden sm:flex items-center justify-center flex-1 space-x-1 lg:space-x-2 overflow-hidden mx-4"
                            >
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => setActiveItem(item.name)}
                                        className="relative px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap rounded-full group/item"
                                    >
                                        {activeItem === item.name && (
                                            <motion.div
                                                layoutId="active-nav-glow"
                                                className="absolute inset-0 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                                transition={springConfig}
                                            />
                                        )}
                                        <span className="relative z-10">{item.name}</span>

                                        {/* Smooth underline animation */}
                                        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 rounded-full ${activeItem === item.name ? 'w-1/2 opacity-100' : 'w-0 opacity-0 group-hover/item:w-1/2 group-hover/item:opacity-100'}`}></div>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Desktop CTA Buttons */}
                    <AnimatePresence>
                        {!isMobileOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hidden sm:flex items-center gap-3 lg:gap-4 overflow-hidden pr-2"
                            >
                                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                                    Login
                                </button>
                                <button className="relative group/btn bg-white/10 hover:bg-white/20 text-white px-4 lg:px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] whitespace-nowrap active:scale-95 border border-white/10 overflow-hidden">
                                    <span className="relative z-10">Get Started</span>
                                    {/* Button inner glow hover effect */}
                                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500/40 to-cyan-400/40 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Expanded Menu */}
                <AnimatePresence>
                    {isMobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full flex justify-center flex-col gap-4 mt-6 overflow-hidden z-20"
                        >
                            <div className="flex flex-col space-y-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => { setActiveItem(item.name); setIsMobileOpen(false); }}
                                        className={`px-4 py-3 rounded-2xl text-center transition-all ${activeItem === item.name
                                                ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                                : 'text-slate-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                                <button className="w-full py-3 rounded-2xl text-slate-200 font-medium hover:bg-white/5 transition-colors border border-transparent">
                                    Login
                                </button>
                                <button className="relative w-full overflow-hidden group/mbtn bg-white/10 py-3 rounded-2xl text-white font-medium shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all active:scale-95 border border-white/10">
                                    <span className="relative z-10">Get Started</span>
                                    {/* Mobile button subtle inner glow */}
                                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600/50 to-cyan-500/50 opacity-0 group-hover/mbtn:opacity-100 transition-opacity duration-300" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
};

export default DynamicIslandNavbar;

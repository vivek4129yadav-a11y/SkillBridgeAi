import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTarget, FiAward, FiActivity } from 'react-icons/fi';

const DashboardPreview = () => {
    return (
        <section id="dashboard" className="py-24 relative overflow-hidden">
            {/* Decorative Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Command Center</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-400"
                    >
                        Track your progress, analyze skill gaps, and get real-time career insight from one unified dashboard.
                    </motion.p>
                </div>

                {/* Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass rounded-xl sm:rounded-3xl p-4 sm:p-8 border border-slate-700/60 shadow-2xl relative overflow-hidden"
                >
                    {/* Top Bar area */}
                    <div className="flex justify-between items-center border-b border-slate-700/50 pb-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                                <div className="w-full h-full rounded-full bg-slate-900 border-2 border-slate-800"></div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Welcome back, Vivek</h4>
                                <p className="text-sm text-slate-400">Frontend Developer Path</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex gap-3">
                            <button className="px-4 py-2 rounded-lg bg-primary/20 text-blue-400 text-sm font-medium border border-primary/30">
                                Update Skills
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700">
                                View Reports
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main Chart Area placeholder */}
                        <div className="md:col-span-2 glass bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
                            <div className="flex justify-between items-center mb-6">
                                <h5 className="font-bold text-slate-200 flex items-center gap-2">
                                    <FiActivity className="text-primary" /> Skill Progression
                                </h5>
                                <select className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg px-2 py-1">
                                    <option>Last 6 Months</option>
                                </select>
                            </div>

                            {/* Graphic Chart Simulation */}
                            <div className="relative h-48 w-full flex items-end gap-2 sm:gap-4 justify-between pt-4">
                                {[40, 55, 45, 70, 65, 85, 80, 95].map((height, i) => (
                                    <div key={i} className="flex-1 max-w-[40px] flex flex-col items-center gap-2 relative group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${height}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className={`w-full rounded-t-sm ${i >= 5 ? 'bg-gradient-to-t from-primary/40 to-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-700'} relative`}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {height}%
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Widgets */}
                        <div className="space-y-6">
                            <div className="glass bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
                                <h5 className="font-bold text-slate-200 flex items-center gap-2 mb-4">
                                    <FiTarget className="text-rose-400" /> Next Milestone
                                </h5>
                                <p className="text-sm text-slate-300 mb-3">Complete React Advanced Patterns course.</p>
                                <div className="w-full bg-slate-900 rounded-full h-2 mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '75%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1 }}
                                        className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                                    ></motion.div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Progress</span>
                                    <span>75%</span>
                                </div>
                            </div>

                            <div className="glass bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
                                <h5 className="font-bold text-slate-200 flex items-center gap-2 mb-4">
                                    <FiAward className="text-amber-400" /> Top Matches
                                </h5>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-300">Sr. React Developer</span>
                                        <span className="text-sm font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">95%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-300">Frontend Engineer</span>
                                        <span className="text-sm font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">92%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DashboardPreview;

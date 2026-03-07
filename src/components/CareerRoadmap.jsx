import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const roadmaps = [
    {
        role: 'Frontend Developer',
        description: 'Build interactive user interfaces and web applications.',
        color: 'from-blue-500 to-cyan-400',
        steps: ['HTML/CSS', 'JavaScript', 'React.js', 'Tailwind', 'Projects', 'Apply for Jobs']
    },
    {
        role: 'Data Scientist',
        description: 'Analyze complex data to extract actionable insights.',
        color: 'from-purple-500 to-indigo-400',
        steps: ['Python', 'SQL', 'Data Math', 'Machine Learning', 'Portfolio', 'Apply for Jobs']
    },
    {
        role: 'UX/UI Designer',
        description: 'Design intuitive, user-centric digital experiences.',
        color: 'from-pink-500 to-rose-400',
        steps: ['Design Theory', 'Figma', 'User Research', 'Prototyping', 'Case Studies', 'Apply for Jobs']
    }
];

const CareerRoadmap = () => {
    return (
        <section id="roadmaps" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Example <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Career Roadmaps</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-400"
                    >
                        AI-generated learning paths tailored to your target profession.
                    </motion.p>
                </div>

                <div className="space-y-8">
                    {roadmaps.map((roadmap, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass p-6 md:p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${roadmap.color} mb-2`}>
                                        {roadmap.role}
                                    </h3>
                                    <p className="text-slate-400">
                                        {roadmap.description}
                                    </p>
                                </div>
                                <button className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full">
                                    View Full Path <FiArrowRight />
                                </button>
                            </div>

                            {/* Horizontal Steps */}
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                                {roadmap.steps.map((step, stepIndex) => (
                                    <React.Fragment key={stepIndex}>
                                        <div className="flex-shrink-0 flex items-center gap-2 bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700">
                                            <FiCheckCircle className={`text-lg ${stepIndex === roadmap.steps.length - 1 ? 'text-green-400' : 'text-primary'}`} />
                                            <span className="font-medium text-slate-200 whitespace-nowrap">{step}</span>
                                        </div>

                                        {/* Arrow connecting steps */}
                                        {stepIndex < roadmap.steps.length - 1 && (
                                            <div className="hidden md:block flex-shrink-0 text-slate-600">
                                                <FiArrowRight />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerRoadmap;

import React from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiCpu, FiCompass, FiBriefcase } from 'react-icons/fi';

const steps = [
    {
        number: '01',
        title: 'Upload Resume or Enter Skills',
        description: 'Provide your background info manually or let our system extract it from your document.',
        icon: <FiUploadCloud className="text-2xl" />,
        color: 'from-blue-500 to-cyan-400'
    },
    {
        number: '02',
        title: 'AI Analyzes Your Skills',
        description: 'Our advanced models process your data to uncover hidden patterns and true competencies.',
        icon: <FiCpu className="text-2xl" />,
        color: 'from-purple-500 to-indigo-400'
    },
    {
        number: '03',
        title: 'Get Career Suggestions',
        description: 'Receive personalized roadmaps matching your unique profile to high-demand roles.',
        icon: <FiCompass className="text-2xl" />,
        color: 'from-pink-500 to-rose-400'
    },
    {
        number: '04',
        title: 'Find Jobs & Internships',
        description: 'Apply directly to curated openings tailored to your targeted career trajectory.',
        icon: <FiBriefcase className="text-2xl" />,
        color: 'from-orange-500 to-amber-400'
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SkillBridgeAI</span> Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-400"
                    >
                        A streamlined process to map out your future in four simple steps.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Number Indicator */}
                                <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-2 border-slate-700 group-hover:border-primary transition-colors duration-300 relative mb-8 z-10 shadow-lg shadow-black/50">
                                    <span className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">
                                        {step.number}
                                    </span>

                                    {/* Floating Icon */}
                                    <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                                        {step.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

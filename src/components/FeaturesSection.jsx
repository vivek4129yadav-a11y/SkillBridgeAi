import React from 'react';
import { motion } from 'framer-motion';
import {
    FiCpu,
    FiCheckCircle,
    FiMap,
    FiBriefcase,
    FiTarget,
    FiFileText,
    FiLayout,
    FiSearch
} from 'react-icons/fi';

const features = [
    {
        title: 'AI Skill Analyzer',
        description: 'Advanced algorithms scan your background to uncover your hidden strengths and core competencies.',
        icon: <FiCpu className="text-3xl" />,
        color: 'from-blue-500 to-cyan-400'
    },
    {
        title: 'Skill Assessment Tests',
        description: 'Interactive challenges designed to validate your expertise and identify areas for rapid improvement.',
        icon: <FiCheckCircle className="text-3xl" />,
        color: 'from-violet-500 to-purple-400'
    },
    {
        title: 'Career Roadmap Generator',
        description: 'Personalized step-by-step guides visualizing your journey from current skills to dream role.',
        icon: <FiMap className="text-3xl" />,
        color: 'from-pink-500 to-rose-400'
    },
    {
        title: 'Smart Job Matching',
        description: 'Instant connections to open roles where your specific skill profile provides a competitive advantage.',
        icon: <FiBriefcase className="text-3xl" />,
        color: 'from-amber-500 to-orange-400'
    },
    {
        title: 'Skill Gap Detection',
        description: 'Precise identification of the exact technologies you need to learn to qualify for target positions.',
        icon: <FiTarget className="text-3xl" />,
        color: 'from-emerald-500 to-teal-400'
    },
    {
        title: 'AI Resume Improver',
        description: 'Intelligent suggestions to optimize your resume keywords for applicant tracking systems.',
        icon: <FiFileText className="text-3xl" />,
        color: 'from-blue-600 to-indigo-500'
    },
    {
        title: 'Portfolio Builder',
        description: 'Automated generation of a professional showcase highlighting your best projects and achievements.',
        icon: <FiLayout className="text-3xl" />,
        color: 'from-fuchsia-500 to-pink-500'
    },
    {
        title: 'Internship Finder',
        description: 'Curated opportunities for beginners to gain real-world experience and accelerate their careers.',
        icon: <FiSearch className="text-3xl" />,
        color: 'from-cyan-500 to-blue-500'
    }
];

const FeaturesSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Powerful Features for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Career Growth</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-400"
                    >
                        Everything you need to discover your potential, improve your skills, and land the perfect job in one intelligent platform.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="glass p-8 rounded-2xl relative group overflow-hidden card-glow"
                        >
                            {/* Card Hover Gradient Background Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-white transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;

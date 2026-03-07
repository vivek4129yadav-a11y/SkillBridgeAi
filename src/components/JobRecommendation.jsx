import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock } from 'react-icons/fi';

const jobs = [
    {
        title: 'Senior Frontend Developer',
        company: 'TechVision Inc.',
        location: 'San Francisco, CA (Remote)',
        type: 'Full-time',
        salary: '$120k - $150k',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
        match: 95
    },
    {
        title: 'Data Scientist',
        company: 'Quantum Analytics',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$130k - $160k',
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        match: 88
    },
    {
        title: 'UX/UI Designer',
        company: 'Creative Studio',
        location: 'Remote',
        type: 'Contract',
        salary: '$80k - $100k',
        skills: ['Figma', 'Prototyping', 'User Research', 'Wireframing'],
        match: 92
    },
    {
        title: 'Full Stack Engineer',
        company: 'CloudScale Systems',
        location: 'Austin, TX (Hybrid)',
        type: 'Full-time',
        salary: '$110k - $140k',
        skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
        match: 85
    }
];

const JobRecommendation = () => {
    return (
        <section id="jobs" className="py-24 relative overflow-hidden bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold mb-6"
                        >
                            Smart Job <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Matches</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-400"
                        >
                            Discover open positions perfectly aligned with your current verified skill set and experience level.
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-primary hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap pb-2"
                    >
                        View All Matches &rarr;
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass p-6 md:p-8 rounded-2xl border border-slate-700/50 hover:border-primary/50 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-lg font-medium text-slate-300 mt-1">{job.company}</p>
                                </div>

                                {/* Match Percentage Badge */}
                                <div className="flex flex-col items-end">
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-semibold">
                                        {job.match}% Match
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                                <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
                                <span className="flex items-center gap-1"><FiBriefcase /> {job.type}</span>
                                <span className="flex items-center gap-1"><FiDollarSign /> {job.salary}</span>
                            </div>

                            <div className="mb-6 flex flex-wrap gap-2">
                                {job.skills.map((skill, sIndex) => (
                                    <span
                                        key={sIndex}
                                        className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-sm border border-slate-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                                <span className="flex items-center gap-1 text-sm text-slate-500">
                                    <FiClock /> Posted 2 days ago
                                </span>
                                <button className="bg-slate-800 hover:bg-gradient-to-r hover:from-primary hover:to-secondary text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto text-center">
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobRecommendation;

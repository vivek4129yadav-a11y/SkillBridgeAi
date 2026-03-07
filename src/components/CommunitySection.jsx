import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiMessageCircle, FiHeart, FiArrowRight } from 'react-icons/fi';

const communityFeatures = [
    {
        title: 'Share Projects',
        description: 'Get constructive feedback from industry experts and peers on your latest portfolio additions.',
        icon: <FiHeart className="text-3xl" />,
        color: 'from-pink-500 to-rose-400',
        link: 'Post a Project'
    },
    {
        title: 'Ask Questions',
        description: 'Stuck on a problem or career decision? Our community of professionals is here to help.',
        icon: <FiMessageCircle className="text-3xl" />,
        color: 'from-blue-500 to-cyan-400',
        link: 'Join Discussion'
    },
    {
        title: 'Get Mentorship',
        description: 'Connect 1-on-1 with senior developers and mentors who can guide your career trajectory.',
        icon: <FiUsers className="text-3xl" />,
        color: 'from-violet-500 to-purple-400',
        link: 'Find a Mentor'
    }
];

const CommunitySection = () => {
    return (
        <section id="community" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Join a Thriving <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Community</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-400"
                    >
                        Grow alongside thousands of other ambitious individuals. Share knowledge, ask questions, and build lasting connections.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {communityFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -5 }}
                            className="glass p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/80 transition-colors flex flex-col h-full group"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 mb-8 flex-grow">
                                {feature.description}
                            </p>

                            <button className="flex items-center gap-2 text-primary font-medium group-hover:text-blue-400 transition-colors w-fit">
                                {feature.link} <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Community Stats or Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-slate-700/50 group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to accelerate your career?</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        Join 50,000+ users who have already discovered their perfect career path using SkillBridgeAI.
                    </p>
                    <button className="bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-violet-600 text-white font-medium px-8 py-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                        Create Free Account
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CommunitySection;

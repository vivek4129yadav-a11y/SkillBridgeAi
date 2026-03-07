import React from 'react';
import { FiCpu, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-darker pt-20 pb-10 border-t border-slate-800 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/opacity-10 blur-[100px] pointer-events-none rounded-b-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <FiCpu className="text-3xl text-primary" />
                            <span className="text-2xl font-bold text-white">
                                SkillBridge<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI</span>
                            </span>
                        </div>
                        <p className="text-slate-400 mb-8 max-w-sm">
                            Connecting Skills to the Right Career. Discover your potential and land your dream job with AI-powered guidance.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-colors">
                                <FiTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-colors">
                                <FiLinkedin />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-colors">
                                <FiGithub />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Career Roadmaps</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Skill Tests</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Job Board</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Contact</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} SkillBridgeAI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Built with <FiCpu className="inline text-primary" /> for the future of work.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

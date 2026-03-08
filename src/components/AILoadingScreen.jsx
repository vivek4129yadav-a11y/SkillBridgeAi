import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const codeSnippets = [
    "Initializing neural network…",
    "import tensorflow as tf",
    "model = tf.keras.Sequential([",
    "  tf.keras.layers.Dense(512, activation='relu'),",
    "  tf.keras.layers.Dense(256, activation='relu')",
    "])",
    "Scanning skill database…",
    "SELECT * FROM users_skills WHERE match_score > 0.95;",
    "Matching user potential…",
    "{\"status\": \"active\", \"threads\": 1204, \"loss\": 0.0034}",
    "Analyzing resume patterns…",
    "extracting_keywords(resume_data, nlp_model=\"bert-large\")",
    "Building career prediction model…",
    "Epoch 124/500 - loss: 0.012 - accuracy: 0.998",
    "Optimizing weights...",
    "Applying gradient descent...",
    "[INFO] Overriding security protocols...",
    "[WARN] High computation load detected",
];

const systemMessages = [
    "Searching 2.4M career paths...",
    "Evaluating 10,000 skill combinations...",
    "Optimizing recommendation engine...",
    "Running predictive algorithms...",
    "Synthesizing market data...",
    "Calibrating match confidence...",
    "Finalizing career matrix..."
];

const AILoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(systemMessages[0]);
    const [terminalLines, setTerminalLines] = useState([]);
    const terminalRef = useRef(null);

    // Progress Bar Logic
    useEffect(() => {
        const duration = 8000; // 8 seconds to 100%
        const intervalTime = 50;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);
            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(timer);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    // System Messages Logic
    useEffect(() => {
        let msgIndex = 0;
        const msgTimer = setInterval(() => {
            msgIndex = (msgIndex + 1) % systemMessages.length;
            setCurrentMessage(systemMessages[msgIndex]);
        }, 1200);

        return () => clearInterval(msgTimer);
    }, []);

    // Terminal Code scrolling logic
    useEffect(() => {
        let snippetIndex = 0;
        const terminalTimer = setInterval(() => {
            setTerminalLines(prev => {
                const newLines = [...prev, codeSnippets[snippetIndex % codeSnippets.length]];
                if (newLines.length > 15) newLines.shift(); // Keep last 15 lines
                return newLines;
            });
            snippetIndex++;

            // Auto-scroll to bottom
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }, 200); // add new line every 200ms

        return () => clearInterval(terminalTimer);
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#030014] flex flex-col items-center justify-center overflow-hidden font-mono text-slate-200">

            {/* Background Animated Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Glow Spheres */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-purple-600/20 blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/20 blur-[120px]"
                />

                {/* Data lines grid */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Particles / Glowing Circuits */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-cyan-400 rounded-full"
                        style={{
                            width: Math.random() * 4 + 1 + 'px',
                            height: Math.random() * 4 + 1 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, Math.random() * -100 - 50],
                            opacity: [0, 1, 0],
                            boxShadow: ["0 0 0px #22d3ee", "0 0 10px #22d3ee", "0 0 0px #22d3ee"]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}

                {/* Vertical laser lines */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`line-${i}`}
                        className="absolute w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                        style={{ left: (15 + i * 20) + '%', height: '20vh' }}
                        animate={{
                            top: ['-20%', '120%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 2 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center gap-8">

                {/* Top Header */}
                <div className="text-center space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    >
                        DEEP AI SEARCH IN PROGRESS
                    </motion.h1>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-cyan-400/80 text-lg uppercase tracking-[0.3em]"
                    >
                        {currentMessage}
                    </motion.div>
                </div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full h-64 md:h-80 bg-[#0f172a]/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col overflow-hidden relative group"
                >
                    {/* Terminal Header */}
                    <div className="h-8 bg-[#1e293b]/80 border-b border-cyan-500/30 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="ml-2 text-xs text-slate-400 font-sans">AI_Core_Search_v3.0.bat</span>
                    </div>

                    {/* Terminal Content */}
                    <div ref={terminalRef} className="flex-1 p-4 overflow-y-hidden text-sm md:text-base scroll-smooth text-cyan-300">
                        <AnimatePresence>
                            {terminalLines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-mono leading-relaxed opacity-90"
                                >
                                    <span className="text-purple-400 mr-3">~ </span>
                                    {line.includes('error') || line.includes('WARN') ? (
                                        <span className="text-rose-400">{line}</span>
                                    ) : line.includes('import') || line.includes('tf') || line.includes('Epoch') || line.includes('SELECT') ? (
                                        <span className="text-emerald-400">{line}</span>
                                    ) : line.includes('...') || line.includes('…') ? (
                                        <span className="text-cyan-200">{line}</span>
                                    ) : (
                                        <span>{line}</span>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Terminal overlay gradient for fading effect at top */}
                    <div className="absolute top-8 left-0 right-0 h-10 bg-gradient-to-b from-[#0f172a]/90 to-transparent pointer-events-none"></div>
                </motion.div>

                {/* Progress Bar Section */}
                <div className="w-full max-w-2xl space-y-3 mt-4">
                    <div className="flex justify-between text-sm uppercase tracking-widest text-cyan-400">
                        <span>System Output</span>
                        <span className="font-bold">{Math.round(progress)}%</span>
                    </div>

                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-cyan-500 to-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                            style={{ width: progress + '%' }}
                        />
                        {/* Shimmer effect on bar */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AILoadingScreen;

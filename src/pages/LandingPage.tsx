import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  Wrench, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Landmark, 
  HelpCircle, 
  FileText, 
  Calendar, 
  Target, 
  Mic, 
  Smartphone,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [jobCounter, setJobCounter] = useState(0);
  const [activePersona, setActivePersona] = useState<number | null>(null);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll handler for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ticking counter logic
  useEffect(() => {
    // Fast count to 35247
    let start = 0;
    const end = 35247;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setJobCounter(end);
        clearInterval(timer);
        
        // Slow tick after initial count
        const slowTimer = setInterval(() => {
          setJobCounter(prev => prev + 1);
        }, 2500); // ~0.4 per second
        return () => clearInterval(slowTimer);
      } else {
        setJobCounter(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  // Canvas Particles (Map of India)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Subtle map coordinates (simplified outline of India)
    const mapPoints = [
      { x: 0.5, y: 0.15 }, { x: 0.55, y: 0.2 }, { x: 0.65, y: 0.25 },
      { x: 0.7, y: 0.35 }, { x: 0.65, y: 0.5 }, { x: 0.55, y: 0.75 },
      { x: 0.5, y: 0.85 }, { x: 0.45, y: 0.75 }, { x: 0.35, y: 0.5 },
      { x: 0.3, y: 0.35 }, { x: 0.4, y: 0.2 }
    ];

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 150; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle map connections
      ctx.strokeStyle = 'rgba(255, 153, 51, 0.05)';
      ctx.beginPath();
      mapPoints.forEach((p, i) => {
        const x = p.x * canvas.width;
        const y = p.y * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const personas = [
    {
      id: 1,
      icon: <Wrench className="w-8 h-8 text-saffron" />,
      name: "Ravi, 28",
      city: "Lucknow",
      pain: "Freelance auto electrician. ₹12,000/month. No proof of skill. Can't read English job portals.",
      detect: "We map your actual skills from a 5-min chat",
      give: "A week-by-week roadmap to ₹18,000/month jobs in your city",
      cta: "Start as Ravi"
    },
    {
      id: 2,
      icon: <GraduationCap className="w-8 h-8 text-saffron" />,
      name: "Priya, 21",
      city: "Bhopal",
      pain: "B.Com 3rd year. Overwhelmed by YouTube tutorials. No mentor. No direction.",
      detect: "Real-world skill mapping beyond degree titles",
      give: "Curated learning paths for in-demand roles in Bhopal",
      cta: "Start as Priya"
    },
    {
      id: 3,
      icon: <Users className="w-8 h-8 text-saffron" />,
      name: "Shalini, 34",
      city: "Mumbai",
      pain: "Domestic worker. ₹6,000/month. Dreams of selling handmade crafts online. Doesn't know how.",
      detect: "Entrepreneurial potential & digital literacy audit",
      give: "Step-by-step guide to setting up an online shop and basic GST",
      cta: "Start as Shalini"
    },
    {
      id: 4,
      icon: <FileText className="w-8 h-8 text-saffron" />,
      name: "Ashok, 44",
      city: "Chennai",
      pain: "NGO director. 200+ trainees. Placement data in Excel sheets. Funders want proof.",
      detect: "Trainee proficiency & employment readiness data",
      give: "Automated outcome tracking & CSV reports for CSR compliance",
      cta: "Start as Ashok"
    },
    {
      id: 5,
      icon: <Landmark className="w-8 h-8 text-saffron" />,
      name: "Officer Mehta, 51",
      city: "Varanasi",
      pain: "District Labour Officer. Paper surveys. Zero real-time skill gap data.",
      detect: "District-level workforce demand/supply heatmaps",
      give: "Live dashboard to plan skilling camps based on market gaps",
      cta: "Start as Mehta"
    },
    {
      id: 6,
      icon: <HelpCircle className="w-8 h-8 text-saffron" />,
      name: "[YOU?]",
      city: "Confused",
      pain: "Have a degree. Have ambition. No idea what to do next. Scrolling job portals at 2am.",
      detect: "Deep career personality & market fit analysis",
      give: "Clarity on your next high-potential move in under 10 mins",
      cta: "Find Your Path"
    }
  ];

  const features = [
    {
      title: "Skill Gap Analysis",
      desc: "AI compares YOUR skills against 10,000+ live job listings in your state. Shows exactly what's missing and why.",
      size: "large",
      visual: (
        <div className="flex flex-col gap-2 mt-4">
          {[
            { label: 'AutoCAD', val: 85, color: 'var(--accent-saffron)' },
            { label: 'English', val: 40, color: 'var(--accent-teal)' },
            { label: 'Safety Protocols', val: 70, color: 'var(--accent-saffron)' },
            { label: 'Client Mgmt', val: 30, color: 'var(--accent-teal)' }
          ].map(s => (
            <div key={s.label} className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000" 
                style={{ width: `${s.val}%`, backgroundColor: s.color }}
              ></div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "AI Career Chat",
      desc: "A mentor that never sleeps. Ask anything in Hindi or English. Gets smarter with your profile.",
      size: "large",
      visual: (
        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10 text-sm font-mono">
          <p className="text-gray-400">User: <span className="text-white">Main electrician hoon, aage kya karun?</span></p>
          <p className="text-saffron mt-2">AI: <span className="text-teal-400">Ravi, tere paas 3 options hain jo Lucknow mein ₹20k+ denge...</span></p>
        </div>
      )
    },
    { title: "Resume Parser", desc: "Upload your resume. We extract every skill, even ones you forgot to mention.", icon: <FileText /> },
    { title: "Week-by-Week Roadmap", desc: "Not 'learn Python'. We say: Week 1: NPTEL course on AutoCAD — 4hrs. Free.", icon: <Calendar /> },
    { title: "Job Matching", desc: "AI ranks jobs by YOUR skill match. No more applying blindly.", icon: <Target /> },
    { title: "Govt Scheme Finder", desc: "PMKVY, e-Shram, Skill India — we auto-check your eligibility.", icon: <Landmark /> },
    { title: "Mock Interviews", desc: "AI generates role-specific questions. Practice until you nail it.", icon: <Mic />, badge: "Coming Soon" },
    { title: "Works on Any Phone", desc: "2G connection. Old Android. No problem. WhatsApp bot coming.", icon: <Smartphone /> }
  ];

  return (
    <div className="landing-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

        :root {
          --bg-primary: #0A0A0B;
          --bg-card: #111114;
          --bg-card-hover: #161619;
          --accent-saffron: #FF9933;
          --accent-teal: #00D4AA;
          --accent-saffron-dim: rgba(255,153,51,0.15);
          --text-primary: #FFFFFF;
          --text-secondary: #888891;
          --text-muted: #444449;
          --border-subtle: rgba(255,255,255,0.08);
          --border-accent: rgba(255,153,51,0.4);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        body {
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Noto Sans', sans-serif;
          overflow-x: hidden;
        }

        .bebas { font-family: 'Bebas Neue', cursive; }
        
        .landing-container {
          min-height: 100vh;
        }

        /* Animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1.5rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 11, 0.9);
          backdrop-filter: blur(10px);
          padding: 1rem 5%;
          border-bottom: 1px solid var(--border-subtle);
        }

        .logo {
          font-size: 1.5rem;
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .logo span { color: var(--accent-saffron); }

        .nav-btn {
          background: var(--accent-saffron);
          color: black;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: bold;
          text-decoration: none;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(255, 153, 51, 0.3);
        }

        /* Hero */
        .hero {
          height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 5%;
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          opacity: 0.6;
        }

        .hero-grain {
          position: absolute;
          inset: 0;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        .hero-content {
          z-index: 1;
        }

        .hero-pre {
          color: var(--accent-saffron);
          letter-spacing: 0.3em;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: clamp(3rem, 10vw, 7.5rem);
          line-height: 0.9;
          margin-bottom: 1.5rem;
          color: white;
        }

        .hero-sub {
          color: var(--text-secondary);
          font-style: italic;
          max-width: 600px;
          margin-bottom: 3rem;
        }

        .counters {
          display: flex;
          gap: 4rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .counter-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .counter-label {
          color: var(--text-muted);
          font-size: 0.75rem;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .counter-value {
          font-family: monospace;
          font-size: 2.5rem;
          color: var(--accent-saffron);
        }

        .hero-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .cta-main {
          background: var(--accent-saffron);
          color: black;
          padding: 1.25rem 2.5rem;
          font-size: 1.25rem;
          font-weight: 800;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cta-main:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(255, 153, 51, 0.4);
        }

        .cta-sub {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          animation: bounce 2s infinite;
          color: var(--text-muted);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* Data Wall */
        .data-wall {
          padding: 8rem 5%;
          border-top: 1px solid var(--border-subtle);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 4rem;
          margin-bottom: 6rem;
        }

        .stat-card {
          text-align: center;
        }

        .stat-num {
          font-size: 5rem;
          color: var(--accent-saffron);
          margin-bottom: 1rem;
        }

        .stat-label {
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }

        .quote-block {
          max-width: 800px;
          margin: 0 auto;
          padding-left: 2rem;
          border-left: 4px solid var(--accent-saffron);
          margin-bottom: 6rem;
        }

        .quote-text {
          font-size: 1.5rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .quote-author {
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: rgba(255, 153, 51, 0.03);
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .ticker {
          display: flex;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
        }

        .ticker span {
          font-family: 'Bebas Neue';
          font-size: 1.25rem;
          color: var(--accent-saffron);
          margin-right: 4rem;
          opacity: 0.8;
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Identity Mirror */
        .identity-section {
          padding: 8rem 5%;
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 4rem;
          margin-bottom: 0.5rem;
        }

        .section-sub {
          color: var(--text-secondary);
        }

        .persona-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .persona-card {
          height: 350px;
          perspective: 1000px;
          cursor: pointer;
        }

        .persona-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          background: var(--bg-card);
        }

        .persona-card:hover .persona-inner {
          transform: rotateY(180deg);
          border-color: var(--accent-saffron);
          box-shadow: 0 0 30px rgba(255, 153, 51, 0.15);
        }

        .persona-card.active .persona-inner {
          border-color: var(--accent-saffron);
          box-shadow: 0 0 30px rgba(255, 153, 51, 0.3);
        }

        .persona-front, .persona-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
        }

        .persona-back {
          transform: rotateY(180deg);
          background: var(--bg-card-hover);
        }

        .persona-name {
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .persona-city {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .persona-pain {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .back-title {
          font-family: 'Bebas Neue';
          color: var(--accent-teal);
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .back-item {
          margin-bottom: 1.5rem;
        }

        .back-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.25rem;
        }

        .back-value {
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .persona-cta {
          margin-top: auto;
          color: var(--accent-saffron);
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Bento Grid */
        .feature-section {
          padding: 8rem 5%;
          background: rgba(255, 255, 255, 0.01);
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(200px, auto);
          gap: 1.5rem;
          margin-top: 4rem;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card:hover {
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
        }

        .feature-card.large {
          grid-column: span 2;
        }

        .feature-icon {
          color: var(--accent-saffron);
          margin-bottom: 1.5rem;
        }

        .feature-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .feature-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .feature-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--accent-saffron-dim);
          color: var(--accent-saffron);
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        /* Timeline */
        .timeline-section {
          padding: 8rem 5%;
        }

        .timeline {
          margin-top: 6rem;
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 2rem;
        }

        .timeline-line {
          position: absolute;
          top: 30px;
          left: 0;
          width: 100%;
          height: 2px;
          border-top: 2px dashed var(--border-subtle);
          z-index: 0;
        }

        .timeline-step {
          position: relative;
          z-index: 1;
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-num {
          width: 60px;
          height: 60px;
          background: var(--bg-primary);
          border: 2px solid var(--accent-saffron);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--accent-saffron);
          margin-bottom: 1.5rem;
          box-shadow: 0 0 20px var(--accent-saffron-dim);
        }

        .step-title {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        .step-desc {
          color: var(--text-secondary);
          font-size: 0.875rem;
          max-width: 200px;
        }

        /* Urgency Section */
        .urgency-section {
          padding: 8rem 5%;
          display: flex;
          gap: 6rem;
          align-items: center;
          background: black;
        }

        .urgency-left {
          flex: 1.2;
        }

        .urgency-title {
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1;
        }

        .urgency-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .urgency-pill {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid var(--accent-saffron);
          font-size: 1rem;
          color: var(--text-secondary);
        }

        /* Pricing */
        .pricing-section {
          padding: 8rem 5%;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .pricing-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          padding: 3rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
        }

        .pricing-card.featured {
          border-color: var(--accent-saffron);
          transform: scale(1.05);
          box-shadow: 0 0 50px rgba(255, 153, 51, 0.1);
        }

        .price-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .price-tag {
          font-size: 1.5rem;
          color: var(--accent-saffron);
          margin-bottom: 2rem;
        }

        .price-list {
          list-style: none;
          margin-bottom: 3rem;
          flex-grow: 1;
        }

        .price-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .price-btn {
          width: 100%;
          padding: 1rem;
          border-radius: 4px;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .price-btn.saffron {
          background: var(--accent-saffron);
          color: black;
        }

        .price-btn.outline {
          border: 1px solid var(--border-subtle);
          color: white;
        }

        /* Trust Section */
        .trust-section {
          padding: 4rem 5%;
          text-align: center;
          border-top: 1px solid var(--border-subtle);
        }

        .badges {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .badge-pill {
          padding: 0.75rem 1.5rem;
          background: var(--bg-card);
          border-radius: 100px;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .stamp {
          display: inline-block;
          margin-top: 4rem;
          padding: 0.5rem 1rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          transform: rotate(-3deg);
          font-family: 'Bebas Neue';
          opacity: 0.5;
        }

        /* Final CTA */
        .final-cta {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 5%;
        }

        .final-title {
          font-size: clamp(3rem, 10vw, 8rem);
          line-height: 0.9;
          margin-bottom: 2rem;
        }

        /* Footer */
        .footer {
          padding: 6rem 5% 0;
          background: var(--bg-primary);
          border-top: 1px solid var(--border-subtle);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 4rem;
          padding-bottom: 4rem;
        }

        .footer-logo-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-nav {
          display: flex;
          justify-content: center;
          gap: 2rem;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .footer-nav a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-nav a:hover {
          color: var(--text-secondary);
        }

        .footer-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .dpdp-badge {
          font-size: 10px;
          padding: 2px 8px;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          width: 100%;
        }

        .giant-word-section {
          position: relative;
          padding-top: 2rem;
          overflow: hidden;
          cursor: default;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .floating-label {
          font-size: 11px;
          letter-spacing: 0.3em;
          color: var(--accent-saffron);
          opacity: 0.7;
          margin-bottom: 0.5rem;
          width: 100%;
          text-align: center;
        }

        .giant-word {
          font-family: 'Bebas Neue';
          font-size: clamp(100px, 16vw, 260px);
          color: white;
          letter-spacing: -0.02em;
          line-height: 0.8;
          display: block;
          width: 100%;
          text-align: left;
          opacity: 0.92;
          margin-bottom: -0.15em;
          position: relative;
          z-index: 2;
          user-select: none;
        }

        .saffron-glow {
          background: radial-gradient(ellipse 80% 40% at 50% 120%, rgba(255,153,51,0.18) 0%, transparent 70%);
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .bottom-bar {
          border-top: 1px solid var(--accent-saffron);
          width: 100%;
          padding: 1rem 0 2rem;
          text-align: center;
          z-index: 3;
          position: relative;
          background: var(--bg-primary);
        }

        .copyright {
          font-size: 11px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; text-align: center; gap: 2rem; }
          .footer-right { align-items: center; text-align: center; }
          .footer-nav { flex-wrap: wrap; }
          .giant-word { text-align: center; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" className="logo bebas">SkillBridge AI <span>.</span></a>
        <div className="nav-right">
          <a href="/signup" className="nav-btn">Start Free Assessment <ArrowRight className="w-4 h-4" /></a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-grain" />
        <div className="hero-content animate-on-scroll">
          <p className="hero-pre bebas">INDIA. RIGHT NOW.</p>
          <h1 className="hero-title bebas">
            83 LAKH YOUTH<br />
            ARE JOBLESS.
          </h1>
          <p className="hero-sub">
            Not because they lack talent. Because no one showed them the path.
          </p>

          <div className="counters">
            <div className="counter-item">
              <span className="counter-label">Workers entering job market TODAY</span>
              <span className="counter-value">{jobCounter.toLocaleString()}</span>
            </div>
            <div className="counter-item">
              <span className="counter-label">Avg months to find first job</span>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-saffron animate-pulse" />
                <span className="counter-value">14</span>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="/signup" className="cta-main bebas">
              FIND YOUR PATH — FREE, 5 MINUTES <ArrowRight className="w-6 h-6" />
            </a>
            <p className="cta-sub">No signup needed to explore · Hindi & English supported</p>
          </div>
        </div>
        <div className="scroll-indicator">
          <ChevronDown className="w-8 h-8" />
        </div>
      </header>

      {/* DATA WALL */}
      <section className="data-wall">
        <div className="stats-grid">
          {[
            { n: "500,000,000", l: "workers with zero access to career guidance" },
            { n: "65%", l: "graduates unemployed or underemployed within 1 year" },
            { n: "₹0", l: "average govt spend on individual career counselling" }
          ].map(s => (
            <div key={s.n} className="stat-card animate-on-scroll">
              <h2 className="stat-num bebas">{s.n}</h2>
              <p className="stat-label">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="quote-block animate-on-scroll">
          <p className="quote-text">
            "13 million new workers enter India's job market every year. Only 2% receive any structured career guidance."
          </p>
          <span className="quote-author">— Ministry of Labour & Employment, 2023</span>
        </div>

        <div className="ticker-wrap">
          <div className="ticker">
            {Array(10).fill("SKILL GAP · UNEMPLOYMENT · NO MENTOR · WRONG COURSE · WASTED YEARS · MISSED OPPORTUNITIES · BROKEN SYSTEM ·").map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* IDENTITY MIRROR */}
      <section className="identity-section">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title bebas">WE BUILT THIS FOR YOU</h2>
          <p className="section-sub">Click the one that sounds like you.</p>
        </div>

        <div className="persona-grid">
          {personas.map((p) => (
            <div 
              key={p.id} 
              className={`persona-card ${activePersona === p.id ? 'active' : ''}`}
              onClick={() => setActivePersona(p.id)}
            >
              <div className="persona-inner">
                <div className="persona-front">
                  {p.icon}
                  <h3 className="persona-name bebas">{p.name}</h3>
                  <p className="persona-city">{p.city}</p>
                  <p className="persona-pain">"{p.pain}"</p>
                  <div className="persona-cta">
                    Flip to see solution <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="persona-back">
                  <h3 className="back-title">FOR {p.name.split(',')[0].toUpperCase()}</h3>
                  <div className="back-item">
                    <span className="back-label">What we detect</span>
                    <p className="back-value">{p.detect}</p>
                  </div>
                  <div className="back-item">
                    <span className="back-label">What we give you</span>
                    <p className="back-value">{p.give}</p>
                  </div>
                  <a href="/signup" className="persona-cta mt-auto">
                    {p.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE BENTO */}
      <section className="feature-section">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title bebas">YOUR PERSONAL CAREER INTELLIGENCE SYSTEM</h2>
          <p className="section-sub">Everything premium career coaches charge ₹50,000 for. Free.</p>
        </div>

        <div className="bento-grid">
          {features.map((f, i) => (
            <div key={i} className={`feature-card ${f.size === 'large' ? 'large' : ''} animate-on-scroll`}>
              {f.badge && <span className="feature-badge">{f.badge}</span>}
              <div className="feature-icon">
                {f.icon || (i === 0 ? <Target /> : <Users />)}
              </div>
              <h3 className="feature-title bebas">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              {f.visual}
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <h2 className="section-title bebas text-center animate-on-scroll" style={{ color: 'var(--accent-saffron)' }}>
          FROM LOST TO EMPLOYED IN 5 STEPS
        </h2>
        
        <div className="timeline animate-on-scroll">
          <div className="timeline-line"></div>
          {[
            { n: "1", i: "🗣️", t: "Tell us your story", d: "5-minute adaptive chat assessment" },
            { n: "2", i: "🧠", t: "AI maps your skills", d: "Proficiency scored 1-5 across 20+ dimensions" },
            { n: "3", i: "📊", t: "See your gaps", d: "Real job market data shows exactly what's missing" },
            { n: "4", i: "🗺️", t: "Get your roadmap", d: "Week-by-week learning plan with free resources" },
            { n: "5", i: "💼", t: "Apply with confidence", d: "AI-matched jobs + interview prep" }
          ].map(s => (
            <div key={s.n} className="timeline-step">
              <div className="step-num bebas">{s.n}</div>
              <span className="text-2xl mb-2">{s.i}</span>
              <h3 className="step-title bebas">{s.t}</h3>
              <p className="step-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* URGENCY */}
      <section className="urgency-section">
        <div className="urgency-left animate-on-scroll">
          <h2 className="urgency-title bebas">
            EVERY YEAR,<br />
            <span style={{ color: 'var(--accent-saffron)' }}>₹4.2 LAKH CRORE</span><br />
            IS LOST TO<br />
            SKILL MISMATCH.
          </h2>
        </div>
        <div className="urgency-right animate-on-scroll">
          {[
            "1 in 4 engineering graduates works in an unrelated field",
            "Only 45% of PMKVY trainees get placed",
            "Average ITI graduate earns ₹8,200/month — 40% below potential",
            "Rural youth take 2.3x longer to find first job than urban peers"
          ].map((s, i) => (
            <div key={i} className="urgency-pill">
              {s}
            </div>
          ))}
          <div className="mt-8 pt-4 border-t border-white/20">
            <p className="text-saffron bebas text-xl">SkillBridge AI was built to fix this. Starting with you.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section">
        <h2 className="section-title bebas text-center animate-on-scroll">
          WE DON'T CHARGE THE PEOPLE WHO NEED IT MOST
        </h2>

        <div className="pricing-grid">
          <div className="pricing-card animate-on-scroll">
            <h3 className="price-title bebas">INDIVIDUAL</h3>
            <p className="text-gray-400 mb-4">Students, Blue-collar, Informal</p>
            <div className="price-tag bebas">₹0 FOREVER</div>
            <ul className="price-list">
              {["Full skill assessment", "Gap analysis", "Learning roadmap", "Job matching", "AI career chat", "Govt scheme finder"].map(item => (
                <li key={item}><CheckCircle2 className="w-5 h-5 text-teal-400" /> {item}</li>
              ))}
            </ul>
            <a href="/signup" className="price-btn saffron">Start Free →</a>
          </div>

          <div className="pricing-card featured animate-on-scroll">
            <h3 className="price-title bebas">NGO / SKILLING</h3>
            <p className="text-gray-400 mb-4">Organizations & Cohorts</p>
            <div className="price-tag bebas">CONTACT FOR PRICING</div>
            <ul className="price-list">
              {["Cohort dashboard", "Trainee progress tracking", "Placement outcome reports", "CSR funder reports", "Bulk SMS/WhatsApp integration"].map(item => (
                <li key={item}><CheckCircle2 className="w-5 h-5 text-saffron" /> {item}</li>
              ))}
            </ul>
            <a href="mailto:partners@skillbridge.ai" className="price-btn saffron">Get Demo →</a>
          </div>

          <div className="pricing-card animate-on-scroll">
            <h3 className="price-title bebas">GOVERNMENT</h3>
            <p className="text-gray-400 mb-4">District & State Bodies</p>
            <div className="price-tag bebas">CUSTOM DEPLOYMENT</div>
            <ul className="price-list">
              {["Real-time workforce data", "District skill gap maps", "PMKVY camp planning", "Aadhar integration support", "Employment exchange sync"].map(item => (
                <li key={item}><CheckCircle2 className="w-5 h-5 text-gray-400" /> {item}</li>
              ))}
            </ul>
            <a href="mailto:partners@skillbridge.ai" className="price-btn outline">Partner with us →</a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust-section">
        <p className="text-muted bebas tracking-widest mb-4">POWERED BY INDIA'S SKILLING MISSION</p>
        <p className="text-secondary text-sm mb-8">Built in alignment with:</p>
        <div className="badges">
          {["🇮🇳 Skill India", "🇮🇳 Digital India", "🎓 PMKVY", "📚 NSDC"].map(b => (
            <div key={b} className="badge-pill">{b}</div>
          ))}
        </div>
        <p className="text-muted text-xs mt-8 max-w-2xl mx-auto">
          Resources from NPTEL · SWAYAM · freeCodeCamp · YouTube · PMKVY — curated, ranked, free.
        </p>
        <div className="stamp bebas">BUILT IN INDIA 🇮🇳</div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="animate-on-scroll">
          <h2 className="final-title bebas">
            YOUR NEXT JOB<br />
            IS WAITING.<br />
            YOUR SKILLS<br />
            <span style={{ color: 'var(--accent-saffron)' }}>AREN'T READY YET.</span>
          </h2>
          <p className="text-xl text-secondary mb-12">
            We'll show you exactly what to fix. In 5 minutes. For free.
          </p>
          <a href="/signup" className="cta-main bebas" style={{ margin: '0 auto', width: 'fit-content' }}>
            START YOUR FREE ASSESSMENT <ArrowRight className="w-6 h-6" />
          </a>
          <div className="flex gap-8 justify-center mt-8 text-muted text-sm bebas tracking-widest">
            <span>✓ No credit card</span>
            <span>✓ Hindi & English</span>
            <span>✓ Works on 2G</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo-box">
            <h3 className="bebas text-xl">SkillBridge AI<span style={{ color: 'var(--accent-saffron)' }}>.</span></h3>
            <p className="footer-desc text-xs text-gray-500">Converting ambiguity into clarity for 500M workers</p>
          </div>
          
          <div className="footer-nav">
            <a href="#">About</a>
            <a href="#features">Features</a>
            <a href="#">For NGOs</a>
            <a href="#">For Govt</a>
          </div>

          <div className="footer-right">
            <span>Made with purpose in India 🇮🇳</span>
            <span className="dpdp-badge">DPDP 2023 Compliant</span>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="giant-word-section">
          <div className="saffron-glow" />
          <p className="floating-label">संकल्प · RESOLVE · PURPOSE · ACTION</p>
          
          <h2 className="giant-word">
            {"SANKALP".split("").map((char, i) => {
              const isHovered = hoveredLetter === i;
              const isNeighbor = hoveredLetter !== null && Math.abs(hoveredLetter - i) === 1;
              const offset = isHovered ? -8 : isNeighbor ? -4 : 0;
              return (
                <span 
                  key={i}
                  onMouseEnter={() => setHoveredLetter(i)}
                  onMouseLeave={() => setHoveredLetter(null)}
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.15s ease-out',
                    transform: `translateY(${offset}px)`
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h2>

          <div className="bottom-bar">
            <div className="copyright">
              © 2026 SkillBridge AI · All rights reserved · Built for Bharat
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

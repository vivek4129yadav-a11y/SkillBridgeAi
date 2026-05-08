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
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [jobCounter, setJobCounter] = useState(0);
  const [activePersona, setActivePersona] = useState<number | null>(null);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [activeChart, setActiveChart] = useState<'demand' | 'skills'>('demand');
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
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" className="logo bebas">SkillBridge AI <span>.</span></a>
        <div className="nav-links hidden md:flex items-center gap-8 mr-8" style={{ display: 'flex', gap: '2rem', marginRight: '2rem' }}>
          <a href="#gap" className="text-sm bebas tracking-widest text-gray-400 hover:text-white transition-colors">THE GAP</a>
          <a href="#ecosystem" className="text-sm bebas tracking-widest text-gray-400 hover:text-white transition-colors">ECOSYSTEM</a>
          <a href="#pricing" className="text-sm bebas tracking-widest text-gray-400 hover:text-white transition-colors">PRICING</a>
        </div>
        <div className="nav-right">
          <a href="/signup" className="nav-btn">Start Free Assessment <ArrowRight className="w-4 h-4" /></a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
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
      </section>

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
      
      {/* THE GAP */}
      <section className="gap-section" id="gap">
        <div className="gap-container">
          <div className="gap-left animate-on-scroll">
            <h2 className="section-title bebas">THE GAP IS WIDENING.<br /><span style={{ color: 'var(--accent-saffron)' }}>WE BRIDGE IT.</span></h2>
            <p className="section-sub text-lg mb-8" style={{ maxWidth: '500px' }}>
              The job market is moving at AI speed. Education is moving at institutional speed. 
              SkillBridge AI maps real-time demand to your current profile, identifying the 
              exact delta you need to close to become employable.
            </p>
            <div className="flex flex-col gap-6">
              {[
                { t: "Live Demand Tracking", d: "We scan 10,000+ job postings daily in Hindi & English." },
                { t: "Dynamic Skill Mapping", d: "Our ontology recognizes 45,000+ granular skill nodes." },
                { t: "Local Context", d: "Tailored for Tier-2 and Tier-3 Indian cities." }
              ].map(item => (
                <div key={item.t} className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-teal-400" /></div>
                  <div>
                    <h4 className="bebas text-lg">{item.t}</h4>
                    <p className="text-gray-500 text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gap-right animate-on-scroll">
            <div className="glass-card">
              <div className="chart-header">
                <h3 className="bebas text-xl">Skill Delta Analysis</h3>
                <div className="chart-tabs">
                  <div 
                    className={`chart-tab ${activeChart === 'demand' ? 'active' : ''}`}
                    onClick={() => setActiveChart('demand')}
                  >
                    DEMAND
                  </div>
                  <div 
                    className={`chart-tab ${activeChart === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveChart('skills')}
                  >
                    MY SKILLS
                  </div>
                </div>
              </div>

              <svg className="chart-svg" viewBox="0 0 400 200">
                {/* Grid Lines */}
                {[0, 50, 100, 150, 200].map(y => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" />
                ))}
                
                {/* Demand Line */}
                <path 
                  className="chart-line" 
                  d="M0,150 L80,120 L160,160 L240,100 L320,130 L400,80" 
                  stroke="var(--accent-saffron)" 
                  style={{ opacity: activeChart === 'demand' ? 1 : 0.3 }}
                />
                
                {/* My Skills Line */}
                <path 
                  className="chart-line" 
                  d="M0,180 L80,170 L160,185 L240,175 L320,160 L400,155" 
                  stroke="var(--accent-teal)" 
                  style={{ opacity: activeChart === 'skills' ? 1 : 0.3 }}
                />

                {/* Data Points */}
                {[
                  { x: 80, y: 120, label: 'Demand', color: 'var(--accent-saffron)' },
                  { x: 80, y: 170, label: 'Skill', color: 'var(--accent-teal)' },
                  { x: 400, y: 80, label: 'Demand', color: 'var(--accent-saffron)' },
                  { x: 400, y: 155, label: 'Skill', color: 'var(--accent-teal)' }
                ].map((p, i) => (
                  <circle 
                    key={i} 
                    cx={p.x} 
                    cy={p.y} 
                    r="4" 
                    fill={p.color} 
                    className="chart-point"
                  />
                ))}
                
                {/* Area under lines */}
                <path 
                  d="M0,150 L80,120 L160,160 L240,100 L320,130 L400,80 L400,200 L0,200 Z" 
                  fill="url(#saffron-grad)" 
                  style={{ opacity: activeChart === 'demand' ? 0.1 : 0.05 }}
                />

                <defs>
                  <linearGradient id="saffron-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-saffron)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--accent-saffron)' }}></div>
                  Market Demand
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--accent-teal)' }}></div>
                  Average Talent Skill
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR THE ECOSYSTEM */}
      <section className="ecosystem-section" id="ecosystem">
        <div className="section-header animate-on-scroll text-center">
          <h2 className="section-title bebas">FOR THE ECOSYSTEM</h2>
          <p className="section-sub mx-auto" style={{ maxWidth: '600px' }}>
            We don't just help individuals. We provide the data infrastructure 
            for India's skilling organizations and government bodies.
          </p>
        </div>

        <div className="eco-grid">
          {[
            {
              title: "FOR NGOs & CSR",
              icon: <Users className="w-6 h-6" />,
              desc: "Track trainee outcomes beyond certificates. Get real placement data and automated CSR compliance reports.",
              link: "Explore NGO Dashboard"
            },
            {
              title: "FOR GOVERNMENT",
              icon: <Landmark className="w-6 h-6" />,
              desc: "District-level skill gap heatmaps to plan PMKVY camps and industrial training where they are needed most.",
              link: "Access Workforce Data"
            },
            {
              title: "FOR CORPORATES",
              icon: <Briefcase className="w-6 h-6" />,
              desc: "Direct pipeline to verified, job-ready talent from Tier-2 India. Stop guessing, start hiring by proficiency.",
              link: "Start Hiring"
            }
          ].map(eco => (
            <div key={eco.title} className="eco-card animate-on-scroll">
              <div className="eco-icon">{eco.icon}</div>
              <h3 className="eco-title bebas">{eco.title}</h3>
              <p className="eco-desc">{eco.desc}</p>
              <a href="#" className="eco-link bebas">
                {eco.link} <ArrowRight className="w-4 h-4" />
              </a>
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
      <section className="pricing-section" id="pricing">
        <h2 className="section-title bebas text-center animate-on-scroll">
          INVESTING IN INDIA'S HUMAN CAPITAL
        </h2>

        <div className="pricing-grid">
          <div className="pricing-card animate-on-scroll">
            <h3 className="price-title bebas">INDIVIDUAL</h3>
            <p className="text-gray-400 mb-4">Students & Workers</p>
            <div className="price-tag bebas">₹0 FOREVER</div>
            <p className="text-xs text-gray-500 mb-6 italic">"Our mission is to ensure every Indian youth has a roadmap, regardless of their ability to pay."</p>
            <ul className="price-list">
              {["Full skill assessment", "Gap analysis", "Learning roadmap", "Job matching", "AI career chat", "Govt scheme finder"].map(item => (
                <li key={item}><CheckCircle2 className="w-5 h-5 text-teal-400" /> {item}</li>
              ))}
            </ul>
            <a href="/signup" className="price-btn saffron">Start Free Assessment →</a>
          </div>

          <div className="pricing-card featured animate-on-scroll">
            <h3 className="price-title bebas">ENTERPRISE / NGO</h3>
            <p className="text-gray-400 mb-4">Scale Impact & Placements</p>
            <div className="price-tag bebas">PARTNER WITH US</div>
            <p className="text-xs text-gray-500 mb-6 italic">"Customized dashboards for tracking 100 to 100,000+ candidates in real-time."</p>
            <ul className="price-list">
              {["Cohort tracking", "Placement verification", "CSR outcome reports", "Bulk SMS/WhatsApp sync", "White-labeled portal", "API access"].map(item => (
                <li key={item}><CheckCircle2 className="w-5 h-5 text-saffron" /> {item}</li>
              ))}
            </ul>
            <a href="mailto:partners@skillbridge.ai" className="price-btn saffron">Get Partner Access →</a>
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

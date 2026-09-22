import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Calculator, Laptop, Cpu, CheckCircle2, ChevronRight } from 'lucide-react';
import './LandingPage.css';

interface TradeData {
  id: string;
  role: string;
  location: string;
  baselinePay: string;
  targetPay: string;
  jumpPercent: number;
  timeframe: string;
  missingSkills: string[];
  course: string;
}

const TRADES: TradeData[] = [
  {
    id: 'electrician',
    role: 'Electrician & Technician',
    location: 'Lucknow Cluster',
    baselinePay: '₹13,000 / mo',
    targetPay: '₹28,000 / mo',
    jumpPercent: 115,
    timeframe: '6 Weeks',
    missingSkills: ['Commercial EV Wiring', 'Inverter Diagnostics'],
    course: 'PMKVY EV Battery Module (Free Certificate)'
  },
  {
    id: 'commerce',
    role: 'B.Com Fresher',
    location: 'Bhopal Cluster',
    baselinePay: '₹12,000 / mo',
    targetPay: '₹26,000 / mo',
    jumpPercent: 116,
    timeframe: '7 Weeks',
    missingSkills: ['Tally Prime & E-Way Bills', 'GST Portal Returns'],
    course: 'SWAYAM Practical Accounting Track'
  },
  {
    id: 'tech',
    role: 'Coder / Operator',
    location: 'Jaipur Cluster',
    baselinePay: '₹16,000 / mo',
    targetPay: '₹38,000 / mo',
    jumpPercent: 137,
    timeframe: '8 Weeks',
    missingSkills: ['React & Tailwind Web Apps', 'REST API Integration'],
    course: 'NPTEL Web Application Engineering'
  },
  {
    id: 'industrial',
    role: 'CNC Operator',
    location: 'Pune Auto Belt',
    baselinePay: '₹15,000 / mo',
    targetPay: '₹32,000 / mo',
    jumpPercent: 113,
    timeframe: '6 Weeks',
    missingSkills: ['PLC Programming', 'ISO Quality Inspection'],
    course: 'MSME Tool Room Automation Track'
  }
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTrade, setSelectedTrade] = useState<string>('electrician');
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const active = TRADES.find(t => t.id === selectedTrade) || TRADES[0];
  const letters = 'SANKALP'.split('');

  useEffect(() => {
    document.title = "SANKALP · Open Career Intelligence for Bharat";

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page-root">
      {/* NAVBAR */}
      <header className={`navbar-clean ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-narrow navbar-inner">
          <a href="/" className="nav-brand">
            <span className="brand-text">SANKALP</span>
            <span className="brand-dot">.</span>
            <span className="brand-tag">SkillBridge</span>
          </a>

          <nav className="nav-links-row">
            <a href="#simulator" className="nav-link">Simulator</a>
            <a href="#how-it-works" className="nav-link">Process</a>
            <a href="#story" className="nav-link">Stories</a>
            <a href="#ecosystem" className="nav-link">Ecosystem</a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="btn-ghost"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="btn-saffron"
            >
              <span>Start</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ACT 1: HERO & NATURAL TRADE PREVIEW */}
      <section className="hero-clean" id="simulator">
        <div className="container-narrow">
          <div className="hero-pill">
            <span>🇮🇳 Open Workforce Intelligence</span>
          </div>

          <h1 className="hero-heading">
            TURN WHAT YOU KNOW <br />
            <span className="saffron">INTO WHAT YOU'RE WORTH.</span>
          </h1>

          <p className="hero-lead">
            Hard work isn't the problem. Missing specific localized skills is. 
            Select your field below to see how 2 target skills can jump your monthly pay.
          </p>

          <div className="trade-preview-surface">
            {/* Natural trade selector pills */}
            <div className="trade-pills-row">
              {TRADES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTrade(t.id)}
                  className={`trade-pill-btn ${t.id === selectedTrade ? 'active' : ''}`}
                >
                  <span className="pill-icon">
                    {t.id === 'electrician' && <Zap className="w-4 h-4" />}
                    {t.id === 'commerce' && <Calculator className="w-4 h-4" />}
                    {t.id === 'tech' && <Laptop className="w-4 h-4" />}
                    {t.id === 'industrial' && <Cpu className="w-4 h-4" />}
                  </span>
                  <span>{t.role}</span>
                </button>
              ))}
            </div>

            {/* De-clustered wage jump comparison */}
            <div className="wage-jump-band">
              <div className="wage-step">
                <span className="wage-label">Typical Starting Pay</span>
                <span className="wage-val baseline">{active.baselinePay}</span>
                <span className="wage-meta">{active.location}</span>
              </div>

              <div className="wage-connector">
                <span className="jump-badge-amber">+{active.jumpPercent}% Wage Jump</span>
                <span className="jump-time">Target in {active.timeframe}</span>
              </div>

              <div className="wage-step">
                <span className="wage-label">Certified Skilled Wage</span>
                <span className="wage-val target">{active.targetPay}</span>
                <span className="wage-meta">Verified Market Demand</span>
              </div>
            </div>

            {/* Action Strip with 2 missing skills and button */}
            <div className="trade-action-strip">
              <div className="missing-skills-box">
                <span className="missing-tag">Missing Gaps:</span>
                {active.missingSkills.map((s, idx) => (
                  <span key={idx} className="skill-chip">
                    {s}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="btn-saffron"
              >
                <span>Diagnose Your Skill Gaps</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 2: 3 VISUAL STEPS (Spacious & Natural) */}
      <section className="pathway-section" id="how-it-works">
        <div className="container-narrow">
          <span className="section-eyebrow indigo">A Practical Sequence</span>
          <h2 className="section-title-large">HOW SANKALP BRIDGES THE GAP</h2>
          <p className="section-subtitle-clean">
            No stressful exams, no confusing corporate jargon. A structured 3-step path to higher earnings.
          </p>

          <div className="steps-column-flow">
            {/* Step 1 */}
            <div className="step-card-editorial">
              <div>
                <div className="step-num-accent">STEP 01</div>
                <h3 className="step-title">A 5-Minute Practical Chat</h3>
                <p className="step-desc">
                  We don't give you paper tests. Our AI chats with you like an experienced master craftsman, 
                  asking real troubleshooting questions in simple Hindi or English to find what you genuinely know.
                </p>
                <div className="step-meta-chips">
                  <span className="meta-chip">Hindi & English</span>
                  <span className="meta-chip">Voice or Text</span>
                  <span className="meta-chip">5 Minutes</span>
                </div>
              </div>

              <div className="visual-chat-card">
                <div className="chat-row q">
                  <strong>AI Mentor:</strong> "If your inverter trips with an overload code on battery mode, what's your first clamp meter check?"
                </div>
                <div className="chat-row a">
                  <strong>Candidate:</strong> "Measure earthing resistance and check DC current draw at battery terminals."
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card-editorial">
              <div>
                <div className="step-num-accent" style={{ color: 'var(--accent-saffron)' }}>STEP 02</div>
                <h3 className="step-title">The District Skill Gap Radar</h3>
                <p className="step-desc">
                  We match your verified strengths against live hiring demands across 75+ Indian industrial districts. 
                  You see the exact 2 or 3 skills separating you from a higher wage tier.
                </p>
                <div className="step-meta-chips">
                  <span className="meta-chip">District-Level Data</span>
                  <span className="meta-chip">Real Vacancy Count</span>
                  <span className="meta-chip">Salary Delta</span>
                </div>
              </div>

              <div className="visual-metric-card">
                <div className="metric-bar-item">
                  <div className="metric-bar-header">
                    <span>Domestic Wiring & AC Repair</span>
                    <span style={{ color: 'var(--accent-indigo)' }}>92% Matched</span>
                  </div>
                  <div className="metric-track-clean">
                    <div className="metric-fill-indigo" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="metric-bar-item">
                  <div className="metric-bar-header">
                    <span>Commercial EV Diagnostics (Missing Gap)</span>
                    <span style={{ color: 'var(--accent-amber)' }}>25% Target</span>
                  </div>
                  <div className="metric-track-clean">
                    <div className="metric-fill-amber" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-card-editorial">
              <div>
                <div className="step-num-accent" style={{ color: 'var(--accent-amber)' }}>STEP 03</div>
                <h3 className="step-title">Your 100% Free Learning Plan</h3>
                <p className="step-desc">
                  Instead of endless YouTube searches, you get a week-by-week schedule linking directly 
                  to free government courses from SWAYAM, NPTEL, and PMKVY.
                </p>
                <div className="step-meta-chips">
                  <span className="meta-chip">SWAYAM / NPTEL</span>
                  <span className="meta-chip">Govt Certificates</span>
                  <span className="meta-chip">Zero Tuition</span>
                </div>
              </div>

              <div className="visual-timeline-card">
                <div className="timeline-row">
                  <span className="timeline-tag">Week 1–2</span>
                  <span className="timeline-text">DC Circuitry & BMS Fundamentals (SWAYAM)</span>
                </div>
                <div className="timeline-row">
                  <span className="timeline-tag">Week 3–5</span>
                  <span className="timeline-text">High-Voltage Battery Safety (NPTEL)</span>
                </div>
                <div className="timeline-row">
                  <span className="timeline-tag">Week 6–8</span>
                  <span className="timeline-text">Workshop Fault Codes & Placement Referral</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 3: SPOTLIGHT STORY (Human & Grounded) */}
      <section className="story-spotlight-section" id="story">
        <div className="container-narrow">
          <div className="spotlight-card">
            <div>
              <span className="section-eyebrow saffron">Case Study: Lucknow</span>
              <blockquote className="spotlight-quote">
                "I worked for 7 years doing house wiring for ₹12,000. In 6 weeks, SANKALP diagnosed my missing EV knowledge and guided me to a free certificate. Today I earn ₹26,000 at an EV workshop."
              </blockquote>
              <div className="spotlight-person">
                <div>
                  <h4 className="spotlight-name">Ravi Verma, 28</h4>
                  <span className="spotlight-role">Certified Commercial EV Technician · Lucknow</span>
                </div>
              </div>
            </div>

            <div className="journey-milestones">
              <div className="milestone-box">
                <div className="milestone-label">Baseline</div>
                <div className="milestone-title">Freelance Electrician</div>
                <div className="milestone-detail">₹12,000/mo · No trade license</div>
              </div>

              <div className="milestone-box">
                <div className="milestone-label">The Delta</div>
                <div className="milestone-title">6-Week Free Curriculum</div>
                <div className="milestone-detail">SWAYAM Battery Safety + Workshop Practical</div>
              </div>

              <div className="milestone-box">
                <div className="milestone-label">Outcome</div>
                <div className="milestone-title">Commercial EV Technician</div>
                <div className="milestone-detail" style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>
                  ₹26,000/mo (+116% Wage Jump)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 4: ECOSYSTEM ROWS & SIGNATURE SANKALP FOOTER */}
      <section className="ecosystem-clean-section" id="ecosystem">
        <div className="container-narrow">
          <span className="section-eyebrow amber">Stakeholders</span>
          <h2 className="section-title-large">WHO SANKALP EMPOWERS</h2>
          
          <div className="ecosystem-rows">
            <div className="eco-row-item">
              <div>
                <h4 className="eco-row-title">Jobseekers & Trade Workers</h4>
                <p className="eco-row-desc">Free conversational skill assessment, verified scorecards, and local job connections.</p>
              </div>
              <a href="/signup" className="eco-row-link">
                <span>Start Assessment</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="eco-row-item">
              <div>
                <h4 className="eco-row-title">SME & Industrial Employers</h4>
                <p className="eco-row-desc">Source pre-screened trade candidates in your district with zero agency commissions.</p>
              </div>
              <a href="/onboarding/employer" className="eco-row-link">
                <span>Hire Talent</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="eco-row-item">
              <div>
                <h4 className="eco-row-title">Vocational NGOs & Institutions</h4>
                <p className="eco-row-desc">Cohort progression tracking, automated placement logs, and exportable CSR compliance reports.</p>
              </div>
              <a href="/onboarding/ngo" className="eco-row-link">
                <span>Cohort Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & SIGNATURE GIANT SANKALP WORD TOUCHING THE BOTTOM LINE */}
      <footer className="footer-clean">
        <div className="container-narrow">
          <div className="footer-top-row">
            <div className="footer-brand">
              SANKALP<span style={{ color: 'var(--accent-saffron)' }}>.</span>
            </div>

            <nav className="footer-nav-simple">
              <a href="#simulator">Career Delta</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#story">Case Studies</a>
              <a href="#ecosystem">Ecosystem</a>
              <a href="/login">Sign In</a>
            </nav>
          </div>
        </div>

        {/* Signature SANKALP emblem sitting right on top of the bottom line */}
        <div className="giant-word-section">
          <p className="floating-label">RESOLVE · PURPOSE · ACTION</p>

          <h2 className="giant-word" aria-label="SANKALP">
            {letters.map((char, i) => {
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
              © 2026 SANKALP · Open Career Intelligence for Bharat · DPDP Act 2023 Compliant
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

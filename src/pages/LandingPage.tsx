import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Calculator,
  Wrench,
  SunMedium,
  Truck,
  ChevronRight,
  Bot,
  Layers,
  Map,
  FileCheck2,
  Languages,
  CheckCircle2
} from 'lucide-react';
import './LandingPage.css';

interface TradeData {
  id: string;
  role: string;
  cluster: string;
  baselinePay: string;
  targetPay: string;
  jumpPercent: number;
  timeframe: string;
  missingSkills: string[];
  course: string;
  openings: string;
}

const TRADES: TradeData[] = [
  {
    id: 'electrician',
    role: 'Electrician & EV Tech',
    cluster: 'Lucknow Cluster',
    baselinePay: '₹13,000 / mo',
    targetPay: '₹28,000 / mo',
    jumpPercent: 115,
    timeframe: '6 Weeks',
    missingSkills: ['Commercial EV Battery Wiring', 'Inverter BMS Diagnostics'],
    course: 'PMKVY EV Battery Module (Free Certificate)',
    openings: '420 active workshop vacancies'
  },
  {
    id: 'machinist',
    role: 'CNC Machinist',
    cluster: 'Pune Auto Belt',
    baselinePay: '₹15,000 / mo',
    targetPay: '₹32,000 / mo',
    jumpPercent: 113,
    timeframe: '6 Weeks',
    missingSkills: ['Fanuc PLC Programming', 'ISO Metrology Inspection'],
    course: 'MSME Tool Room Automation Track',
    openings: '380 industrial vacancies'
  },
  {
    id: 'solar',
    role: 'Solar PV Installer',
    cluster: 'Jaipur Cluster',
    baselinePay: '₹14,000 / mo',
    targetPay: '₹30,000 / mo',
    jumpPercent: 114,
    timeframe: '5 Weeks',
    missingSkills: ['Net-Metering Inverter Sync', 'String Voltage Load Balancing'],
    course: 'Surya Mitra National Certification',
    openings: '510 contractor openings'
  },
  {
    id: 'logistics',
    role: 'Warehouse Lead',
    cluster: 'Bhiwandi Hub',
    baselinePay: '₹13,500 / mo',
    targetPay: '₹27,500 / mo',
    jumpPercent: 103,
    timeframe: '4 Weeks',
    missingSkills: ['WMS Barcode Auditing', 'RF Scanner Fleet Management'],
    course: 'Logistics Sector Skill Council Track',
    openings: '640 regional hub jobs'
  },
  {
    id: 'accounts',
    role: 'Accounts Executive',
    cluster: 'Bhopal Estate',
    baselinePay: '₹12,000 / mo',
    targetPay: '₹26,000 / mo',
    jumpPercent: 116,
    timeframe: '7 Weeks',
    missingSkills: ['Tally Prime E-Way Bill Reconciliation', 'GST Portal 3B Returns'],
    course: 'SWAYAM Practical GST Accounting Track',
    openings: '590 SME accounting desks'
  }
];

interface EngineItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  bullets: string[];
}

const ENGINES: EngineItem[] = [
  {
    id: 'scanner',
    title: 'Adaptive Practical Scanner',
    tag: 'Engine 01',
    desc: '5-minute conversational diagnostic evaluating hands-on trade skills in natural Hindi or English without written exams.',
    bullets: [
      'Probes real troubleshooting dilemmas, not textbook theory',
      'Supports text or voice inputs in regional languages',
      'Produces verified competency scorecards for employers'
    ]
  },
  {
    id: 'gap',
    title: 'District Skill Gap Matrix',
    tag: 'Engine 02',
    desc: 'Cross-references your verified skills against active district hiring requirements to isolate the exact missing blockers.',
    bullets: [
      'Pinpoints the 2–3 skills blocking the next wage bracket',
      'Computes live salary delta based on district market demand',
      'Integrates directly with local SME job openings'
    ]
  },
  {
    id: 'roadmap',
    title: '8-Week Micro-Roadmap',
    tag: 'Engine 03',
    desc: 'A structured daily study plan linking directly to free government-funded modules on SWAYAM, NPTEL, and PMKVY.',
    bullets: [
      'Daily 45-minute modular lessons completed while working',
      'Zero tuition cost with verified government certificates',
      'Automated progress tracking and placement referrals'
    ]
  },
  {
    id: 'ats',
    title: 'ATS Resume Diagnostic',
    tag: 'Engine 04',
    desc: 'Parses trade resumes to extract hands-on tool competencies and formats them for corporate enterprise screening.',
    bullets: [
      'Extracts practical machinery, software, and trade tools',
      'Formats candidate CV into clean single-page verified profile',
      'Optimises readability for SME and corporate HR filters'
    ]
  },
  {
    id: 'mentor',
    title: 'Bilingual Career Mentor',
    tag: 'Engine 05',
    desc: '24/7 conversational assistant in Hindi and English answering questions on trade doubts, wage paths, and certifications.',
    bullets: [
      'Plain Hindi and English conversational troubleshooting',
      'Step-by-step guidance on government portal registrations',
      'Explains career progression pathways for any trade'
    ]
  }
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTrade, setSelectedTrade] = useState<string>('electrician');
  const [activeEngine, setActiveEngine] = useState<string>('scanner');
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  const activeTradeData = TRADES.find(t => t.id === selectedTrade) || TRADES[0];
  const activeEngineData = ENGINES.find(e => e.id === activeEngine) || ENGINES[0];
  const letters = 'SANKALP'.split('');

  useEffect(() => {
    document.title = "SANKALP · Open Career Intelligence for Bharat";
  }, []);

  return (
    <div className="landing-page-root">
      {/* NAVBAR */}
      <header className="navbar-clean">
        <div className="container-tight navbar-inner">
          <a href="/" className="nav-brand">
            <span className="brand-text">SANKALP</span>
            <span className="brand-dot">.</span>
            <span className="brand-tag-stamp">VOCATIONAL TOOLKIT</span>
          </a>

          <nav className="nav-links-row">
            <a href="#simulator" className="nav-link">Simulator</a>
            <a href="#features" className="nav-link">Platform Engines</a>
            <a href="#stakeholders" className="nav-link">Access</a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="btn-ghost-tactile"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="btn-saffron-action"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO: DIRECT & FUNCTIONAL */}
      <section className="hero-direct">
        <div className="container-tight">
          <span className="hero-tag">OPEN VOCATIONAL INTELLIGENCE</span>

          <h1 className="hero-heading">
            Practical skills tested. <br />
            <span className="accent-color">Skill gaps solved.</span>
          </h1>

          <p className="hero-lead">
            Diagnose hands-on trade skills via 5-minute conversational assessments, map the exact
            missing skills blocking higher wages in your district, and access free government-certified learning roadmaps.
          </p>

          <div className="hero-cta-row">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="btn-saffron-action"
            >
              <span>Start 5-Min Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#simulator" className="btn-ghost-tactile">
              Explore Wage Simulator
            </a>
          </div>
        </div>
      </section>

      {/* FEATURE 1: INTERACTIVE CAREER DELTA SIMULATOR */}
      <section className="simulator-section" id="simulator">
        <div className="container-tight">
          <span className="section-kicker">Interactive Tool</span>
          <h2 className="section-title">CAREER DELTA SIMULATOR</h2>
          <p className="section-desc">
            Select a trade below to calculate the monthly wage jump unlocked by closing 2 targeted skill gaps.
          </p>

          <div className="ledger-box">
            <div className="ledger-top-bar">
              <span>WAGE DELTA CALCULATOR</span>
              <span style={{ color: 'var(--accent-amber-bright)' }}>{activeTradeData.openings}</span>
            </div>

            {/* Tab Row */}
            <div className="ledger-tabs">
              {TRADES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTrade(t.id)}
                  className={`ledger-tab ${t.id === selectedTrade ? 'active' : ''}`}
                >
                  {t.id === 'electrician' && <Zap className="w-3.5 h-3.5" />}
                  {t.id === 'machinist' && <Wrench className="w-3.5 h-3.5" />}
                  {t.id === 'solar' && <SunMedium className="w-3.5 h-3.5" />}
                  {t.id === 'logistics' && <Truck className="w-3.5 h-3.5" />}
                  {t.id === 'accounts' && <Calculator className="w-3.5 h-3.5" />}
                  <span>{t.role}</span>
                </button>
              ))}
            </div>

            <div className="ledger-body">
              <div className="ledger-contrast-grid">
                <div className="ledger-col">
                  <span className="col-label">Current Uncertified Wage</span>
                  <span className="col-val baseline">{activeTradeData.baselinePay}</span>
                  <span className="col-sub">{activeTradeData.cluster}</span>
                </div>

                <div>
                  <span className="ledger-badge-jump">+{activeTradeData.jumpPercent}% Projected Jump</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    Target in {activeTradeData.timeframe}
                  </div>
                </div>

                <div className="ledger-col">
                  <span className="col-label">Certified Skilled Wage</span>
                  <span className="col-val target">{activeTradeData.targetPay}</span>
                  <span className="col-sub">Active Market Demand</span>
                </div>
              </div>

              <div className="ledger-action-row">
                <div className="missing-chips-group">
                  <span className="missing-chip-label">Target Skill Gaps:</span>
                  {activeTradeData.missingSkills.map((s, idx) => (
                    <span key={idx} className="skill-tag">
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="btn-saffron-action"
                >
                  <span>Diagnose My Gaps</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2: THE 5 CORE PLATFORM ENGINES */}
      <section className="engines-section" id="features">
        <div className="container-tight">
          <span className="section-kicker">System Architecture</span>
          <h2 className="section-title">CORE PLATFORM ENGINES</h2>
          <p className="section-desc">
            Five functional tools built to evaluate practical competency, map gaps, and route workers to free certifications.
          </p>

          {/* Engine Selector */}
          <div className="engines-selector-bar">
            {ENGINES.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setActiveEngine(e.id)}
                className={`engine-pill-btn ${e.id === activeEngine ? 'active' : ''}`}
              >
                {e.id === 'scanner' && <Bot className="w-3.5 h-3.5" />}
                {e.id === 'gap' && <Layers className="w-3.5 h-3.5" />}
                {e.id === 'roadmap' && <Map className="w-3.5 h-3.5" />}
                {e.id === 'ats' && <FileCheck2 className="w-3.5 h-3.5" />}
                {e.id === 'mentor' && <Languages className="w-3.5 h-3.5" />}
                <span>{e.title}</span>
              </button>
            ))}
          </div>

          {/* Active Engine Card */}
          <div className="engine-showcase-box">
            <div>
              <span className="engine-tag-label">{activeEngineData.tag}</span>
              <h3 className="engine-title">{activeEngineData.title}</h3>
              <p className="engine-desc">{activeEngineData.desc}</p>

              <div className="engine-bullets">
                {activeEngineData.bullets.map((b, idx) => (
                  <div key={idx} className="bullet-item">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Feature Previews */}
            <div className="engine-preview-card">
              {activeEngine === 'scanner' && (
                <div>
                  <div className="preview-tape-row q">
                    <strong>Diagnostic AI:</strong> "If a single-phase induction motor draws excessive starting current and hums without rotating, what is the primary component to inspect?"
                  </div>
                  <div className="preview-tape-row a">
                    <strong>Candidate:</strong> "Inspect start capacitor capacitance and check centrifugal switch disconnect contacts."
                  </div>
                </div>
              )}

              {activeEngine === 'gap' && (
                <div>
                  <div className="radar-stat-item">
                    <div className="radar-stat-header">
                      <span>Domestic Wiring & AC Maintenance</span>
                      <span style={{ color: 'var(--accent-indigo-bright)' }}>92% Matched</span>
                    </div>
                    <div className="radar-stat-track">
                      <div style={{ height: '100%', width: '92%', background: 'var(--accent-indigo)' }} />
                    </div>
                  </div>
                  <div className="radar-stat-item">
                    <div className="radar-stat-header">
                      <span>Commercial EV Diagnostics (Gap)</span>
                      <span style={{ color: 'var(--accent-saffron-bright)' }}>25% Target</span>
                    </div>
                    <div className="radar-stat-track">
                      <div style={{ height: '100%', width: '25%', background: 'var(--accent-saffron-bright)' }} />
                    </div>
                  </div>
                </div>
              )}

              {activeEngine === 'roadmap' && (
                <div>
                  <div className="roadmap-step-line">
                    <span style={{ color: 'var(--accent-amber-bright)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Week 1–2:</span>
                    <span>DC Circuitry & High-Voltage Battery Fundamentals (SWAYAM)</span>
                  </div>
                  <div className="roadmap-step-line">
                    <span style={{ color: 'var(--accent-amber-bright)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Week 3–5:</span>
                    <span>BMS Inverter Interfacing & Safety Protocols (NPTEL)</span>
                  </div>
                  <div className="roadmap-step-line">
                    <span style={{ color: 'var(--accent-amber-bright)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Week 6–8:</span>
                    <span>Workshop Fault Codes & Local Industry Placement</span>
                  </div>
                </div>
              )}

              {activeEngine === 'ats' && (
                <div>
                  <div className="preview-tape-row a">
                    <strong>Extracted Skills:</strong> PLC G-Code, Fanuc Controls, Calipers, ISO 9001
                  </div>
                  <div className="preview-tape-row q">
                    <strong>Readability Score:</strong> 96% Match for Automotive Tool Room Operators
                  </div>
                </div>
              )}

              {activeEngine === 'mentor' && (
                <div>
                  <div className="preview-tape-row q">
                    <strong>User:</strong> "PMKVY certificate ke baad apprenticeship kaise apply karein?"
                  </div>
                  <div className="preview-tape-row a">
                    <strong>Mentor:</strong> "Apprenticeship India portal par NAPS registration karein aur regional MSME cluster me direct verification select karein."
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3: STAKEHOLDERS */}
      <section className="stakeholders-section" id="stakeholders">
        <div className="container-tight">
          <span className="section-kicker">User Roles</span>
          <h2 className="section-title">WHO CAN USE SANKALP</h2>
          <p className="section-desc">
            Direct functional workflows for candidates, employers, and vocational institutions.
          </p>

          <div className="stakeholder-cards">
            <div className="stakeholder-card">
              <div>
                <h4 className="stakeholder-name">Jobseekers & Trade Technicians</h4>
                <p className="stakeholder-desc">
                  Conversational skill assessments, wage projection simulator, and free government curriculum tracks.
                </p>
              </div>
              <a href="/signup" className="stakeholder-action-link">
                <span>Start Assessment</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="stakeholder-card">
              <div>
                <h4 className="stakeholder-name">SME & Industrial Employers</h4>
                <p className="stakeholder-desc">
                  Filter pre-screened candidates by verified trade competencies with zero recruitment fees.
                </p>
              </div>
              <a href="/onboarding/employer" className="stakeholder-action-link">
                <span>Hire Talent</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="stakeholder-card">
              <div>
                <h4 className="stakeholder-name">Vocational NGOs & Institutions</h4>
                <p className="stakeholder-desc">
                  Cohort progression tracking, automated placement logs, and exportable CSR skill audit reports.
                </p>
              </div>
              <a href="/onboarding/ngo" className="stakeholder-action-link">
                <span>Cohort Tools</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE FOOTER */}
      <footer className="footer-clean">
        <div className="container-tight">
          <div className="footer-top-row">
            <div className="footer-brand">
              SANKALP<span style={{ color: 'var(--accent-saffron)' }}>.</span>
            </div>

            <nav className="footer-nav">
              <a href="#simulator">Simulator</a>
              <a href="#features">Engines</a>
              <a href="#stakeholders">Access</a>
              <a href="/login">Sign In</a>
            </nav>
          </div>
        </div>

        {/* Signature Interactive Lettermark */}
        <div className="giant-letters-box">
          <p className="letters-tagline">RESOLVE · PURPOSE · ACTION</p>

          <h2 className="giant-letters" aria-label="SANKALP">
            {letters.map((char, i) => {
              const isHovered = hoveredLetter === i;
              const isNeighbor = hoveredLetter !== null && Math.abs(hoveredLetter - i) === 1;
              const offset = isHovered ? -10 : isNeighbor ? -5 : 0;
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

          <div className="bottom-line-rule">
            <div className="copyright-text">
              © 2026 SANKALP · Open Vocational Intelligence Toolkit · DPDP Act 2023 Compliant
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

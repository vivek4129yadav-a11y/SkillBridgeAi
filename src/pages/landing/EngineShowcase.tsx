import React, { useState } from 'react';
import { 
  Bot, 
  Layers, 
  Map, 
  FileCheck2, 
  Languages, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { EngineTab } from './types';

const ENGINES: EngineTab[] = [
  {
    id: 'assessment',
    title: 'Adaptive Scanner',
    subtitle: 'Conversational practical test without written exams',
    tag: 'Engine 01',
    description: 'Evaluates hands-on troubleshooting and trade knowledge in 5 minutes via natural chat.'
  },
  {
    id: 'gap',
    title: 'Gap Matrix',
    subtitle: 'Compares your profile to active district jobs',
    tag: 'Engine 02',
    description: 'Pinpoints the exact 2 to 3 missing competencies that unlock the next wage bracket.'
  },
  {
    id: 'roadmap',
    title: '8-Week Roadmap',
    subtitle: 'Curated zero-cost study schedule',
    tag: 'Engine 03',
    description: 'Sequenced daily micro-lessons referencing free SWAYAM, NPTEL, and PMKVY modules.'
  },
  {
    id: 'resume',
    title: 'ATS Diagnostic',
    subtitle: 'CV keyword and format audit',
    tag: 'Engine 04',
    description: 'Extracts practical skills from resumes and optimizes for enterprise HR screening.'
  },
  {
    id: 'bilingual',
    title: 'Bilingual Mentor',
    subtitle: '24x7 guidance in Hindi and English',
    tag: 'Engine 05',
    description: 'Direct answers for career, course, and wage dilemmas in simple conversational language.'
  }
];

export const EngineShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('assessment');
  const active = ENGINES.find(e => e.id === activeId) || ENGINES[0];

  return (
    <section className="engine-showcase-section" id="engines">
      <div className="section-container">
        
        <div className="section-header-centered animate-on-scroll">
          <span className="section-tag-saffron">CORE ARCHITECTURE</span>
          <h2 className="section-main-title">
            5 ENGINES. ONE PLATFORM.
          </h2>
          <p className="section-description">
            Functional modules built to diagnose, upskill, and place Indian workers.
          </p>
        </div>

        <div className="engine-tab-nav animate-on-scroll">
          {ENGINES.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActiveId(e.id)}
              className={`engine-tab-btn ${e.id === activeId ? 'active' : ''}`}
            >
              {e.id === 'assessment' && <Bot className="w-3.5 h-3.5" />}
              {e.id === 'gap' && <Layers className="w-3.5 h-3.5" />}
              {e.id === 'roadmap' && <Map className="w-3.5 h-3.5" />}
              {e.id === 'resume' && <FileCheck2 className="w-3.5 h-3.5" />}
              {e.id === 'bilingual' && <Languages className="w-3.5 h-3.5" />}
              <span>{e.title}</span>
            </button>
          ))}
        </div>

        <div className="engine-content-card animate-on-scroll">
          <div className="engine-card-grid">
            
            <div className="engine-info-side">
              <span className="engine-badge-tag">{active.tag}</span>
              <h3 className="engine-card-title">{active.title}</h3>
              <p className="engine-card-body">{active.description}</p>

              <div className="engine-features-list">
                {activeId === 'assessment' && (
                  <>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>5-Phase adaptive probing engine</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Natural text or voice input</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>1–5 Star proficiency matrix score</span>
                    </div>
                  </>
                )}

                {activeId === 'gap' && (
                  <>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Live vacancy tracking across 75+ districts</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Identifies exact skill blockers</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Computes target wage delta</span>
                    </div>
                  </>
                )}

                {activeId === 'roadmap' && (
                  <>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Structured daily 45-min micro-learning</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>SWAYAM, NPTEL, and PMKVY sources</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Milestone certifications</span>
                    </div>
                  </>
                )}

                {activeId === 'resume' && (
                  <>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Instant ATS readability diagnostic</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Automatic trade keyword extraction</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>One-page verified candidate profile</span>
                    </div>
                  </>
                )}

                {activeId === 'bilingual' && (
                  <>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Bilingual prompt processing</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Tailored for 10th pass to graduates</span>
                    </div>
                    <div className="engine-feature-row">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Mock interview preparation</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="engine-visual-side">
              {activeId === 'assessment' && (
                <div className="preview-terminal-box">
                  <div className="terminal-top-bar">
                    <span className="term-dot" />
                    <span className="term-dot" />
                    <span className="term-dot" />
                    <span className="term-title">Adaptive Probing Engine</span>
                  </div>
                  <div className="terminal-chat-area">
                    <div className="chat-bubble ai">
                      <span className="chat-author text-saffron">AI Question</span>
                      <p>
                        "Inverter trips with overload code E-04 on battery mode. What are the first 
                        two points you inspect with your clamp meter?"
                      </p>
                    </div>
                    <div className="chat-bubble user">
                      <span className="chat-author text-teal-400">Candidate Answer</span>
                      <p>
                        "Check earthing resistance and measure DC current draw at battery terminals 
                        under partial load."
                      </p>
                    </div>
                    <div className="chat-evaluation-card">
                      <div className="eval-badge">Skill Extraction</div>
                      <div className="eval-row">
                        <span>Solar & Inverter Diagnostics</span>
                        <span className="text-teal-400 font-mono font-bold">4.4 / 5.0</span>
                      </div>
                      <div className="eval-row">
                        <span>Electrical Safety Protocol</span>
                        <span className="text-teal-400 font-mono font-bold">4.1 / 5.0</span>
                      </div>
                      <div className="eval-note">Verified practical competence</div>
                    </div>
                  </div>
                </div>
              )}

              {activeId === 'gap' && (
                <div className="preview-terminal-box">
                  <div className="terminal-top-bar">
                    <span className="term-title">Market Match: Lucknow Cluster</span>
                  </div>
                  <div className="matrix-preview-content">
                    <div className="matrix-metric-header">
                      <div>
                        <span className="matrix-sub">Match Index</span>
                        <div className="matrix-score-big text-saffron">64%</div>
                      </div>
                      <div className="text-right">
                        <span className="matrix-sub">Wage Ceiling</span>
                        <div className="matrix-score-big text-teal-400">₹28,000 / mo</div>
                      </div>
                    </div>

                    <div className="matrix-bars-container">
                      <div className="skill-meter-block">
                        <div className="meter-label-row">
                          <span>Domestic Wiring & AC</span>
                          <span className="text-teal-400">92%</span>
                        </div>
                        <div className="meter-track">
                          <div className="meter-fill bg-teal-500" style={{ width: '92%' }}></div>
                        </div>
                      </div>

                      <div className="skill-meter-block">
                        <div className="meter-label-row">
                          <span>Industrial Panels</span>
                          <span className="text-teal-400">76%</span>
                        </div>
                        <div className="meter-track">
                          <div className="meter-fill bg-teal-500" style={{ width: '76%' }}></div>
                        </div>
                      </div>

                      <div className="skill-meter-block">
                        <div className="meter-label-row">
                          <span className="text-saffron">EV Battery Diagnostic (GAP)</span>
                          <span className="text-saffron">25%</span>
                        </div>
                        <div className="meter-track">
                          <div className="meter-fill bg-amber-600" style={{ width: '25%' }}></div>
                        </div>
                        <p className="gap-explanation">
                          Target gap: 180+ active vacancies require this module.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeId === 'roadmap' && (
                <div className="preview-terminal-box">
                  <div className="terminal-top-bar">
                    <span className="term-title">Roadmap Schedule</span>
                  </div>
                  <div className="roadmap-preview-content">
                    <div className="roadmap-step-card active">
                      <div className="roadmap-step-badge">W 1–2</div>
                      <div>
                        <h5 className="roadmap-step-title">EV Architecture & BMS Basics</h5>
                        <p className="roadmap-step-desc">SWAYAM / IIT Madras · Free Certificate</p>
                      </div>
                    </div>

                    <div className="roadmap-step-card">
                      <div className="roadmap-step-badge">W 3–5</div>
                      <div>
                        <h5 className="roadmap-step-title">High-Voltage Battery Safety</h5>
                        <p className="roadmap-step-desc">NPTEL Vocational Track</p>
                      </div>
                    </div>

                    <div className="roadmap-step-card">
                      <div className="roadmap-step-badge">W 6–8</div>
                      <div>
                        <h5 className="roadmap-step-title">Diagnostic Practical & Job Matching</h5>
                        <p className="roadmap-step-desc">Direct placement referral</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeId === 'resume' && (
                <div className="preview-terminal-box">
                  <div className="terminal-top-bar">
                    <span className="term-title">ATS Score Comparison</span>
                  </div>
                  <div className="resume-split-view">
                    <div className="resume-side before">
                      <div className="resume-score-header">
                        <span className="resume-badge-score bad">42</span>
                        <span className="resume-label-small">Plain CV</span>
                      </div>
                      <ul className="resume-issues-list">
                        <li><AlertCircle className="w-3 h-3 text-red-400 inline mr-1" /> Missing trade keywords</li>
                        <li><AlertCircle className="w-3 h-3 text-red-400 inline mr-1" /> Filtered by ATS parser</li>
                      </ul>
                    </div>

                    <div className="resume-side after">
                      <div className="resume-score-header">
                        <span className="resume-badge-score good">94</span>
                        <span className="resume-label-small">SANKALP Profile</span>
                      </div>
                      <ul className="resume-issues-list">
                        <li><CheckCircle2 className="w-3 h-3 text-teal-400 inline mr-1" /> Standard skill ontology</li>
                        <li><CheckCircle2 className="w-3 h-3 text-teal-400 inline mr-1" /> Verified scores attached</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeId === 'bilingual' && (
                <div className="preview-terminal-box">
                  <div className="terminal-top-bar">
                    <span className="term-title">Mentor Prompting</span>
                  </div>
                  <div className="terminal-chat-area">
                    <div className="chat-bubble user">
                      <span className="chat-author text-teal-400">Priya (Bhopal)</span>
                      <p>"B.Com pass kiya hai. ₹20,000+ accounts job ke liye kya zaroori hai?"</p>
                    </div>
                    <div className="chat-bubble ai">
                      <span className="chat-author text-saffron">AI Response</span>
                      <p>
                        "Bhopal me Tally Prime aur GST E-Way Bill aane par ₹22,000+ offer hai. 
                        SWAYAM ka free Accounting module complete karein."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default EngineShowcase;

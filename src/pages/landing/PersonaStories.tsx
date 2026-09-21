import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wrench, GraduationCap, Users, FileText } from 'lucide-react';
import { PersonaStory } from './types';

const STORIES: PersonaStory[] = [
  {
    id: 1,
    name: 'Ravi Verma',
    age: 28,
    city: 'Lucknow, UP',
    role: 'EV Technician',
    beforeStatus: 'Informal house electrician',
    beforeSalary: '₹12k / mo',
    afterStatus: 'Certified Commercial EV Tech',
    afterSalary: '₹26k / mo',
    timeframe: '6 Weeks',
    story: 'Mapped domestic electrical knowledge via voice, added commercial battery diagnostics, and certified via PMKVY.',
    roadmapSummary: [
      'Verified DC circuitry & earthing fundamentals',
      'Completed free SWAYAM Li-ion safety course',
      'Practiced EV diagnostic codes at local workshop'
    ],
    tag: 'Technical'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    age: 22,
    city: 'Bhopal, MP',
    role: 'Accounts Executive',
    beforeStatus: 'B.Com fresher',
    beforeSalary: 'Unemployed',
    afterStatus: 'Accounts Exec at logistics firm',
    afterSalary: '₹22k / mo',
    timeframe: '7 Weeks',
    story: 'Diagnosed lack of practical Tally Prime and GST filing experience; followed a structured micro-curriculum.',
    roadmapSummary: [
      'Practical GST return filing modules',
      'Reconciliation on Tally Prime with sample bills',
      'Verified score produced 4 local interview calls'
    ],
    tag: 'Graduate'
  },
  {
    id: 3,
    name: 'Shalini Kamble',
    age: 34,
    city: 'Pune, MH',
    role: 'Digital Artisan',
    beforeStatus: 'Independent tailor',
    beforeSalary: '₹7.5k / mo',
    afterStatus: 'Direct seller on ONDC & e-Shram',
    afterSalary: '₹24k / mo',
    timeframe: '5 Weeks',
    story: 'Guided through digital payments, catalog listing, and e-Shram social security benefits without middlemen.',
    roadmapSummary: [
      'Registered e-Shram identity & digital banking',
      'Catalog creation with mobile phone camera',
      'Direct order fulfillment via regional logistics'
    ],
    tag: 'Informal'
  },
  {
    id: 4,
    name: 'Ashok Natarajan',
    age: 44,
    city: 'Chennai, TN',
    role: 'NGO Director',
    beforeStatus: 'Manual spreadsheet tracking',
    beforeSalary: 'High tracking overhead',
    afterStatus: 'Automated cohort dashboard',
    afterSalary: '92% Verified Placement',
    timeframe: 'Ongoing',
    story: 'Coordinates 250+ trainees per batch with verifiable placement records and automated CSR audit reports.',
    roadmapSummary: [
      'Automated regional pre-assessment test',
      'Weekly progress logs across vocational trades',
      'Single-click export for CSR compliance'
    ],
    tag: 'NGO'
  }
];

export const PersonaStories: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const navigate = useNavigate();
  const active = STORIES.find(s => s.id === activeId) || STORIES[0];

  return (
    <section className="persona-stories-section" id="stories">
      <div className="section-container">
        
        <div className="section-header-centered animate-on-scroll">
          <span className="section-tag-saffron">VERIFIED PATHWAYS</span>
          <h2 className="section-main-title">
            REAL BHARAT PROGRESSION
          </h2>
          <p className="section-description">
            Transparent case studies of workers moving into skilled wage tiers.
          </p>
        </div>

        <div className="persona-nav-tabs animate-on-scroll">
          {STORIES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`persona-nav-btn ${s.id === activeId ? 'active' : ''}`}
            >
              {s.id === 1 && <Wrench className="w-3.5 h-3.5" />}
              {s.id === 2 && <GraduationCap className="w-3.5 h-3.5" />}
              {s.id === 3 && <Users className="w-3.5 h-3.5" />}
              {s.id === 4 && <FileText className="w-3.5 h-3.5" />}
              <span>{s.name.split(' ')[0]} ({s.city.split(',')[0]})</span>
            </button>
          ))}
        </div>

        <div className="persona-journey-card animate-on-scroll">
          <div className="persona-card-grid">
            
            <div className="persona-profile-col">
              <div className="persona-header-row">
                <span className="persona-tag">{active.tag}</span>
                <span className="persona-location">{active.city}</span>
              </div>

              <h3 className="persona-full-name">{active.name}, {active.age}</h3>
              <p className="persona-current-role">{active.role}</p>

              <div className="transformation-meter-box">
                <div>
                  <span className="trans-label">Baseline</span>
                  <div className="trans-salary text-gray-400">{active.beforeSalary}</div>
                  <span className="trans-status">{active.beforeStatus}</span>
                </div>

                <div className="trans-arrow-badge">
                  → {active.timeframe}
                </div>

                <div>
                  <span className="trans-label">Target</span>
                  <div className="trans-salary text-teal-400">{active.afterSalary}</div>
                  <span className="trans-status text-white">{active.afterStatus}</span>
                </div>
              </div>

              <p className="persona-narrative">{active.story}</p>
            </div>

            <div className="persona-roadmap-col">
              <div className="roadmap-col-header">
                <h4 className="roadmap-col-title">Execution Steps:</h4>
              </div>

              <div className="roadmap-timeline-steps">
                {active.roadmapSummary.map((step, idx) => (
                  <div key={idx} className="roadmap-milestone-item">
                    <span className="milestone-bullet">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="persona-action-btn"
              >
                <span>Generate Custom Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PersonaStories;

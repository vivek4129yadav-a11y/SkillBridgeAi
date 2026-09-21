import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Calculator, Laptop, Cpu, HeartHandshake } from 'lucide-react';
import { CareerSimulatorProfile } from './types';

const PROFILES: CareerSimulatorProfile[] = [
  {
    id: 'electrician',
    roleTitle: 'Electrician',
    category: 'Vocational',
    location: 'Lucknow Cluster',
    currentSalary: '₹13,000 / mo',
    targetSalary: '₹28,000 / mo',
    salaryJumpPercent: 115,
    timeToLearn: '6 Weeks',
    openJobsCount: 420,
    keySkillsNeeded: ['Commercial EV Wiring', 'Inverter Diagnostics'],
    topFreeCourse: 'PMKVY EV Technician Certificate',
    iconName: 'zap'
  },
  {
    id: 'bcom',
    roleTitle: 'B.Com Fresher',
    category: 'Finance',
    location: 'Bhopal Cluster',
    currentSalary: '₹12,000 / mo',
    targetSalary: '₹26,000 / mo',
    salaryJumpPercent: 116,
    timeToLearn: '7 Weeks',
    openJobsCount: 560,
    keySkillsNeeded: ['Tally Prime & E-Way Bills', 'GST Portal Filing'],
    topFreeCourse: 'SWAYAM Practical GST Accounting',
    iconName: 'calculator'
  },
  {
    id: 'tech',
    roleTitle: 'Coder / Operator',
    category: 'Technology',
    location: 'Jaipur Cluster',
    currentSalary: '₹16,000 / mo',
    targetSalary: '₹38,000 / mo',
    salaryJumpPercent: 137,
    timeToLearn: '8 Weeks',
    openJobsCount: 680,
    keySkillsNeeded: ['React & Tailwind', 'REST API Integration'],
    topFreeCourse: 'NPTEL Web Development Track',
    iconName: 'laptop'
  },
  {
    id: 'manufacturing',
    roleTitle: 'CNC Operator',
    category: 'Industrial',
    location: 'Pune Auto Belt',
    currentSalary: '₹15,000 / mo',
    targetSalary: '₹32,000 / mo',
    salaryJumpPercent: 113,
    timeToLearn: '6 Weeks',
    openJobsCount: 390,
    keySkillsNeeded: ['PLC Programming', 'ISO Quality Check'],
    topFreeCourse: 'MSME Tool Room Automation',
    iconName: 'cpu'
  },
  {
    id: 'healthcare',
    roleTitle: 'Hospital Assistant',
    category: 'Healthcare',
    location: 'Nagpur Cluster',
    currentSalary: '₹11,500 / mo',
    targetSalary: '₹24,000 / mo',
    salaryJumpPercent: 108,
    timeToLearn: '5 Weeks',
    openJobsCount: 310,
    keySkillsNeeded: ['Emergency Triage', 'ECG Operation'],
    topFreeCourse: 'Skill India Healthcare Module',
    iconName: 'heart'
  }
];

export const HeroCareerSimulator: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>('electrician');

  const active = PROFILES.find(p => p.id === selectedId) || PROFILES[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'zap': return <Zap className="w-3.5 h-3.5" />;
      case 'calculator': return <Calculator className="w-3.5 h-3.5" />;
      case 'laptop': return <Laptop className="w-3.5 h-3.5" />;
      case 'cpu': return <Cpu className="w-3.5 h-3.5" />;
      default: return <HeartHandshake className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-pill-badge animate-on-scroll">
        <span className="pill-text">Open Career Intelligence for Bharat</span>
      </div>

      <h1 className="hero-headline animate-on-scroll">
        TURN WHAT YOU KNOW <br />
        <span className="hero-highlight">INTO WHAT YOU'RE WORTH.</span>
      </h1>

      <p className="hero-subheading animate-on-scroll">
        Test your actual trade skills, uncover missing high-demand gaps in your district, 
        and follow a free weekly learning roadmap.
      </p>

      <div className="simulator-container animate-on-scroll">
        <div className="simulator-header">
          <span className="sim-badge">Career Velocity Simulator</span>
          <span className="sim-region-tag">{active.location}</span>
        </div>

        <div className="trade-selector-bar">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={`trade-btn ${p.id === selectedId ? 'active' : ''}`}
            >
              {getIcon(p.iconName)}
              <span>{p.roleTitle}</span>
            </button>
          ))}
        </div>

        <div className="simulator-card">
          <div className="sim-grid">
            <div className="sim-left-panel">
              <div className="role-meta">
                <span className="role-category-tag">{active.category}</span>
                <h3 className="role-main-title">{active.roleTitle}</h3>
                <span className="role-location">{active.location}</span>
              </div>

              <div className="salary-box">
                <div className="salary-col">
                  <span className="salary-label">Current</span>
                  <span className="salary-amount current">{active.currentSalary}</span>
                </div>

                <div className="salary-arrow">
                  <span className="jump-badge">+{active.salaryJumpPercent}%</span>
                </div>

                <div className="salary-col">
                  <span className="salary-label">Skilled Target</span>
                  <span className="salary-amount target">{active.targetSalary}</span>
                </div>
              </div>

              <div className="sim-quick-stats">
                <div className="stat-pill">
                  Time: <strong>{active.timeToLearn}</strong>
                </div>
                <div className="stat-pill">
                  Openings: <strong>{active.openJobsCount}+ roles</strong>
                </div>
              </div>
            </div>

            <div className="sim-right-panel">
              <div className="panel-subhead">
                <span>Key Missing Skills</span>
                <span>Free Track</span>
              </div>

              <div className="skills-gap-list">
                {active.keySkillsNeeded.map((skill, idx) => (
                  <div key={idx} className="skill-gap-item">
                    <span className="skill-name">{skill}</span>
                    <span className="skill-priority">High Demand</span>
                  </div>
                ))}
              </div>

              <div className="course-recommendation-box">
                <span className="course-box-label">Verified Free Course</span>
                <p className="course-box-title">{active.topFreeCourse}</p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="sim-cta-btn"
              >
                <span>Run Skill Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCareerSimulator;

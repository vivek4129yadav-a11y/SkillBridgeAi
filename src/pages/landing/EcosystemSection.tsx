import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, HeartHandshake, Landmark, ArrowRight } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const navigate = useNavigate();

  const stakeholders = [
    {
      title: 'Youth & Workers',
      subtitle: 'Career Navigation',
      icon: <GraduationCap className="w-5 h-5 text-saffron" />,
      benefits: [
        '5-Minute adaptive trade assessment',
        'Structured roadmaps with free SWAYAM courses',
        'Direct connection to local vacancies'
      ],
      action: 'Start Assessment',
      path: '/signup'
    },
    {
      title: 'Workshop & SME Employers',
      subtitle: 'Talent Sourcing',
      icon: <Briefcase className="w-5 h-5 text-teal-400" />,
      benefits: [
        'View practical skill scores before interviewing',
        'Zero agency fees or middleman commissions',
        'District-level candidate filtering'
      ],
      action: 'Find Talent',
      path: '/onboarding/employer'
    },
    {
      title: 'Vocational NGOs',
      subtitle: 'Batch Analytics',
      icon: <HeartHandshake className="w-5 h-5 text-saffron" />,
      benefits: [
        'Track student attendance and skill growth',
        'Automated placement verification logs',
        'Exportable reports for CSR compliance'
      ],
      action: 'Register NGO',
      path: '/onboarding/ngo'
    },
    {
      title: 'District Administration',
      subtitle: 'Workforce Planning',
      icon: <Landmark className="w-5 h-5 text-teal-400" />,
      benefits: [
        'District heatmaps of trade shortages',
        'Evidence-backed PMKVY batch allocation',
        'Monitor local wage trends in real time'
      ],
      action: 'Access Data',
      path: '/onboarding/government'
    }
  ];

  return (
    <section className="ecosystem-section-enhanced" id="ecosystem">
      <div className="section-container">
        
        <div className="section-header-centered animate-on-scroll">
          <span className="section-tag-saffron">SYSTEM INTEGRATION</span>
          <h2 className="section-main-title">
            BUILT FOR ALL STAKEHOLDERS
          </h2>
          <p className="section-description">
            Connecting candidates, workshops, NGOs, and district administration into one framework.
          </p>
        </div>

        <div className="ecosystem-cards-grid">
          {stakeholders.map((s, idx) => (
            <div key={idx} className="eco-feature-card animate-on-scroll">
              <div className="eco-header-box">
                {s.icon}
                <div>
                  <h3 className="eco-title-text">{s.title}</h3>
                  <span className="eco-subtitle-text">{s.subtitle}</span>
                </div>
              </div>

              <ul className="eco-points-list">
                {s.benefits.map((b, bIdx) => (
                  <li key={bIdx} className="eco-point-item">
                    <span>—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => navigate(s.path)}
                className="eco-action-btn"
              >
                <span>{s.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;

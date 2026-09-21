import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Wrench, Building2, Landmark } from 'lucide-react';

interface PathOption {
  id: string;
  label: string;
  tag: string;
  icon: React.ReactNode;
  heading: string;
  description: string;
  actionText: string;
  targetUrl: string;
}

const PATH_OPTIONS: PathOption[] = [
  {
    id: 'student',
    label: 'Fresher / Graduate',
    tag: 'Seeking first role',
    icon: <User className="w-4 h-4 text-saffron" />,
    heading: 'Bridge Academic Degree to Industry Demand',
    description: 'Pinpoints 2 missing tools (GST, Excel, Python) and generates a free study schedule.',
    actionText: 'Start Assessment',
    targetUrl: '/signup'
  },
  {
    id: 'worker',
    label: 'Vocational Worker',
    tag: 'Technician, mechanic, electrician',
    icon: <Wrench className="w-4 h-4 text-teal-400" />,
    heading: 'Document Practical Hands-on Competence',
    description: '5-minute conversational diagnostic to benchmark trade proficiency and view local openings.',
    actionText: 'Test Trade Skills',
    targetUrl: '/signup'
  },
  {
    id: 'employer',
    label: 'Workshop / SME',
    tag: 'Sourcing workers',
    icon: <Building2 className="w-4 h-4 text-saffron" />,
    heading: 'Direct Access to Pre-Screened Local Talent',
    description: 'Filter verified trade profiles in your industrial cluster without recruitment fees.',
    actionText: 'Post Job Listing',
    targetUrl: '/onboarding/employer'
  },
  {
    id: 'institution',
    label: 'NGO / Administration',
    tag: 'Cohort coordination',
    icon: <Landmark className="w-4 h-4 text-teal-400" />,
    heading: 'Deploy Assessment Across Training Batches',
    description: 'Real-time completion dashboards, attendance tracking, and exportable audit logs.',
    actionText: 'Access Dashboard',
    targetUrl: '/onboarding/ngo'
  }
];

export const QuickPathFinder: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('student');
  const navigate = useNavigate();

  const active = PATH_OPTIONS.find(p => p.id === selectedId) || PATH_OPTIONS[0];

  return (
    <section className="pathfinder-section" id="pathfinder">
      <div className="section-container">
        
        <div className="section-header-centered animate-on-scroll">
          <span className="section-tag-saffron">DIRECT ONBOARDING</span>
          <h2 className="section-main-title">
            CHOOSE YOUR ENTRY POINT
          </h2>
          <p className="section-description">
            Select your profile to launch the tailored workflow.
          </p>
        </div>

        <div className="path-selector-grid animate-on-scroll">
          {PATH_OPTIONS.map((path) => (
            <button
              key={path.id}
              type="button"
              onClick={() => setSelectedId(path.id)}
              className={`path-select-card ${path.id === selectedId ? 'active' : ''}`}
            >
              <div>{path.icon}</div>
              <div className="path-select-title">{path.label}</div>
              <div className="path-select-sub">{path.tag}</div>
            </button>
          ))}
        </div>

        <div className="path-result-box animate-on-scroll">
          <div>
            <h3 className="result-heading">{active.heading}</h3>
            <p className="result-description">{active.description}</p>
          </div>

          <button
            type="button"
            onClick={() => navigate(active.targetUrl)}
            className="result-cta-btn"
          >
            <span>{active.actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default QuickPathFinder;

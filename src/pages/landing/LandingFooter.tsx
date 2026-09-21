import React, { useState } from 'react';

export const LandingFooter: React.FC = () => {
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const letters = 'SANKALP'.split('');

  return (
    <footer className="footer-enhanced" id="footer">
      <div className="footer-top-grid">
        <div>
          <div className="brand-sankalp">
            SANKALP<span className="brand-sub">SkillBridge</span>
          </div>
          <p className="footer-mission-statement">
            Open-source skill diagnostic and career roadmap architecture for Indian workers.
          </p>
          <span className="compliance-pill">DPDP Act 2023 Compliant</span>
        </div>

        <div>
          <h5 className="footer-heading">Platform</h5>
          <ul className="footer-link-list">
            <li><a href="#hero">Simulator</a></li>
            <li><a href="#engines">5 Engines</a></li>
            <li><a href="#stories">Case Studies</a></li>
            <li><a href="#insights">Data Matrix</a></li>
          </ul>
        </div>

        <div>
          <h5 className="footer-heading">Portals</h5>
          <ul className="footer-link-list">
            <li><a href="/signup">Candidate</a></li>
            <li><a href="/onboarding/employer">Employer</a></li>
            <li><a href="/onboarding/ngo">Vocational NGO</a></li>
            <li><a href="/onboarding/government">District Admin</a></li>
          </ul>
        </div>

        <div>
          <h5 className="footer-heading">Open Standards</h5>
          <p className="footer-small-text">
            Curriculums mapped from SWAYAM, NPTEL, Skill India, and NSDC frameworks.
          </p>
        </div>
      </div>

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
            © 2026 SANKALP · Open Career Intelligence for Bharat
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

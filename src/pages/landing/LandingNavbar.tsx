import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`landing-navbar-enhanced ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner-container">
        <a href="/" className="nav-brand-logo">
          <span className="brand-primary">SANKALP</span>
          <span className="brand-dot">.</span>
          <span className="brand-secondary">SkillBridge</span>
        </a>

        <div className="nav-center-links">
          <a href="#hero" className="nav-anchor-link">Simulator</a>
          <a href="#engines" className="nav-anchor-link">5 Engines</a>
          <a href="#stories" className="nav-anchor-link">Case Studies</a>
          <a href="#insights" className="nav-anchor-link">Data</a>
          <a href="#ecosystem" className="nav-anchor-link">Stakeholders</a>
        </div>

        <div className="nav-actions-group">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="nav-login-btn"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="nav-cta-btn"
          >
            <span>Launch Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Simulator</a>
          <a href="#engines" onClick={() => setMobileMenuOpen(false)} className="mobile-link">5 Engines</a>
          <a href="#stories" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Case Studies</a>
          <a href="#insights" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Data</a>
          <a href="#ecosystem" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Stakeholders</a>
          <div className="mobile-actions">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
              className="mobile-login-btn"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}
              className="mobile-cta-btn"
            >
              Launch Tool
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;

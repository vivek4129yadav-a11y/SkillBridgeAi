import React, { useEffect } from 'react';
import LandingNavbar from './landing/LandingNavbar';
import HeroCareerSimulator from './landing/HeroCareerSimulator';
import DataInsights from './landing/DataInsights';
import EngineShowcase from './landing/EngineShowcase';
import PersonaStories from './landing/PersonaStories';
import EcosystemSection from './landing/EcosystemSection';
import QuickPathFinder from './landing/QuickPathFinder';
import LandingFooter from './landing/LandingFooter';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = "SANKALP · Open Career Intelligence";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page-root">
      <LandingNavbar />
      <HeroCareerSimulator />
      <DataInsights />
      <EngineShowcase />
      <PersonaStories />
      <EcosystemSection />
      <QuickPathFinder />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;

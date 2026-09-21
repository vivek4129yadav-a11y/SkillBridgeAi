import React from 'react';
import { TrustFact } from './types';

const FACTS: TrustFact[] = [
  {
    metric: '12M+',
    label: 'Annual Workforce Inflow',
    source: 'NITI Aayog',
    detail: 'Youth enter the job market each year with minimal structured guidance.'
  },
  {
    metric: '+42%',
    label: 'Average Wage Uplift',
    source: 'NSDC Report',
    detail: 'Achieved when closing 2 targeted vocational skill gaps.'
  },
  {
    metric: '10,000+',
    label: 'Free Curated Modules',
    source: 'SWAYAM / NPTEL',
    detail: 'Govt-funded courses indexed and matched to regional jobs.'
  },
  {
    metric: '2.4x',
    label: 'Interview Rate',
    source: 'World Bank Study',
    detail: 'For candidates presenting verified practical skill scores over paper marks.'
  }
];

export const DataInsights: React.FC = () => {
  return (
    <section className="data-insights-section" id="insights">
      <div className="section-container">
        <div className="section-header-centered animate-on-scroll">
          <span className="section-tag-saffron">GROUNDED IN BHARAT DATA</span>
          <h2 className="section-main-title">
            THE LABOUR MARKET DELTA
          </h2>
          <p className="section-description">
            Hard work is rarely the bottleneck. Missing specific localized skills is.
          </p>
        </div>

        <div className="facts-grid">
          {FACTS.map((fact, index) => (
            <div key={index} className="fact-card animate-on-scroll">
              <div className="fact-number">{fact.metric}</div>
              <h4 className="fact-label">{fact.label}</h4>
              <p className="fact-detail">{fact.detail}</p>
              <div className="fact-source">Source: {fact.source}</div>
            </div>
          ))}
        </div>

        <div className="vision-quote-card animate-on-scroll">
          <p className="vision-quote-text">
            "Degrees show where you sat in a classroom. SANKALP proves what you can build, fix, code, and operate."
          </p>
          <div className="quote-byline">— SANKALP Project Manifesto</div>
        </div>
      </div>
    </section>
  );
};

export default DataInsights;

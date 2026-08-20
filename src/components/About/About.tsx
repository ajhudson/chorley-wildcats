import React from 'react';
import type { AboutProps } from './About.types';
import { Sparkles, Trophy, Users, Shield } from 'lucide-react';
import logoTransparent from '../../assets/wildcats-logo-transparent.svg';

export const About: React.FC<AboutProps> = ({
  name,
  tagline,
  mission,
  aboutText,
  stats,
}) => {
  // Map icons to stat entries dynamically or just statically render based on standard indices
  const getStatIcon = (index: number) => {
    switch (index) {
      case 0: return <Users className="stat-card-icon" aria-hidden="true" />;
      case 1: return <Shield className="stat-card-icon" aria-hidden="true" />;
      case 2: return <Sparkles className="stat-card-icon" aria-hidden="true" />;
      case 3: return <Trophy className="stat-card-icon" aria-hidden="true" />;
      default: return <Trophy className="stat-card-icon" aria-hidden="true" />;
    }
  };

  return (
    <article className="about-section" aria-labelledby="about-heading">
      <header className="about-hero">
        <img id="about-heading" src={logoTransparent} alt={name} className="logo-svg about-logo" />
        <p className="about-tagline">{tagline}</p>
      </header>

      <div className="about-grid">
        <section className="about-card main-about-card" aria-labelledby="story-heading">
          <h2 id="story-heading" className="section-subtitle">Our Story</h2>
          <p className="about-body-text">{aboutText}</p>
        </section>

        <section className="about-card mission-card" aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="section-subtitle">Our Mission</h2>
          <blockquote className="mission-quote">
            <p>"{mission}"</p>
          </blockquote>
        </section>
      </div>

      <section className="stats-section" aria-label="Club Statistics">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card" role="group" aria-label={stat.label}>
              <div className="stat-icon-wrapper">
                {getStatIcon(idx)}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default About;

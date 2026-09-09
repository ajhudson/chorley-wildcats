import React from 'react';
import type { LaunchPageProps } from './LaunchPage.types';
import logoTransparent from '../../assets/wildcats-logo-transparent.svg';

export const LaunchPage: React.FC<LaunchPageProps> = ({
  title = "Coming Soon",
  logoAlt = "Chorley Wildcats",
  logoSrc = logoTransparent,
  tagline,
  className = '',
}) => {
  return (
    <main className={`launch-page-container ${className}`.trim()} aria-labelledby="launch-title">
      <header className="about-hero launch-hero">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="logo-svg about-logo launch-logo"
        />
        <h1 id="launch-title" className="about-tagline launch-title">
          {title}
        </h1>
        {tagline && <p className="launch-tagline">{tagline}</p>}
      </header>
    </main>
  );
};

export default LaunchPage;


import { useState } from 'react';
import './App.css';

// Import config and data
import { clubInfo, calendarEvents, donationGoals, galleryItems } from './config/clubData';

// Import logo SVG
import logoDark from './assets/wildcats-logo-dark.svg';

// Import components
import About from './components/About';
import Calendar from './components/Calendar';
import Donations from './components/Donations';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import LaunchPage from './components/LaunchPage';

// Import icons
import {
  Users,
  Calendar as CalendarIcon,
  HeartHandshake,
  Images,
  Mail,
  Flame,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';
import { useFeatureFlagEnabled } from '@posthog/react';
import { useEnvVars } from './hooks/useEnvVars';

type TabType = 'about' | 'calendar' | 'donations' | 'gallery' | 'contact';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const currentMode = useEnvVars('MODE') as string;
  const overrideGuid = useEnvVars('VITE_SITE_LAUNCH_OVERRIDE', '') as string;
  const isSiteLaunched = useFeatureFlagEnabled(`site-launched-${currentMode}`);

  const [isOverrideAuthorized] = useState(() => {
    if (!overrideGuid || typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get('id');
      if (queryId && queryId.trim().toLowerCase() === overrideGuid.trim().toLowerCase()) {
        sessionStorage.setItem('site_launch_override', 'true');
        return true;
      }
      return sessionStorage.getItem('site_launch_override') === 'true';
    } catch {
      return false;
    }
  });

  const isVisible = Boolean(isSiteLaunched || isOverrideAuthorized);

  if (!isVisible) {
    return <LaunchPage />;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <About
            name={clubInfo.name}
            tagline={clubInfo.tagline}
            aboutText={clubInfo.aboutText}
            stats={clubInfo.stats}
          />
        );
      case 'calendar':
        return <Calendar events={calendarEvents} />;
      case 'donations':
        return <Donations goals={donationGoals} />;
      case 'gallery':
        return <Gallery items={galleryItems} />;
      case 'contact':
        return <Contact contactInfo={clubInfo.contact} />;
      default:
        return (
          <About
            name={clubInfo.name}
            tagline={clubInfo.tagline}
            aboutText={clubInfo.aboutText}
            stats={clubInfo.stats}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Red Active Header */}
      <header className="main-header">
        <div className="header-inner">
          {/* Logo with energetic fire/paw style */}
          <div className="logo-section" onClick={() => setActiveTab('about')}>
            <img src={logoDark} alt={clubInfo.name} className="logo-svg" />
          </div>

          {/* Navigation Tabs */}
          <nav className="main-navigation" aria-label="Main Site Navigation">
            <ul className="nav-list">
              <li>
                <button
                  type="button"
                  className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveTab('about')}
                  aria-current={activeTab === 'about' ? 'page' : undefined}
                >
                  <Users size={18} aria-hidden="true" />
                  <span>About</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-btn ${activeTab === 'calendar' ? 'active' : ''}`}
                  onClick={() => setActiveTab('calendar')}
                  aria-current={activeTab === 'calendar' ? 'page' : undefined}
                >
                  <CalendarIcon size={18} aria-hidden="true" />
                  <span>Calendar</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                  aria-current={activeTab === 'gallery' ? 'page' : undefined}
                >
                  <Images size={18} aria-hidden="true" />
                  <span>Gallery</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-btn ${activeTab === 'donations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('donations')}
                  aria-current={activeTab === 'donations' ? 'page' : undefined}
                >
                  <HeartHandshake size={18} aria-hidden="true" />
                  <span>Donations</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-btn ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                  aria-current={activeTab === 'contact' ? 'page' : undefined}
                >
                  <Mail size={18} aria-hidden="true" />
                  <span>Contact</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Pane */}
      <main className="content-pane">
        <div className="content-inner animate-fade-in">
          {renderActiveComponent()}
        </div>
      </main>

      {/* Club Footer */}
      <footer className="main-footer">
        <div className="footer-inner">
          <div className="footer-brand-column">
            <div className="footer-logo">
              <Flame size={24} aria-hidden="true" />
              <span>{clubInfo.name}</span>
            </div>
            <p className="footer-tagline">{clubInfo.tagline}</p>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} {clubInfo.name}. All rights reserved.
            </p>
          </div>

          <div className="footer-info-column" aria-label="Contact Information Summary">
            <h3>Contact</h3>
            <ul className="footer-contact-list">
              <li>
                <Clock size={14} aria-hidden="true" />
                <span>{clubInfo.contact.time}</span>
              </li>
              <li>
                <MapPin size={14} aria-hidden="true" />
                <span>{clubInfo.contact.address}</span>
              </li>
              <li>
                <Phone size={14} aria-hidden="true" />
                <span>{clubInfo.contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

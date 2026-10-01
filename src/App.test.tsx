import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useFeatureFlagEnabled } from '@posthog/react';

vi.mock('@posthog/react', () => ({
  useFeatureFlagEnabled: vi.fn(),
}));

const mockUseFeatureFlagEnabled = vi.mocked(useFeatureFlagEnabled);
const TEST_OVERRIDE_GUID = '5b897400-e26b-4f59-b6d1-6819c3206641';

describe('App site launch and query parameter override', () => {
  beforeEach(() => {
    vi.stubEnv('MODE', 'test');
    vi.stubEnv('VITE_SITE_LAUNCH_OVERRIDE', TEST_OVERRIDE_GUID);
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('renders LaunchPage when site is not launched and no override query param is provided', () => {
    mockUseFeatureFlagEnabled.mockReturnValue(false);

    render(<App />);

    expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: /main site navigation/i })).not.toBeInTheDocument();
  });

  it('renders LaunchPage when site is not launched and invalid override query param is provided', () => {
    mockUseFeatureFlagEnabled.mockReturnValue(false);
    window.history.replaceState({}, '', '/?id=invalid-guid-123');

    render(<App />);

    expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: /main site navigation/i })).not.toBeInTheDocument();
  });

  it('renders main site when site is not launched but valid override query param is provided', () => {
    mockUseFeatureFlagEnabled.mockReturnValue(false);
    window.history.replaceState({}, '', `/?id=${TEST_OVERRIDE_GUID}`);

    render(<App />);

    expect(screen.getByRole('navigation', { name: /main site navigation/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /coming soon/i })).not.toBeInTheDocument();
    expect(sessionStorage.getItem('site_launch_override')).toBe('true');
  });

  it('handles case-insensitive GUID matching in query param', () => {
    mockUseFeatureFlagEnabled.mockReturnValue(false);
    window.history.replaceState({}, '', `/?id=${TEST_OVERRIDE_GUID.toUpperCase()}`);

    render(<App />);

    expect(screen.getByRole('navigation', { name: /main site navigation/i })).toBeInTheDocument();
    expect(sessionStorage.getItem('site_launch_override')).toBe('true');
  });

  it('renders main site if session storage already has site_launch_override flag', () => {
    mockUseFeatureFlagEnabled.mockReturnValue(false);
    sessionStorage.setItem('site_launch_override', 'true');
    window.history.replaceState({}, '', '/');

    render(<App />);

    expect(screen.getByRole('navigation', { name: /main site navigation/i })).toBeInTheDocument();
  });

  it('renders main site when feature flag is enabled without any override query param', () => {
    mockUseFeatureFlagEnabled.mockReturnValue(true);

    render(<App />);

    expect(screen.getByRole('navigation', { name: /main site navigation/i })).toBeInTheDocument();
  });
});

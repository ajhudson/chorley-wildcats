import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LaunchPage } from './LaunchPage';

describe('LaunchPage Component', () => {
  test('renders logo in the center with alt text and Coming Soon heading', () => {
    render(<LaunchPage />);

    // Verify logo image
    const logo = screen.getByRole('img', { name: "Chorley Wildcats" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('logo-svg', 'about-logo');

    // Verify Coming Soon heading
    expect(screen.getByRole('heading', { name: "Coming Soon", level: 1 })).toBeInTheDocument();
  });

  test('does not render navigation menu or footer', () => {
    const { container } = render(<LaunchPage />);

    // Check no nav or navigation roles
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(container.querySelector('nav')).toBeNull();
    expect(container.querySelector('.main-navigation')).toBeNull();

    // Check no footer or contentinfo role
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    expect(container.querySelector('footer')).toBeNull();
    expect(container.querySelector('.main-footer')).toBeNull();
  });

  test('renders custom props correctly when provided', () => {
    render(
      <LaunchPage
        title="Launching Soon"
        logoAlt="Wildcats Club"
        tagline="Stay tuned for our grand launch!"
        className="custom-launch"
      />
    );

    expect(screen.getByRole('heading', { name: "Launching Soon", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: "Wildcats Club" })).toBeInTheDocument();
    expect(screen.getByText("Stay tuned for our grand launch!")).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('custom-launch');
  });
});


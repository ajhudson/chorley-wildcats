import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

const mockProps = {
  name: "Chorley Wildcats",
  tagline: "Unleash Your Potential",
  mission: "Inspirational mission statement",
  aboutText: "This is the story of our club.",
  stats: [
    { label: "Active Wildcats", value: "150+" },
    { label: "Expert Coaches", value: "8" }
  ]
};

describe('About Component', () => {
  test('renders heading, tagline, story, and mission correctly', () => {
    render(<About {...mockProps} />);

    // Check headings
    expect(screen.getByRole('heading', { name: "Chorley Wildcats", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Unleash Your Potential")).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Our Story", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Our Mission", level: 2 })).toBeInTheDocument();

    // Check text contents
    expect(screen.getByText("This is the story of our club.")).toBeInTheDocument();
    expect(screen.getByText('"Inspirational mission statement"')).toBeInTheDocument();
  });

  test('renders all stats with proper accessibility labels', () => {
    render(<About {...mockProps} />);

    // Verify stats exist
    expect(screen.getByText("150+")).toBeInTheDocument();
    expect(screen.getByText("Active Wildcats")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Expert Coaches")).toBeInTheDocument();

    // Verify groups exist with correct labels
    expect(screen.getByRole('group', { name: 'Active Wildcats' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Expert Coaches' })).toBeInTheDocument();
  });
});

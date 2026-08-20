import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Donations } from './Donations';

const mockGoals = [
  {
    id: "1",
    title: "New Training Footballs",
    description: "Sponsor football equipment.",
    target: 500,
    current: 250,
    category: "Equipment"
  }
];

describe('Donations Component', () => {
  test('renders goals lists with targets and progress correctly', () => {
    render(<Donations goals={mockGoals} />);

    expect(screen.getByRole('heading', { name: "Support Our Wildcats", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "New Training Footballs", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Sponsor football equipment.")).toBeInTheDocument();
    expect(screen.getByText("£250 Raised")).toBeInTheDocument();
    expect(screen.getByText("Goal: £500")).toBeInTheDocument();

    const progressbar = screen.getByRole('progressbar', { name: "New Training Footballs Progress" });
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '250');
    expect(progressbar).toHaveAttribute('aria-valuemax', '500');
  });

  test('opens and submits virtual donation modal successfully', () => {
    render(<Donations goals={mockGoals} />);

    // Click on donate button
    const donateButton = screen.getByRole('button', { name: "Donate to this Goal" });
    fireEvent.click(donateButton);

    // Modal is visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Make a Difference", level: 2 })).toBeInTheDocument();

    // Click virtual preset and submit
    const presetBtn = screen.getByRole('button', { name: "£50" });
    fireEvent.click(presetBtn);

    const submitBtn = screen.getByRole('button', { name: "Process Virtual Donation" });
    fireEvent.click(submitBtn);

    // Success screen rendered
    expect(screen.getByRole('heading', { name: "Thank You, Wildcat Fan!", level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Your virtual donation of/)).toBeInTheDocument();
    expect(screen.getByText("£50")).toBeInTheDocument();

    // Close success screen
    const returnBtn = screen.getByRole('button', { name: "Return to Site" });
    fireEvent.click(returnBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

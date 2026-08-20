import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Gallery } from './Gallery';

const mockItems = [
  {
    id: "1",
    url: "https://example.com/pic1.jpg",
    title: "Saturday Soccer",
    description: "Kids playing soccer."
  },
  {
    id: "2",
    url: "https://example.com/pic2.jpg",
    title: "Basketball Training",
    description: "Kids practicing shooting."
  }
];

describe('Gallery Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders active slide title, image and caption correctly', () => {
    render(<Gallery items={mockItems} />);

    expect(screen.getByRole('heading', { name: "Wildcats in Action", level: 1 })).toBeInTheDocument();
    
    // Check initial slide details
    expect(screen.getByRole('img', { name: "Saturday Soccer" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Saturday Soccer", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Kids playing soccer.")).toBeInTheDocument();
  });

  test('navigates to next and previous slides correctly', () => {
    render(<Gallery items={mockItems} />);

    const nextBtn = screen.getByRole('button', { name: "Next slide" });
    const prevBtn = screen.getByRole('button', { name: "Previous slide" });

    // Navigate to next
    fireEvent.click(nextBtn);
    expect(screen.getByRole('img', { name: "Basketball Training" })).toBeInTheDocument();
    expect(screen.getByText("Kids practicing shooting.")).toBeInTheDocument();

    // Navigate back to previous (wraps around to 0)
    fireEvent.click(prevBtn);
    expect(screen.getByRole('img', { name: "Saturday Soccer" })).toBeInTheDocument();
  });

  test('jumps to correct slide when indicator dots are clicked', () => {
    render(<Gallery items={mockItems} />);

    // Click dot 2 (Go to slide 2)
    const dots = screen.getAllByRole('tab');
    fireEvent.click(dots[1]);

    expect(screen.getByRole('img', { name: "Basketball Training" })).toBeInTheDocument();
    expect(dots[1]).toHaveAttribute('aria-selected', 'true');
  });

  test('auto-rotates slides periodically when playing, pauses when toggled', () => {
    render(<Gallery items={mockItems} />);

    // Initially is playing
    expect(screen.getByRole('button', { name: "Pause automatic slideshow" })).toBeInTheDocument();

    // Advance timer by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('img', { name: "Basketball Training" })).toBeInTheDocument();

    // Click Pause
    const pauseBtn = screen.getByRole('button', { name: "Pause automatic slideshow" });
    fireEvent.click(pauseBtn);

    // Verify button toggles to Play
    const playBtn = screen.getByRole('button', { name: "Play automatic slideshow" });
    expect(playBtn).toBeInTheDocument();

    // Advance timer by another 5 seconds and check it did NOT change slides
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('img', { name: "Basketball Training" })).toBeInTheDocument();
  });
});

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calendar } from './Calendar';

const mockEvents = [
  {
    id: "1",
    date: "Every Saturday",
    day: "Saturday",
    title: "Junior Soccer Academy",
    time: "09:30 AM - 11:00 AM",
    location: "Main Pitch",
    ageGroup: "Ages 5-9"
  },
  {
    id: "2",
    date: "Every Tuesday",
    day: "Tuesday",
    title: "Basketball Hoopstars",
    time: "05:30 PM - 07:00 PM",
    location: "Indoor Hall",
    ageGroup: "Ages 7-12"
  }
];

describe('Calendar Component', () => {
  test('renders events lists with titles, location and badges correctly', () => {
    render(<Calendar events={mockEvents} />);

    expect(screen.getByRole('heading', { name: "Club Schedule", level: 1 })).toBeInTheDocument();
    
    // Check specific event headers
    expect(screen.getByRole('heading', { name: "Junior Soccer Academy", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Basketball Hoopstars", level: 2 })).toBeInTheDocument();

    // Check days and times
    expect(screen.getByText("Saturday")).toBeInTheDocument();
    expect(screen.getByText("09:30 AM - 11:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Main Pitch")).toBeInTheDocument();
    expect(screen.getByText("Ages 5-9")).toBeInTheDocument();

    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("05:30 PM - 07:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Indoor Hall")).toBeInTheDocument();
    expect(screen.getByText("Ages 7-12")).toBeInTheDocument();
  });

  test('renders fallback message if no events exist', () => {
    render(<Calendar events={[]} />);
    expect(screen.getByText("No upcoming events at the moment. Check back soon!")).toBeInTheDocument();
  });
});

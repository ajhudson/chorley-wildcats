import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Contact } from './Contact';

const mockContactInfo = {
  email: "test@example.com",
  phone: "12345",
  address: "Test Ground, Road, Town",
  facebook: "facebook.com/test"
};

describe('Contact Component', () => {
  test('renders contact details and inquiry form correctly', () => {
    render(<Contact contactInfo={mockContactInfo} />);

    expect(screen.getByRole('heading', { name: "Get in Touch", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Test Ground, Road, Town")).toBeInTheDocument();

    // Check form inputs are present
    expect(screen.getByLabelText(/Parent \/ Guardian Name \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Child's Name \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Child's Age \*/)).toBeInTheDocument();
  });

  test('submits interest registration form successfully', () => {
    render(<Contact contactInfo={mockContactInfo} />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/Parent \/ Guardian Name \*/), { target: { value: "John Smith" } });
    fireEvent.change(screen.getByLabelText(/Email Address \*/), { target: { value: "john@test.com" } });
    fireEvent.change(screen.getByLabelText(/Child's Name \*/), { target: { value: "Billy Smith" } });
    fireEvent.change(screen.getByLabelText(/Child's Age \*/), { target: { value: "9" } });

    // Click submit
    const submitBtn = screen.getByRole('button', { name: "Join the Pack!" });
    fireEvent.click(submitBtn);

    // Verify success card is rendered
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Welcome to the Pack!", level: 3 })).toBeInTheDocument();
    expect(screen.getByText(/John Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Billy Smith/)).toBeInTheDocument();
  });
});

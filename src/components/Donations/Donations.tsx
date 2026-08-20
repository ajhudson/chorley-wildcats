import React, { useState } from 'react';
import type { DonationsProps } from './Donations.types';
import { Heart, Coins, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const Donations: React.FC<DonationsProps> = ({ goals }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('20');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  const handleDonateClick = (goalId: string) => {
    setSelectedGoal(goalId);
    setDonationSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAmount || parseFloat(customAmount) <= 0) return;
    setDonationSuccess(true);
    // In a real application, we would submit this to a backend/Stripe
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'equipment': return <Coins className="goal-icon" aria-hidden="true" />;
      case 'uniforms': return <Award className="goal-icon" aria-hidden="true" />;
      case 'facilities': return <Sparkles className="goal-icon" aria-hidden="true" />;
      default: return <Heart className="goal-icon" aria-hidden="true" />;
    }
  };

  return (
    <article className="donations-section" aria-labelledby="donations-heading">
      <header className="section-header">
        <h1 id="donations-heading" className="section-title">Support Our Wildcats</h1>
        <p className="section-tagline">
          Chorley Wildcats is run entirely by volunteers and fundraisers. Every penny donated goes directly towards equipment, training kit, and low-cost facility rentals for children.
        </p>
      </header>

      <div className="donations-grid">
        {goals.map((goal) => {
          const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);
          return (
            <section
              key={goal.id}
              className={`donation-card ${goal.current >= goal.target ? 'goal-completed' : ''}`}
              aria-labelledby={`goal-title-${goal.id}`}
            >
              <div className="donation-card-header">
                <span className="goal-category-badge">
                  {getCategoryIcon(goal.category)}
                  {goal.category}
                </span>
                {goal.current >= goal.target && (
                  <span className="completed-badge">100% Funded!</span>
                )}
              </div>

              <h2 id={`goal-title-${goal.id}`} className="goal-title">{goal.title}</h2>
              <p className="goal-description">{goal.description}</p>

              <div className="goal-progress-container">
                <div className="progress-bar-background">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={goal.current}
                    aria-valuemin={0}
                    aria-valuemax={goal.target}
                    aria-label={`${goal.title} Progress`}
                  ></div>
                </div>
                <div className="goal-progress-labels">
                  <span className="raised-text">£{goal.current} Raised</span>
                  <span className="target-text">Goal: £{goal.target}</span>
                </div>
              </div>

              <button
                type="button"
                className="donate-button"
                onClick={() => handleDonateClick(goal.id)}
                aria-haspopup="dialog"
              >
                {goal.current >= goal.target ? 'Back the Pack Again' : 'Donate to this Goal'}
              </button>
            </section>
          );
        })}
      </div>

      {selectedGoal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="donation-modal">
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedGoal(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            {!donationSuccess ? (
              <form onSubmit={handleFormSubmit} className="modal-form">
                <h2 id="modal-title" className="modal-heading">Make a Difference</h2>
                <p className="modal-subheading">
                  Sponsoring: <strong>{goals.find(g => g.id === selectedGoal)?.title}</strong>
                </p>

                <div className="amount-selectors">
                  {['10', '20', '50', '100'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`amount-preset-btn ${customAmount === amt ? 'active' : ''}`}
                      onClick={() => setCustomAmount(amt)}
                    >
                      £{amt}
                    </button>
                  ))}
                </div>

                <div className="custom-amount-wrapper">
                  <label htmlFor="custom-amt-input" className="form-label">Or enter custom amount (£)</label>
                  <input
                    id="custom-amt-input"
                    type="number"
                    min="1"
                    className="custom-amount-input"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="modal-submit-btn">
                  Process Virtual Donation
                </button>
              </form>
            ) : (
              <div className="modal-success-screen">
                <CheckCircle2 className="success-icon" aria-hidden="true" />
                <h2 id="modal-title" className="success-heading">Thank You, Wildcat Fan!</h2>
                <p className="success-body">
                  Your virtual donation of <strong>£{customAmount}</strong> was simulated successfully. If this were a live site, this would connect to a Stripe/PayPal checkout to fund our junior sports kits and equipment.
                </p>
                <button
                  type="button"
                  className="modal-success-close-btn"
                  onClick={() => setSelectedGoal(null)}
                >
                  Return to Site
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default Donations;

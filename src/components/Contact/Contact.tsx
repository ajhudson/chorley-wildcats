import React, { useState } from 'react';
import type { ContactProps } from './Contact.types';
import { Mail, Phone, MapPin, HeartHandshake, CheckCircle } from 'lucide-react';

export const Contact: React.FC<ContactProps> = ({ contactInfo }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    email: '',
    preferredSport: 'Football',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.childName || !formData.email) return;
    setFormSubmitted(true);
    // In a real application, we would submit this payload to a server
  };

  return (
    <article className="contact-section" aria-labelledby="contact-heading">
      <header className="section-header">
        <h1 id="contact-heading" className="section-title">Get in Touch</h1>
        <p className="section-tagline">
          Have questions or want to register interest for your child? Drop us a message, and our club leaders will get right back to you!
        </p>
      </header>

      <div className="contact-container">
        {/* Contact Info Cards */}
        <section className="contact-info-panel" aria-label="Direct Contact Channels">
          <div className="contact-info-card">
            <Mail className="contact-card-icon" aria-hidden="true" />
            <div>
              <h3>Email Us</h3>
              <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
            </div>
          </div>

          <div className="contact-info-card">
            <Phone className="contact-card-icon" aria-hidden="true" />
            <div>
              <h3>Call Us</h3>
              <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
            </div>
          </div>

          <div className="contact-info-card">
            <MapPin className="contact-card-icon" aria-hidden="true" />
            <div>
              <h3>Training Grounds</h3>
              <p>{contactInfo.address}</p>
            </div>
          </div>

          <div className="contact-info-card community-note-card">
            <HeartHandshake className="contact-card-icon" aria-hidden="true" />
            <div>
              <h3>First Session Free!</h3>
              <p>We welcome children for a completely free taster session before committing to the team pack.</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-panel" aria-labelledby="form-panel-title">
          <h2 id="form-panel-title" className="form-panel-title">Wildcats Registration Form</h2>

          {formSubmitted ? (
            <div className="form-success-card" role="alert">
              <CheckCircle className="success-check-icon" aria-hidden="true" />
              <h3>Welcome to the Pack!</h3>
              <p>
                Thanks, <strong>{formData.parentName}</strong>! Your interest form for <strong>{formData.childName}</strong> (Age {formData.childAge}) has been submitted successfully.
              </p>
              <p className="success-subtext">
                We've sent a simulated confirmation email to <strong>{formData.email}</strong>. Our head coach will contact you within 48 hours to schedule your free taster session!
              </p>
              <button
                type="button"
                className="reset-form-button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    parentName: '',
                    childName: '',
                    childAge: '',
                    email: '',
                    preferredSport: 'Football',
                    message: '',
                  });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="parentName" className="form-label">Parent / Guardian Name *</label>
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Jane Doe"
                    value={formData.parentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="jane.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="childName" className="form-label">Child's Name *</label>
                  <input
                    id="childName"
                    name="childName"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Tommy Doe"
                    value={formData.childName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="childAge" className="form-label">Child's Age *</label>
                  <input
                    id="childAge"
                    name="childAge"
                    type="number"
                    min="4"
                    max="16"
                    required
                    className="form-input"
                    placeholder="8"
                    value={formData.childAge}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="preferredSport" className="form-label">Preferred Sport *</label>
                <select
                  id="preferredSport"
                  name="preferredSport"
                  className="form-select"
                  value={formData.preferredSport}
                  onChange={handleInputChange}
                >
                  <option value="Football">Saturday Football Academy</option>
                  <option value="Basketball">Basketball Hoopstars</option>
                  <option value="Athletics">Athletics & Dodgeball</option>
                  <option value="Other">I am interested in multiple sports!</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Questions or Support Needs (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="form-textarea"
                  placeholder="Tell us if they have played before, any medical/access needs, etc."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className="form-submit-button">
                Join the Pack!
              </button>
            </form>
          )}
        </section>
      </div>
    </article>
  );
};

export default Contact;

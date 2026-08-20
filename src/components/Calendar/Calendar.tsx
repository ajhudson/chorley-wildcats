import React from 'react';
import type { CalendarProps } from './Calendar.types';
import { Calendar as CalendarIcon, Clock, MapPin, UserCheck } from 'lucide-react';

export const Calendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <article className="calendar-section" aria-labelledby="calendar-heading">
      <header className="section-header">
        <h1 id="calendar-heading" className="section-title">Club Schedule</h1>
        <p className="section-tagline">Find out when and where we train. New joiners are always welcome!</p>
      </header>

      {events.length === 0 ? (
        <p className="no-events-text">No upcoming events at the moment. Check back soon!</p>
      ) : (
        <div className="calendar-grid">
          {events.map((event) => (
            <section
              key={event.id}
              className="calendar-card"
              aria-labelledby={`event-title-${event.id}`}
            >
              <div className="calendar-card-header">
                <span className="calendar-badge" aria-label="Session Day">
                  <CalendarIcon className="card-badge-icon" aria-hidden="true" />
                  {event.day}
                </span>
                <span className="age-group-badge" aria-label="Age Group Target">
                  <UserCheck className="card-badge-icon" aria-hidden="true" />
                  {event.ageGroup}
                </span>
              </div>

              <h2 id={`event-title-${event.id}`} className="event-title">
                {event.title}
              </h2>

              <div className="event-details">
                <div className="event-detail-item">
                  <Clock className="event-detail-icon" aria-hidden="true" />
                  <span>{event.time}</span>
                </div>
                <div className="event-detail-item">
                  <MapPin className="event-detail-icon" aria-hidden="true" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="calendar-card-footer">
                <span className="event-specific-date">{event.date}</span>
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  );
};

export default Calendar;

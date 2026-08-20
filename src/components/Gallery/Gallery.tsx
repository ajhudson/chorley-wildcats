import React, { useState, useEffect, useRef } from 'react';
import type { GalleryProps } from './Gallery.types';
import { ChevronLeft, ChevronRight, Play, Pause, ImageIcon } from 'lucide-react';

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoplay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Setup autoplay timer
  useEffect(() => {
    if (isPlaying && items.length > 1) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 5000); // Change image every 5 seconds
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentIndex, items.length]);

  if (items.length === 0) {
    return (
      <article className="gallery-section" aria-labelledby="gallery-heading">
        <h1 id="gallery-heading" className="section-title">Wildcats Gallery</h1>
        <p className="no-images-text">No pictures in the gallery yet. Check back after our next match!</p>
      </article>
    );
  }

  const activeItem = items[currentIndex];

  return (
    <article className="gallery-section" aria-labelledby="gallery-heading">
      <header className="section-header">
        <h1 id="gallery-heading" className="section-title">Wildcats in Action</h1>
        <p className="section-tagline">Catch a glimpse of the fun, training, and teamwork at our weekly sessions!</p>
      </header>

      {/* Carousel Container */}
      <section className="carousel-container" aria-roledescription="carousel" aria-label="Wildcats Action Photos">
        {/* Play/Pause Autoplay Control */}
        <button
          type="button"
          className="autoplay-control-btn"
          onClick={toggleAutoplay}
          aria-label={isPlaying ? "Pause automatic slideshow" : "Play automatic slideshow"}
        >
          {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>

        {/* Slidewrapper */}
        <div className="carousel-slide-wrapper">
          <div 
            className="carousel-slide" 
            role="group" 
            aria-roledescription="slide" 
            aria-label={`${currentIndex + 1} of ${items.length}`}
            aria-live="polite"
          >
            {/* Image element with fallbacks */}
            <div className="carousel-image-frame">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="carousel-img"
              />
              <div className="carousel-img-overlay"></div>
            </div>

            {/* Caption Card */}
            <div className="carousel-caption">
              <div className="caption-badge">
                <ImageIcon className="caption-badge-icon" size={14} aria-hidden="true" />
                <span>Gallery</span>
              </div>
              <h2 className="caption-title">{activeItem.title}</h2>
              <p className="caption-description">{activeItem.description}</p>
            </div>
          </div>
        </div>

        {/* Next / Prev Navigation Controls */}
        <button
          type="button"
          className="carousel-nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="carousel-nav-btn next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="carousel-dots" role="tablist" aria-label="Slideshow slide selector">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(idx)}
            ></button>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Gallery;

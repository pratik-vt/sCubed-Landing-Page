'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

import visualReportImg from '../../../images/data-collection/visual-reports.png';
import attendanceManagementImg from '../../../images/data-collection/attendence-management.png';
import customizedTemplatesImg from '../../../images/data-collection/customizable-templates.png';
import secureMultiDeviceAccessImg from '../../../images/data-collection/secure-multi-device-access.png';
import realTimeSessionLoggingImg from '../../../images/data-collection/real-time-session-logging.png';
import goalBehaviorTrackingImg from '../../../images/data-collection/goal-and-behavior-tracking.png';


import {
  carouselSection,
  carouselContainer,
  sectionTitle,
  carouselWrapper,
  slideContainer,
  slideContent,
  slideImageWrapper,
  slideImage,
  navigationControls,
  navButton,
  dotsContainer,
  dot,
  activeDot,
  progressBar,
  progressFill,
} from './styles.css';

interface CarouselSlide {
  id: number;  
  image: StaticImageData;
  accentColor: string;
}

const FeaturesCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides: CarouselSlide[] = [
    {
      id: 0,
      image: secureMultiDeviceAccessImg,
      accentColor: '#7a7eed',
    },
    {
      id: 1,
      image: secureMultiDeviceAccessImg,
      accentColor: '#22d3ee',
    },
    {
      id: 2,
      image: secureMultiDeviceAccessImg,
      accentColor: '#34d399',
    },
    {
      id: 3,
      image: secureMultiDeviceAccessImg,
      accentColor: '#fb7185',
    },
    {
      id: 4,
      image: secureMultiDeviceAccessImg,
      accentColor: '#a78bfa',
    },
    {
      id: 5,
      image: secureMultiDeviceAccessImg,
      accentColor: '#fbbf24',
    },
  ];

  const AUTOPLAY_INTERVAL = 8000; // 8 seconds per slide

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setProgress(0);
  }, [currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (AUTOPLAY_INTERVAL / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      nextSlide();
    }
  }, [progress, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const slide = slides[currentSlide];

  return (
    <section className={carouselSection}>
      <div className={carouselContainer}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Simplify Every Step of Data Collection
        </motion.h3>

        <div className={carouselWrapper}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className={slideContainer}
            >
              <div className={slideContent}>
                <motion.div
                  className={slideImageWrapper}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Image
                    src={slide.image}
                    alt="Scheduling and Appointments"
                    className={slideImage}
                    quality={100}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 100%"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at center, ${slide.accentColor}10 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>                
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className={navigationControls}>
            <button
              className={navButton}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={navButton}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className={progressBar}>
            <div
              className={progressFill}
              style={{
                width: `${progress}%`,
                backgroundColor: slide.accentColor,
              }}
            />
          </div>

          {/* Dots Navigation */}
          <div className={dotsContainer}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${dot} ${index === currentSlide ? activeDot : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  backgroundColor:
                    index === currentSlide ? slide.accentColor : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;

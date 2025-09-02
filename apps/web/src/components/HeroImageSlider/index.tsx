'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
  heroSliderSection,
  heroSliderContainer,
  heroSliderContent,
  heroSliderImageWrapper,
  heroSliderImage,
  heroSliderOverlay,
  heroSliderTextContent,
  heroSliderTitle,
  heroSliderDescription,
  heroSliderButton,
  heroSliderNavigation,
  heroSliderPrevButton,
  heroSliderNextButton,
  heroSliderIndicators,
  heroSliderIndicator,
  heroSliderIndicatorActive,
} from './styles.css';

export interface HeroSliderItem {
  id: string;
  title: string;
  description: string | React.ReactNode; // Allow JSX/HTML in description
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    mobileSrc?: string; // Optional mobile image
  };
  link?: {
    href: string;
    text: string;
    external?: boolean;
  };
}

interface HeroImageSliderProps {
  items: HeroSliderItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, items.length]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(autoPlay);
  };

  if (!items.length) return null;

  const currentItem = items[currentIndex];
  const currentImageSrc = isMobile && currentItem.image.mobileSrc 
    ? currentItem.image.mobileSrc 
    : currentItem.image.src;

  return (
    <header 
      className={`${heroSliderSection} ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={heroSliderContainer}>
        <div className={heroSliderContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              className={heroSliderImageWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={currentImageSrc}
                alt={currentItem.image.alt}
                width={currentItem.image.width || 1200}
                height={currentItem.image.height || 600}
                className={heroSliderImage}
                priority
                sizes="100vw"
              />
              <div className={heroSliderOverlay} />
            </motion.div>
          </AnimatePresence>

          <motion.div
            className={heroSliderTextContent}
            key={`content-${currentItem.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1
              className={heroSliderTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {currentItem.title}
            </motion.h1>
            
            <motion.div
              className={heroSliderDescription}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {typeof currentItem.description === 'string' ? (
                <p dangerouslySetInnerHTML={{ __html: currentItem.description }} />
              ) : (
                currentItem.description
              )}
            </motion.div>

            {currentItem.link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {currentItem.link.external ? (
                  <a
                    href={currentItem.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={heroSliderButton}
                  >
                    {currentItem.link.text}
                    <ExternalLink size={20} />
                  </a>
                ) : (
                  <Link href={currentItem.link.href} className={heroSliderButton}>
                    {currentItem.link.text}
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <div className={heroSliderNavigation}>
              <button
                className={heroSliderPrevButton}
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={heroSliderNextButton}
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Slide Indicators */}
          {items.length > 1 && (
            <div className={heroSliderIndicators}>
              {items.map((item, index) => (
                <button
                  key={item.id}
                  className={`${heroSliderIndicator} ${
                    index === currentIndex ? heroSliderIndicatorActive : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${item.title}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroImageSlider;

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
    position?: string; // CSS object-position for desktop (e.g., 'center right', 'left center')
    mobilePosition?: string; // Mobile-specific image position
  };
  link?: {
    href: string;
    text: string;
    mobileText?: string; // Optional mobile-specific link text
    external?: boolean;
  };
  contentAlign?: 'left' | 'center' | 'right'; // Optional content alignment
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setImageLoaded(false); // Reset loading state for new image
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setImageLoaded(false); // Reset loading state for new image
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setImageLoaded(false); // Reset loading state for new image
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, items.length]);

  // Mobile detection (includes iPad)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Include iPad (1024px and below)
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload next images for better performance
  useEffect(() => {
    if (items.length <= 1) return;

    const preloadImages = () => {
      items.forEach((item, index) => {
        if (index !== currentIndex) {
          const img = new window.Image();
          const imageSrc = isMobile && item.image.mobileSrc 
            ? item.image.mobileSrc 
            : item.image.src;
          img.src = imageSrc;
        }
      });
    };

    // Preload after a short delay to not interfere with current image
    const timeoutId = setTimeout(preloadImages, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentIndex, items, isMobile]);

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
  const currentImagePosition = isMobile && currentItem.image.mobilePosition 
    ? currentItem.image.mobilePosition 
    : currentItem.image.position || 'center';
  const currentLinkText = isMobile && currentItem.link?.mobileText 
    ? currentItem.link.mobileText 
    : currentItem.link?.text;

  return (
    <header 
      className={`${heroSliderSection} ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={heroSliderContainer}>
        <div 
          className={heroSliderContent}
          style={{
            justifyContent: currentItem.contentAlign === 'center' ? 'center' : 
                           currentItem.contentAlign === 'right' ? 'flex-end' : 'flex-start'
          }}
        >
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
                width={currentItem.image.width || 1920}
                height={currentItem.image.height || 800}
                className={heroSliderImage}
                priority={currentIndex === 0} // Only prioritize first image
                quality={90} // High quality but compressed
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                onLoad={() => setImageLoaded(true)}
                style={{ objectPosition: currentImagePosition }}
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
            style={{ 
              textAlign: currentItem.contentAlign || 'left',
              marginLeft: currentItem.contentAlign === 'center' ? 'auto' : 
                         currentItem.contentAlign === 'right' ? 'auto' : undefined,
              marginRight: currentItem.contentAlign === 'center' ? 'auto' : 
                          currentItem.contentAlign === 'right' ? undefined : undefined
            }}
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
                    {currentLinkText}
                    <ExternalLink size={20} />
                  </a>
                ) : (
                  <Link href={currentItem.link.href} className={heroSliderButton}>
                    {currentLinkText}
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

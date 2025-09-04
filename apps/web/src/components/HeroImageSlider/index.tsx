'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
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
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    mobileSrc?: string | StaticImageData; // Optional mobile image
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
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
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

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    if (items.length <= 1) return;

    const preloadAdjacentImages = () => {
      const nextIndex = (currentIndex + 1) % items.length;
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      
      [nextIndex, prevIndex].forEach(index => {
        const item = items[index];
        if (!imagesLoaded[index]) {
          // For static imports, images are already optimized by Next.js
          if (typeof item.image.src !== 'string') {
            setImagesLoaded(prev => ({ ...prev, [index]: true }));
          } else {
            // Only preload string URLs
            const img = new window.Image();
            const imageSrc = isMobile && item.image.mobileSrc 
              ? item.image.mobileSrc as string
              : item.image.src as string;
            
            img.onload = () => {
              setImagesLoaded(prev => ({ ...prev, [index]: true }));
            };
            img.src = imageSrc;
          }
        }
      });
    };

    // Preload immediately for smoother transitions
    preloadAdjacentImages();
  }, [currentIndex, items, isMobile, imagesLoaded]);

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
              animate={{ opacity: imagesLoaded[currentIndex] ? 1 : 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={currentImageSrc}
                alt={currentItem.image.alt}
                width={currentItem.image.width || 1920}
                height={currentItem.image.height || 800}
                className={heroSliderImage}
                priority={currentIndex === 0} // Prioritize first image
                loading={currentIndex === 0 ? 'eager' : 'lazy'}
                quality={85} // Optimized quality
                placeholder={typeof currentImageSrc !== 'string' ? 'blur' : 'empty'}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                onLoad={() => setImagesLoaded(prev => ({ ...prev, [currentIndex]: true }))}
                style={{ 
                  objectPosition: currentImagePosition,
                  filter: imagesLoaded[currentIndex] ? 'none' : 'blur(5px)',
                  transition: 'filter 0.3s ease-in-out'
                }}
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
                    rel="noopener noreferrer nofollow"
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

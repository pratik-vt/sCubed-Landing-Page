'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useMemo, useCallback } from 'react';

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
  heroSliderSecondaryButton,
  heroSliderButtonContainer,
  heroSliderButtonContainerCentered,
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
  secondaryLink?: {
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Memoize slide navigation functions to prevent unnecessary re-renders
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsTransitioning(false), 400); // Reduced from 600ms
  }, [currentIndex, items.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    setTimeout(() => setIsTransitioning(false), 400); // Reduced from 600ms
  }, [currentIndex, items.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 400); // Reduced from 600ms
  }, [currentIndex, isTransitioning]);

  // Auto-play functionality - optimized with useCallback dependency
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, items.length, nextSlide]);

  // Mobile detection (includes iPad) - optimized with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 1024); // Include iPad (1024px and below)
      }, 100); // Debounce resize events
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
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

  // Pause auto-play on hover - memoized for performance
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(autoPlay);
  }, [autoPlay]);

  // Touch/Swipe handlers
  const minSwipeDistance = 50; // Minimum distance in pixels for a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
    // Pause autoplay when user starts swiping
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && items.length > 1) {
      nextSlide();
    }
    if (isRightSwipe && items.length > 1) {
      prevSlide();
    }
    
    // Resume autoplay after swipe if it was originally enabled
    setTimeout(() => {
      setIsAutoPlaying(autoPlay);
    }, 1000);
  };

  // Memoize computed values to prevent unnecessary recalculations
  const currentItem = useMemo(() => items[currentIndex], [items, currentIndex]);
  
  const currentImageSrc = useMemo(() => 
    isMobile && currentItem?.image.mobileSrc 
      ? currentItem.image.mobileSrc 
      : currentItem?.image.src,
    [isMobile, currentItem]
  );
  
  const currentImagePosition = useMemo(() => 
    isMobile && currentItem?.image.mobilePosition 
      ? currentItem.image.mobilePosition 
      : currentItem?.image.position || 'center',
    [isMobile, currentItem]
  );
  
  const currentLinkText = useMemo(() => 
    isMobile && currentItem?.link?.mobileText 
      ? currentItem.link.mobileText 
      : currentItem?.link?.text,
    [isMobile, currentItem]
  );

  if (!items.length) return null;

  return (
    <header 
      className={`${heroSliderSection} ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
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
              animate={{ 
                opacity: imagesLoaded[currentIndex] ? 1 : 0.8,
                x: isDragging && touchStart && touchEnd ? (touchEnd - touchStart) * 0.2 : 0
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: isDragging ? 0 : 0.3, // Reduced from 0.5s for faster transitions
                type: isDragging ? 'tween' : 'spring',
                ease: 'easeOut'
              }}
              style={{ cursor: items.length > 1 ? 'grab' : 'default' }}
            >
              <Image
                src={currentImageSrc}
                alt={currentItem.image.alt}
                width={currentItem.image.width || 1920}
                height={currentItem.image.height || 800}
                className={heroSliderImage}
                priority={currentIndex === 0} // Prioritize first image
                loading={currentIndex === 0 ? 'eager' : 'lazy'}
                quality={80} // Further optimized quality
                placeholder={typeof currentImageSrc !== 'string' ? 'blur' : 'empty'}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                decoding="async" // Improve loading performance
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

            {(currentItem.link || currentItem.secondaryLink) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className={currentItem.secondaryLink ? 
                  (currentItem.contentAlign === 'center' ? heroSliderButtonContainerCentered : heroSliderButtonContainer) 
                  : undefined}>
                  {currentItem.secondaryLink && (
                    currentItem.secondaryLink.external ? (
                      <a
                        href={currentItem.secondaryLink.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={heroSliderSecondaryButton}
                      >
                        {isMobile && currentItem.secondaryLink.mobileText 
                          ? currentItem.secondaryLink.mobileText 
                          : currentItem.secondaryLink.text}
                        <ExternalLink size={20} />
                      </a>
                    ) : (
                      <Link 
                        href={currentItem.secondaryLink.href} 
                        className={heroSliderSecondaryButton}
                      >
                        {isMobile && currentItem.secondaryLink.mobileText 
                          ? currentItem.secondaryLink.mobileText 
                          : currentItem.secondaryLink.text}
                      </Link>
                    )
                  )}
                  {currentItem.link && (
                    currentItem.link.external ? (
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
                    )
                  )}
                </div>
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

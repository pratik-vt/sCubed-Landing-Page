'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import {
  carouselContainer,
  carouselTrack,
  carouselWrapper,
  desktopOnly,
  imageSliderSection,
  leftArrow,
  mobileGrid,
  mobileOnly,
  navigationButtonHidden,
  progressBar,
  progressBarContainer,
  progressIndicator,
  rightArrow,
  sectionSubtitle,
  sectionTitle,
  sliderCard,
  sliderContainer,
  sliderDescription,
  sliderImage,
  sliderImageWrapper,
  sliderLink,
  sliderTitle,
} from './styles.css';

export interface SliderItem {
  id: string;
  title: string;
  description?: string;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  link?: {
    href: string;
    text: string;
    external?: boolean;
  };
}

interface ImageSliderProps {
  title: string;
  subtitle?: string;
  items: SliderItem[];
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  title,
  subtitle,
  items,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isInView = useInView(sectionRef, { once: true, margin: '0px' });

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = 380; // Card width + gap
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = 380; // Card width + gap
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;

        setScrollProgress(progress);
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < maxScroll - 1);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll();

      setTimeout(() => {
        handleScroll();
      }, 100);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const cardVariants: Variants = {
    hidden: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className={`${imageSliderSection} ${className || ''}`} ref={sectionRef}>
      <div className={sliderContainer}>
        <motion.h2
          className={sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className={sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Desktop Carousel */}
        <div className={desktopOnly}>
          <div className={carouselWrapper}>
            {/* Navigation Arrows */}
            <button
              className={`${leftArrow} ${!canScrollLeft ? navigationButtonHidden : ''}`}
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`${rightArrow} ${!canScrollRight ? navigationButtonHidden : ''}`}
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>

            <div className={carouselContainer} ref={scrollRef}>
              <div className={carouselTrack}>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={sliderCard}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={sliderImageWrapper}>
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width || 360}
                        height={item.image.height || 240}
                        className={sliderImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className={sliderTitle}>{item.title}</div>
                    {item.description && (
                      <p className={sliderDescription}>{item.description}</p>
                    )}
                    {item.link && (
                      <div className={sliderLink}>
                        {item.link.external ? (
                          <a
                            href={item.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.link.text}
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <Link href={item.link.href}>
                            {item.link.text}
                          </Link>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className={progressBarContainer}>
              <div className={progressBar}>
                <motion.div
                  className={progressIndicator}
                  style={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className={mobileOnly}>
          <div className={mobileGrid}>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className={sliderCard}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className={sliderImageWrapper}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width || 360}
                    height={item.image.height || 240}
                    className={sliderImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className={sliderTitle}>{item.title}</div>
                {item.description && (
                  <p className={sliderDescription}>{item.description}</p>
                )}
                {item.link && (
                  <div className={sliderLink}>
                    {item.link.external ? (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link.text}
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <Link href={item.link.href}>
                        {item.link.text}
                      </Link>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;


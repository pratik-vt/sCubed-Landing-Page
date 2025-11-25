'use client';

import { motion, useInView, Variants } from 'framer-motion';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Filter,
  Layers,
  Send,
  Settings,
  Zap,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import CalendlyButton from '../CalendlyButton';
import { primaryButton } from '../CalendlyButton/styles.css';

import {
  carouselContainer,
  carouselTrack,
  carouselWrapper,
  desktopOnly,
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
  workflowCard,
  workflowContainer,
  workflowCTA,
  workflowDescription,
  workflowIconWrapper,
  workflowNumber,
  workflowSection,
  workflowTitle,
} from './styles.css';

const BillingWorkflow: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isInView = useInView(sectionRef, { once: true, margin: '0px' });

  const workflowSteps = [
    {
      icon: <FileCheck size={24} />,
      title: 'Session Note Approval',
      description: 'Billing starts with provider-approved session notes.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Automated Charge Creation',
      description:
        'Charges are auto-generated and tied to correct authorizations and codes.',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Submission-Ready Review',
      description: 'Charges are reviewed and marked for submission.',
    },
    {
      icon: <Layers size={24} />,
      title: 'Claim Grouping & Consolidation',
      description:
        'Multiple charges for a client are bundled for cleaner claims.',
    },
    {
      icon: <Send size={24} />,
      title: 'Claim Submission',
      description: 'Submit single or batch claims instantly, with full review.',
    },
    {
      icon: <Settings size={24} />,
      title: 'Post-Submission Management',
      description:
        'Easily track, edit, or revert submitted claims for correction.',
    },
    {
      icon: <Filter size={24} />,
      title: 'Smart Filtering',
      description: 'Filter claims by status to stay organized and efficient.',
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Card width + gap
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Card width + gap
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
        setCanScrollRight(scrollLeft < maxScroll - 1); // -1 for small rounding errors
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation

      // Check initial scroll state after a brief delay to ensure content is loaded
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
      opacity: 1, // Changed from 0 to ensure visibility
      y: 0, // Changed from 50 to prevent off-screen positioning
      scale: 1, // Changed from 0.9 to full scale
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
    <section className={workflowSection} ref={sectionRef}>
      <div className={workflowContainer}>
        <motion.h2
          className={sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Streamlined ABA Medical Billing Workflow
        </motion.h2>
        <motion.p
          className={sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From session notes to payment, automated and error-free
        </motion.p>

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
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={workflowCard}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={workflowNumber}>{index + 1}</div>
                    <div className={workflowIconWrapper}>{step.icon}</div>
                    <h3 className={workflowTitle}>{step.title}</h3>
                    <p className={workflowDescription}>{step.description}</p>
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
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                className={workflowCard}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className={workflowNumber}>{index + 1}</div>
                <div className={workflowIconWrapper}>{step.icon}</div>
                <h3 className={workflowTitle}>{step.title}</h3>
                <p className={workflowDescription}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className={workflowCTA}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CalendlyButton
            buttonText="See How It Works →"
            className={primaryButton}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BillingWorkflow;

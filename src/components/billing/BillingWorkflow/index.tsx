'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  FileCheck,
  Zap,
  CheckCircle,
  Layers,
  Send,
  Settings,
  Filter,
} from 'lucide-react';
import { motion, useInView, Variants } from 'framer-motion';

import CalendlyButton from '../CalendlyButton';
import { primaryButton } from '../CalendlyButton/styles.css';

import {
  workflowSection,
  workflowContainer,
  sectionTitle,
  sectionSubtitle,
  carouselWrapper,
  carouselContainer,
  carouselTrack,
  workflowCard,
  workflowIconWrapper,
  workflowNumber,
  workflowTitle,
  workflowDescription,
  workflowCTA,
  progressBarContainer,
  progressBar,
  progressIndicator,
  mobileGrid,
  desktopOnly,
  mobileOnly,
} from './styles.css';

const BillingWorkflow: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isInView = useInView(scrollRef, { once: false, margin: '-100px' });

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
      description: 'Submit single or batch claims instantly—with full review.',
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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
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
    <section className={workflowSection}>
      <div className={workflowContainer}>
        <motion.h2
          className={sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Streamlined Billing Workflow
        </motion.h2>
        <motion.p
          className={sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From session notes to payment—automated and error-free
        </motion.p>

        {/* Desktop Carousel */}
        <div className={desktopOnly}>
          <div className={carouselWrapper}>
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

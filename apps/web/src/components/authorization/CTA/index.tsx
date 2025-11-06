'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';

import {
  backgroundPattern,
  ctaButtonWrapper,
  ctaContainer,
  ctaContent,
  ctaDescription,
  ctaSection,
  ctaTitle,
} from './styles.css';

const CTA: React.FC<{ title: string; description: string; buttonText: string }> = ({ title, description, buttonText }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section className={ctaSection} ref={sectionRef}>
      <div className={ctaContainer}>
        <div className={ctaContent}>          
          <motion.h2
            className={ctaTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            
            <div
                
                dangerouslySetInnerHTML={{ __html: title }}
              />
          </motion.h2>
          <motion.p
            className={ctaDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
              {description}
          </motion.p>
          <motion.div
            className={ctaButtonWrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <CalendlyButton
              buttonText={buttonText}
              className={primaryButton}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
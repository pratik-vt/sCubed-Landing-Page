'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

import {
  introContainer,
  introContent,
  introSection,
  introText,
  introTitle,
} from './styles.css';

const GuardianIntroduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section className={introSection} ref={sectionRef}>
      <div className={introContainer}>
        <div className={introContent}>
          <motion.h2
            className={introTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Stay Connected to What Matters Most
          </motion.h2>
          <motion.p
            className={introText}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            As a parent or guardian, you deserve instant access to your child&apos;s progress 
            and care details - without the wait. Our Guardian Portal gives you the power to 
            see updates, review treatment plans, manage appointments, and message your care team, 
            all from one easy, secure place.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default GuardianIntroduction;
'use client';

import { motion, useInView, Variants } from 'framer-motion';
import React, { useRef } from 'react';

import {
  benefitCard,
  benefitIcon,
  benefitItem,
  benefitList,
  benefitsContainer,
  benefitsGrid,
  benefitsSection,
  benefitTitle,
} from './styles.css';

// Icon Components
const AnalyticsIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 3v18h18" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 12l3-3 4 4 5-5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="7" cy="12" r="1" fill="currentColor" />
    <circle cx="10" cy="9" r="1" fill="currentColor" />
    <circle cx="14" cy="13" r="1" fill="currentColor" />
    <circle cx="19" cy="8" r="1" fill="currentColor" />
  </svg>
);

const ChatIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
    <circle cx="12" cy="11.5" r="0.5" fill="currentColor" />
    <circle cx="16" cy="11.5" r="0.5" fill="currentColor" />
  </svg>
);

const ChecklistIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="3" 
      y="3" 
      width="18" 
      height="18" 
      rx="2" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M9 11l2 2 4-4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 7h10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M7 17h6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

interface Benefit {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const GuardianBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const benefits: Benefit[] = [
    {
      icon: <AnalyticsIcon />,
      title: 'Know What\'s Happening in Real Time',
      items: [
        'View your child\'s treatment plan and goals',
        'Get instant progress updates from therapists',
        'Receive appointment reminders and important announcements',
      ],
    },
    {
      icon: <ChatIcon />,
      title: 'Keep Communication Simple',
      items: [
        'Secure messaging directly with your child\'s care team',
        'No more phone tag or missed updates',
        'Accessible from any device',
      ],
    },
    {
      icon: <ChecklistIcon />,
      title: 'Make Tasks Effortless',
      items: [
        'Complete intake forms online - no paperwork stack',
        'Upload documents securely',
        'Manage your child\'s care from one dashboard',
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className={benefitsSection} ref={sectionRef}>
      <div className={benefitsContainer}>
        <motion.div
          className={benefitsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className={benefitCard}
              variants={itemVariants}
              whileHover="hover"
              custom={index}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div className={benefitIcon}>{benefit.icon}</div>
                  <h3 className={benefitTitle}>{benefit.title}</h3>
                </div>
                <ul className={benefitList}>
                  {benefit.items.map((item, index) => (
                    <li key={index} className={benefitItem}>
                      {item}
                    </li>
                  ))}
                </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GuardianBenefits;
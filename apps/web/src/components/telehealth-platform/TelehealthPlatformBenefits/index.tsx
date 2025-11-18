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
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cross-icon lucide-cross"><path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"/></svg>
);

const ChatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round-icon lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
);

const ChecklistIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days-icon lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
);

const ToolIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square-icon lucide-messages-square"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/></svg>
);

interface Benefit {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const TelehealthPlatformBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const benefits: Benefit[] = [
    {
      icon: <AnalyticsIcon />,
      title: 'Built on trust, designed for care',
      items: [
        'Every call you make is encrypted from start to finish, so clients can open up knowing their words stay protected.',
        'Fully HIPAA-compliant, secure by default',
        'Clear, stable video calls made for healthcare conversations',
        'Simple setup, no tech stress for you or your clients',
      ],
    },
    {
      icon: <ChatIcon />,
      title: 'Bring your care community together',
      items: [
        'Whether it’s a quick staff consult, a family check-in, or a therapy group, everyone joins with one secure link.',
        'One-click access from any device',
        'Support for groups, families, and teams',
        'Flexible invites for internal or external participants',
      ],
    },
    {
      icon: <ChecklistIcon />,
      title: 'Your calendar, now even smarter.',
      items: [
        'Telehealth sessions flow naturally into your existing schedule, so reminders go out, sessions start on time, and everyone stays in sync.',
        'Directly linked with appointments in S Cubed',
        'Automatic reminders via email and app',
        'Easy rescheduling and join links built in'
      ],
    },
    {
      icon: <ToolIcon />,
      title: 'Tools that keep the conversation real.',
      items: [
        'Share screens, show notes, or record (with permission) and use picture-in-picture to keep eye contact even while multitasking.',
        'Screen sharing for visuals and resources',
        'Optional recording with secure storage',
        'Picture-in-Picture mode for smoother interactions',
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

export default TelehealthPlatformBenefits;
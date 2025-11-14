'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { GlobeLock, Users, Video, Wallpaper, Image, BellRing, Link } from 'lucide-react';
import React, { useRef } from 'react';

import {
  featureContent,
  featureDescription,
  featureIcon,
  featureInnerItem,
  featureItem,
  featuresGrid,
  featureTitle,
  sectionTitle,
  whyChooseContainer,
  whyChooseSection,
} from './styles.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TelehealthPlatformWhyChoose: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const features: Feature[] = [
    {
      icon: <Video size={28} />,
      title: 'Secure Video Sessions',
      description: 'HIPAA-compliant calls that protect every conversation.',
    },
    {
      icon: <GlobeLock size={28} />,
      title: 'Multi-Participant Meetings',
      description: 'Connect teams, clients, and collaborators in one secure space.',
    },
    {
      icon: <Users size={28} />,
      title: 'Smart Scheduling Integration',
      description: 'Launch telehealth sessions directly from appointments.',
    },
    {
      icon: <Wallpaper size={28} />,
      title: 'Screen Sharing',
      description: 'Present charts, notes, or visuals seamlessly in-session.',
    },

    {
      icon: <Video size={28} />,
      title: 'Session Recording',
      description: 'Record with consent and store safely within the platform.',
    },
    {
      icon: <Image size={28} />,
      title: 'Picture-in-Picture Mode',
      description: 'Keep participants visible while navigating other pages.',
    },
    {
      icon: <BellRing size={28} />,
      title: 'Automatic Reminders',
      description: 'Timely email and in-app notifications to reduce no-shows.',
    },
    {
      icon: <Users size={28} />,
      title: 'Participant Management',
      description: 'Easily view, add, or remove attendees for privacy and control.',
    },
    {
      icon: <Link size={28} />,
      title: 'Secure Link Sharing',
      description: 'Invite external participants with one-click, encrypted links.',
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
    <section className={whyChooseSection} ref={sectionRef}>
      <div className={whyChooseContainer}>
        <motion.h2
          className={sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          The Smart Features That Power S Cubed Telehealth
        </motion.h2>

        <motion.div
          className={featuresGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={featureItem}
              variants={itemVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div
                className={featureInnerItem}
              >
                <motion.div className={featureIcon} >
                  {feature.icon}
                </motion.div>
                <div className={featureContent}>
                  <h3 className={featureTitle}>{feature.title}</h3>
                  <p className={featureDescription}>{feature.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TelehealthPlatformWhyChoose;
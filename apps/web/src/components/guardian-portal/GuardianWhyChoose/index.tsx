'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { Home, Shield, Smartphone, Users } from 'lucide-react';
import React, { useRef } from 'react';

import {
  featureContent,
  featureDescription,
  featureIcon,
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

const GuardianWhyChoose: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const features: Feature[] = [
    {
      icon: <Home size={28} />,
      title: 'Centralized Access',
      description: 'All your child\'s care details in one place',
    },
    {
      icon: <Shield size={28} />,
      title: 'Peace of Mind',
      description: 'Safe, secure, and HIPAA-compliant',
    },
    {
      icon: <Users size={28} />,
      title: 'Family-Friendly Design',
      description: 'Easy for busy parents to use',
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Always Accessible',
      description: 'Whether you\'re at home or on the go',
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
          Why Parents Choose S Cubed
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
                style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
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

export default GuardianWhyChoose;
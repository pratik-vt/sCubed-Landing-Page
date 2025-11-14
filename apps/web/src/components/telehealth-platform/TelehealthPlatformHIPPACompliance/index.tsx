'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { Award, CheckCircle2, BarChart3, HeadphonesIcon, Cross, GlobeLock, Link, UserLock } from 'lucide-react';
import React, { useRef } from 'react';

import {
  trustSection,
  container,
  sectionTitle,
  featuresGrid,
  featureCard,
  iconWrapper,
  featureTitle,
  featureDescription,
  featureContent,
} from './styles.css';

const TelehealthPlatformHIPPACompliance: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: <Cross size={28} />,
      title: 'Purpose-Built for Care',
      description:
        'Designed for the realities of modern healthcare delivery.',
      accentColor: '#7a7eed',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    },
    {
      icon: <UserLock size={28} />,
      title: 'Privacy as a Promise',
      description:
        'HIPAA-compliant, encrypted, and secure by design.',
      accentColor: '#22d3ee',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    },
    {
      icon: <Link size={28} />,
      title: 'Effortless for Everyone',
      description:
        'One link. One click. Every session runs smoothly.',
      accentColor: '#34d399',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    },
    {
      icon: <GlobeLock size={28} />,
      title: 'Everything in One Place',
      description:
        'From scheduling to sessions, it all works together.',
      accentColor: '#fb7185',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className={trustSection}>
      <div className={container}>
        <motion.h2
          className={sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Why Therapists Choose Our HIPAA-compliant Telehealth Platform 
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
              className={featureCard}
              variants={itemVariants}
              style={{
                background: feature.bgColor,
                borderLeft: `4px solid ${feature.accentColor}33`,
              }}
            >
              <div className={featureContent}>
                <div
                  className={iconWrapper}
                  style={{
                    background: `linear-gradient(135deg, ${feature.accentColor}22 0%, ${feature.accentColor}33 100%)`,
                    color: feature.accentColor,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className={featureTitle}>{feature.title}</h3>
              </div>
              <p
                className={featureDescription}
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TelehealthPlatformHIPPACompliance;

'use client';

import { motion, useInView, Variants } from 'framer-motion';
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

const Trust: React.FC<{ features: any[]; heading: string }> = ({ features, heading }: { features: any[]; heading: string }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
          {heading}
        </motion.h2>
        <motion.div
          className={featuresGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[...features].map((feature, index) => (
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

export default Trust;

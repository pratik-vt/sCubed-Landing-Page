'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { Award, CheckCircle2, BarChart3, HeadphonesIcon } from 'lucide-react';
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

const DataCollectionTrust: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: <Award size={28} />,
      title: 'Built for Real ABA Workflows',
      description:
        'S Cubed is developed by behavior analysts and therapists who understand what data collection looks like in <strong>real sessions</strong>, not just in theory.',
      accentColor: '#7a7eed',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    },
    {
      icon: <CheckCircle2 size={28} />,
      title: 'Accuracy You Can Count On',
      description:
        'Every goal, behavior, and note is stored securely and synced in <strong>real time</strong>, giving your team reliable, audit-ready data at any moment.',
      accentColor: '#22d3ee',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Clarity in Every Report',
      description:
        'Visual summaries turn progress into something you can actually see and explain, no extra formatting or manual graphing required.',
      accentColor: '#34d399',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    },
    {
      icon: <HeadphonesIcon size={28} />,
      title: 'Support That Understands ABA',
      description:
        'Get help from experts who speak the language of applied behavior analysis - not just tech support.',
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
          Why Do ABA Teams Trust S Cubed with Their Data?
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

export default DataCollectionTrust;

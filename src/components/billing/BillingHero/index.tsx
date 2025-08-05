import { motion, useInView, Variants } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';
import { CheckCircle } from 'lucide-react';
import React, { useRef } from 'react';

import CalendlyButton from '../CalendlyButton';
import { primaryButton } from '../CalendlyButton/styles.css';

import {
  backgroundImage,
  backgroundOverlay,
  bulletCard,
  bulletGrid,
  bulletIcon,
  bulletItem,
  bulletSection,
  bulletText,
  ctaSection,
  heroContainer,
  heroContent,
  heroDescription,
  heroImageContent,
  heroSection,
  heroTextContent,
  heroTitle,
  heroTitleHighlight,
} from './styles.css';

const BillingHero: React.FC = () => {
  const bulletSectionRef = useRef<HTMLDivElement>(null);
  const isBulletSectionInView = useInView(bulletSectionRef, {
    once: true,
    margin: '-100px',
  });

  const bulletPoints = [
    {
      text: 'Time-sensitive authorizations',
      color: '#7a7eed', // Primary purple
    },
    {
      text: 'Multi-disciplinary coding',
      color: '#22d3ee', // Teal
    },
    {
      text: 'Payer-specific requirements and denials',
      color: '#34d399', // Green
    },
  ];

  // Animation variants for the bullet items
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
  };

  const cardHoverVariants: Variants = {
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
    <>
      <section className={heroSection}>
        {/* Background Image */}
        <div className={backgroundImage}>
          <StaticImage
            src="../../../images/Billing.jpg"
            alt="Professional billing and financial management for healthcare practices"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
            }}
            layout="fullWidth"
            placeholder="blurred"
          />
          <div className={backgroundOverlay} />
        </div>

        <div className={heroContainer}>
          <div className={heroContent}>
            <div className={heroTextContent}>
              <h1 className={heroTitle}>
                Smarter Billing Services for{' '}
                <span className={heroTitleHighlight}>ABA, OT, Speech</span>, and{' '}
                <span className={heroTitleHighlight}>
                  School-Based Therapy Providers
                </span>
              </h1>
              <p className={heroDescription}>
                S Cubed specializes in Revenue Cycle Management (RCM) tailored
                for ABA, Occupational Therapy, Speech Therapy, Physical Therapy,
                and Counseling clinics. Whether you&apos;re a solo provider,
                school-based service, or a multi-location practice, our
                solutions simplify the entire billing lifecycle, so you can
                focus on care, not claims.
              </p>
              <div className={ctaSection}>
                <CalendlyButton
                  buttonText="Get Your Free Demo →"
                  className={primaryButton}
                />
              </div>
            </div>

            <div className={heroImageContent}>
              <StaticImage
                alt="Professional billing and financial management for healthcare practices"
                src="../../../images/Billing.jpg"
                quality={100}
                placeholder="blurred"
                layout="constrained"
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={bulletSection} ref={bulletSectionRef}>
        <div className={heroContainer}>
          <motion.div
            className={bulletCard}
            initial={{ opacity: 0, y: 50 }}
            animate={isBulletSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isBulletSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our experienced billing team understands the unique challenges of
              allied health and behavioral therapy services, including:
            </motion.h3>

            <motion.div
              className={bulletGrid}
              variants={containerVariants}
              initial="hidden"
              animate={isBulletSectionInView ? 'visible' : 'hidden'}
            >
              {bulletPoints.map((item, index) => (
                <motion.div
                  key={index}
                  className={bulletItem}
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <motion.div
                    className={bulletIcon}
                    style={{
                      background: `linear-gradient(135deg, ${item.color}33 0%, ${item.color}66 100%)`,
                      color: item.color,
                      borderColor: `${item.color}4D`,
                    }}
                    variants={cardHoverVariants}
                  >
                    <CheckCircle size={24} />
                  </motion.div>
                  <span className={bulletText}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isBulletSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              From patient intake to payment posting, S Cubed ensures accuracy,
              compliance, and faster reimbursements.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BillingHero;

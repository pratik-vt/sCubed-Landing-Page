'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { primaryButton } from '../../billing/CalendlyButton/styles.css';
import guardianPortalImg from '../../../images/guardian-portal.png';

import {
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

const GuardianHero: React.FC = () => {
  return (
    <section className={heroSection}>
      <div className={heroContainer}>
        <div className={heroContent}>
          <motion.div
            className={heroTextContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className={heroTitle}>
              Your <span className={heroTitleHighlight}>Child&apos;s Care</span>, Just a Click Away
            </h1>
            <p className={heroDescription}>
              Stay informed, stay involved, and stay connected - anytime, anywhere - with our secure Guardian Portal. 
              Our Guardian Portal is built to keep families engaged in their child&apos;s care journey. 
              It gives guardians secure, real-time access to everything they need. It simplifies communication, 
              progress tracking and appointments management so that guardians stay informed every step of the way.
            </p>
            <div className={ctaSection}>
              <Link 
                href={process.env.NEXT_PUBLIC_GUARDIAN_APP_URL + `auth/login`}
                className={primaryButton}
                style={{
                  fontSize: '18px',
                  textDecoration: 'none',
                }}
              >
                Login as Guardian →
              </Link>
            </div>
          </motion.div>

          <motion.div
            className={heroImageContent}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <Image
              alt="Guardian Portal Dashboard Interface"
              src={guardianPortalImg}
              quality={100}
              placeholder="blur"
              width={600}
              height={500}
              style={{
                marginTop: '40px',
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuardianHero;
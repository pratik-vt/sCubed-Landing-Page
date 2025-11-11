'use client';

import { motion } from 'framer-motion';
import { Check, Shield, TrendingUp } from 'lucide-react';

import {
  heroContainer,
  heroContent,
  heroDescription,
  heroTitle,
  trustBadge,
  trustBadges,
} from './styles.css';

const PricingHero: React.FC = () => {
  return (
    <section className={heroContainer}>
      <motion.div
        className={heroContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={heroTitle}>
          Simple, <span style={{ color: '#7a7eed' }}>Transparent Pricing</span>
          <br />
          That Grows With <span style={{ color: '#7a7eed' }}>Your Practice</span>
        </h1>
        <p className={heroDescription}>
          Choose the perfect plan for your therapy practice. All plans include unlimited clients,
          HIPAA-Grade security, and dedicated support. No hidden fees, no surprises.
        </p>

        <div className={trustBadges}>
          <div className={trustBadge}>
            <Shield size={20} />
            <span>HIPAA Compliant</span>
          </div>
          <div className={trustBadge}>
            <Check size={20} />
            <span>No Setup Fees</span>
          </div>
          <div className={trustBadge}>
            <TrendingUp size={20} />
            <span>Scale Anytime</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingHero;

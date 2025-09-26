'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain, Calendar, CreditCard, FileText, Users, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { colors, spacing, typography } from '../../../styles/tokens.css';

import {
  addonCard,
  addonDescription,
  addonIcon,
  addonLearnMore,
  addonName,
  addonPrice,
  addonsContainer,
  addonsGrid,
  addonsSection,
  addonsSubtitle,
  addonsTitle,
} from './styles.css';

interface Addon {
  icon: React.ReactNode;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
}

const addons: Addon[] = [
  {
    icon: <Video size={24} />,
    name: 'Telehealth',
    description: 'HIPAA-compliant video sessions with screen sharing and recording capabilities',
    price: '$100 per month per clinic',
  },
  {
    icon: <CreditCard size={24} />,
    name: 'Revenue Cycle Management',
    description: 'Complete billing service with claims submission, tracking, and denial management',
    price: '$499/month *',
    popular: true,
  },
  {
    icon: <Calendar size={24} />,
    name: 'VB-MAPP Assessment Builder',
    description: 'Comprehensive assessment tool for tracking developmental milestones',
    price: '$15 per kiddo per year',
  },
  {
    icon: <Brain size={24} />,
    name: 'AI Powered Assessment Builder',
    description: 'Intelligent assessments with automated scoring and progress tracking',
    price: '$39 per assessment',
  },
  {
    icon: <FileText size={24} />,
    name: 'Payroll Integration',
    description: 'Seamlessly connect with ADP and Gusto for automated payroll processing',
    price: '$700/month',
  },
  {
    icon: <Users size={24} />,
    name: 'VB-MAPP',
    description: 'Verbal Behavior Milestones Assessment and Placement Program',
    price: '$15 per kiddo per year',
  },
];

const PricingAddons: React.FC = () => {
  const router = useRouter();

  return (
    <section className={addonsSection}>
      <div className={addonsContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={addonsTitle}>
            Power Up <span style={{ color: '#7a7eed' }}>Your Practice</span> with Add-ons
          </h2>
          <p className={addonsSubtitle}>
            Enhance your S Cubed experience with specialized tools and services designed for
            therapy practices.
          </p>

          <div className={addonsGrid}>
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                className={addonCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={addonIcon}>{addon.icon}</div>
                <h3 className={addonName}>{addon.name}</h3>
                <p className={addonDescription}>{addon.description}</p>
                <div className={addonPrice}>{addon.price}</div>
                <button
                  className={addonLearnMore}
                  onClick={() => router.push('/contact-sales')}
                  aria-label={`Learn more about ${addon.name}`}
                >
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: spacing.lg }}>
            <p style={{ fontSize: typography.fontSize.sm, color: colors.neutral[600] }}>
              * Revenue Cycle Management pricing is based on percentage of collections. Contact
              sales for details.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingAddons;

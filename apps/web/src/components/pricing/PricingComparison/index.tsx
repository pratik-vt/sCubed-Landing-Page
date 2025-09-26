'use client';

import { motion } from 'framer-motion';
import { Check, Info, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { colors, spacing } from '../../../styles/tokens.css';

import {
  comparisonContainer,
  comparisonSection,
  comparisonTable,
  comparisonTitle,
  expandButton,
  featureCategory,
  featureCategoryTitle,
  featureCell,
  featureName,
  featureRow,
  headerCell,
  mobileCard,
  mobileCardHeader,
  mobileFeatureItem,
  mobileFeatureList,
  planHeader,
  sectionDescription,
  tooltip,
  tooltipIcon,
} from './styles.css';

interface Feature {
  name: string;
  description?: string;
  starter: boolean | string;
  essential: boolean | string;
  growth: boolean | string;
}

interface FeatureSection {
  category: string;
  features: Feature[];
}

const featureComparison: FeatureSection[] = [
  {
    category: 'Core Features',
    features: [
      {
        name: 'Unlimited Clients',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Documentation',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Security (HIPAA-grade)',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Reminders & Tasks',
        starter: true,
        essential: true,
        growth: true,
      },
    ],
  },
  {
    category: 'Scheduling & Communication',
    features: [
      {
        name: 'Appointment Scheduling',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Custom & Free Templates for Session Notes',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Smart Dashboard (Advanced, Customizable)',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Messaging (Staff & Client)',
        starter: true,
        essential: true,
        growth: true,
      },
    ],
  },
  {
    category: 'Data & Reports',
    features: [
      {
        name: 'Reports & Graphs',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Data Collection',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Behavior Tracking',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'VB-MAPP',
        starter: 'Add-on $15/year',
        essential: 'Add-on $15/year',
        growth: true,
      },
    ],
  },
  {
    category: 'Access & Support',
    features: [
      {
        name: 'Custom Roles & Permissions (Hierarchical)',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'In-App Notifications & Email',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Support & Training',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Mobile App & Tablet Support',
        starter: true,
        essential: true,
        growth: true,
      },
    ],
  },
  {
    category: 'Advanced Features',
    features: [
      {
        name: 'Clock In, Clock Out',
        starter: 'Add-on $9/month',
        essential: true,
        growth: true,
      },
      {
        name: 'Guardian Portal',
        starter: 'Add-on $19/month',
        essential: true,
        growth: true,
      },
      {
        name: 'Billing Portal (Includes Clearinghouses Fees)',
        starter: 'Add-on $49/month',
        essential: 'Add-on $49/month',
        growth: true,
      },
      {
        name: 'Telehealth/Hipaa Compliant Meetings',
        description: 'HIPAA-compliant video sessions',
        starter: 'Add-on $99/month',
        essential: 'Add-on $99/month',
        growth: 'Add-on $99/month',
      },
      {
        name: 'Full Revenue Cycle Management',
        description: 'Complete billing service with claims management',
        starter: 'Add-on $499/month',
        essential: 'Add-on $499/month',
        growth: 'Add-on $499/month',
      },
    ],
  },
];

const PricingComparison: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Core Features',
  ]);

  const toggleSection = (category: string) => {
    setExpandedSections((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const renderFeatureValue = (value: boolean | string | undefined) => {
    if (value === undefined) {
      return <Minus size={20} style={{ color: colors.neutral[400] }} />;
    }
    if (value === true) {
      return <Check size={20} style={{ color: colors.accent.green }} />;
    }
    if (value === false) {
      return <Minus size={20} style={{ color: colors.neutral[400] }} />;
    }
    return (
      <span style={{ fontSize: '12px', color: colors.primary[600] }}>
        {value}
      </span>
    );
  };

  return (
    <section className={comparisonSection}>
      <div className={comparisonContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={comparisonTitle}>
            Complete <span style={{ color: '#7a7eed' }}>Feature Comparison</span>
          </h2>
          <p className={sectionDescription}>
            See everything included in each plan, plus available add-ons to
            customize your experience.
          </p>

          {/* Desktop Table View */}
          <div className={comparisonTable}>
            <div
              className={featureRow}
              style={{
                position: 'sticky',
                top: 0,
                background: colors.white,
                zIndex: 10,
              }}
            >
              <div className={headerCell}>Features</div>
              <div className={planHeader}>
                <strong>Starter</strong>
                <span>$295/staff/year</span>
              </div>
              <div className={planHeader}>
                <strong>Essential</strong>
                <span>$499/staff/year</span>
              </div>
              <div className={planHeader}>
                <strong>Growth</strong>
                <span>$899/staff/year</span>
              </div>
            </div>

            {featureComparison.map((section) => (
              <div key={section.category} className={featureCategory}>
                <button
                  className={expandButton}
                  onClick={() => toggleSection(section.category)}
                >
                  <span className={featureCategoryTitle}>
                    {section.category}
                  </span>
                  {expandedSections.includes(section.category) ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </button>

                {expandedSections.includes(section.category) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.features.map((feature) => (
                      <div key={feature.name} className={featureRow}>
                        <div className={featureName}>
                          {feature.name}
                          {feature.description && (
                            <div className={tooltipIcon}>
                              <Info size={14} />
                              <div className={tooltip}>
                                {feature.description}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={featureCell}>
                          {renderFeatureValue(feature.starter)}
                        </div>
                        <div className={featureCell}>
                          {renderFeatureValue(feature.essential)}
                        </div>
                        <div className={featureCell}>
                          {renderFeatureValue(feature.growth)}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Card View */}
          <div className={mobileCard}>
            {['Starter', 'Essential', 'Growth'].map((plan) => (
              <div key={plan} style={{ marginBottom: spacing.lg }}>
                <div className={mobileCardHeader}>
                  <h3>{plan}</h3>
                  <span>
                    $
                    {plan === 'Starter'
                      ? '295'
                      : plan === 'Essential'
                        ? '499'
                        : '899'}
                    /staff/year
                  </span>
                </div>
                <div className={mobileFeatureList}>
                  {featureComparison.map((section) => (
                    <div key={section.category}>
                      <h4>{section.category}</h4>
                      {section.features.map((feature) => (
                        <div key={feature.name} className={mobileFeatureItem}>
                          <span>{feature.name}</span>
                          <span>
                            {renderFeatureValue(
                              feature[plan.toLowerCase() as keyof Feature],
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingComparison;

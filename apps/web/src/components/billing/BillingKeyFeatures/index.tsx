'use client';

import {
  BarChart2,
  Brain,
  ChevronDown,
  ChevronUp,
  Clipboard,
  DollarSign,
  FileText,
  Mail,
  Rocket,
  Search,
  Settings,
  TrendingDown,
} from 'lucide-react';
import React, { useState } from 'react';

import {
  featureCard,
  featureDescription,
  featureIconWrapper,
  featuresGrid,
  featureTitle,
  keyFeaturesContainer,
  keyFeaturesSection,
  sectionDescription,
  sectionTitle,
  showMoreButton,
  showMoreContainer,
} from './styles.css';

const BillingKeyFeaturesDefault = 8;

const BillingKeyFeatures: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const features = [
    {
      icon: <FileText size={24} />,
      title: 'Client Intake & Insurance Capture',
      description:
        'Streamline patient onboarding with automated insurance verification',
      accentColor: '#7a7eed', // Primary purple
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    },
    {
      icon: <Search size={24} />,
      title: 'Real-Time Eligibility Checks',
      description: 'Instantly verify coverage and benefits before treatment',
      accentColor: '#22d3ee', // Teal
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    },
    {
      icon: <Brain size={24} />,
      title: 'Clinical Notes to Billing Codes',
      description: 'AI-powered coding suggestions from session documentation',
      accentColor: '#34d399', // Green
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    },
    {
      icon: <Settings size={24} />,
      title: 'Automated Charge Capture',
      description: 'Never miss billable services with intelligent automation',
      accentColor: '#fb7185', // Coral
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
    },
    {
      icon: <Rocket size={24} />,
      title: 'Fast, Clean Claims Submission',
      description: 'Submit error-free claims in seconds, not hours',
      accentColor: '#a78bfa', // Light purple
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Payment Posting',
      description: 'Automated ERA posting and payment reconciliation',
      accentColor: '#fbbf24', // Amber
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
    },
    {
      icon: <TrendingDown size={24} />,
      title: 'Denial Management & Recovery',
      description: 'Track, appeal, and recover denied claims efficiently',
      accentColor: '#f87171', // Red
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
    },
    {
      icon: <Mail size={24} />,
      title: 'Patient Billing & Follow-Up',
      description: 'Automated statements and payment reminders',
      accentColor: '#8b5cf6', // Purple
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    },
    {
      icon: <BarChart2 size={24} />,
      title: 'Reporting & Analytics',
      description: 'Real-time insights into practice financial health',
      accentColor: '#06b6d4', // Cyan
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    },
    {
      icon: <Clipboard size={24} />,
      title: 'Invoice Management',
      description: 'Professional invoicing for private pay clients',
      accentColor: '#10b981', // Emerald
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    },
  ];

  const displayedFeatures = showAll
    ? features
    : features.slice(0, BillingKeyFeaturesDefault);
  const hasMoreFeatures = features.length > BillingKeyFeaturesDefault;

  return (
    <section className={keyFeaturesSection}>
      <div className={keyFeaturesContainer}>
        <h2 className={sectionTitle}>Key Features That Power Your ABA Billing Practice</h2>
        <p className={sectionDescription}>
          Everything you need for comprehensive revenue cycle management
        </p>
        <div className={featuresGrid}>
          {displayedFeatures.map((feature, index) => (
            <div
              key={index}
              className={featureCard}
              style={{
                background: feature.bgColor,
                borderLeft: `3px solid ${feature.accentColor}`,
              }}
            >
              <div
                className={featureIconWrapper}
                style={{
                  background: `linear-gradient(135deg, ${feature.accentColor}22 0%, ${feature.accentColor}33 100%)`,
                  color: feature.accentColor,
                }}
              >
                {feature.icon}
              </div>
              <h3 className={featureTitle}>{feature.title}</h3>
              <p className={featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        {hasMoreFeatures && (
          <div className={showMoreContainer}>
            <button
              className={showMoreButton}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp size={20} />
                </>
              ) : (
                <>
                  Show More Features
                  <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BillingKeyFeatures;

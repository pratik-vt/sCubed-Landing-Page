import { BarChart3, Shield, TrendingUp, Users } from 'lucide-react';
import React from 'react';

import {
  featureCard,
  featureDescription,
  featureIconWrapper,
  featuresContainer,
  featuresGrid,
  featuresSection,
  featureTitle,
  sectionTitle,
} from './styles.css';

const BillingFeatures: React.FC = () => {
  const features = [
    {
      icon: <Users size={28} />,
      title: 'Built for Therapy',
      description:
        'Specifically designed for ABA and allied health clinics, including school-based services',
      accentColor: '#7a7eed', // Primary purple
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    },
    {
      icon: <Shield size={28} />,
      title: 'Total Compliance & Accuracy',
      description: 'Reduce errors, denials, and delays',
      accentColor: '#22d3ee', // Teal accent
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Clear, Real-Time Insights',
      description: 'Know exactly where every claim stands',
      accentColor: '#34d399', // Green accent
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Scalable for Growth',
      description: 'Perfect for growing practices and expanding programs',
      accentColor: '#fb7185', // Coral accent
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
    },
  ];

  return (
    <section className={featuresSection}>
      <div className={featuresContainer}>
        <h2 className={sectionTitle}>Why Choose S Cubed?</h2>
        <div className={featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={featureCard}
              style={{
                background: feature.bgColor,
                borderLeft: `4px solid ${feature.accentColor}33`, // Fixed opacity syntax
              }}
            >
              <div
                className={featureIconWrapper}
                style={{
                  background: `linear-gradient(135deg, ${feature.accentColor}22 0%, ${feature.accentColor}33 100%)`, // Fixed opacity syntax
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
      </div>
    </section>
  );
};

export default BillingFeatures;

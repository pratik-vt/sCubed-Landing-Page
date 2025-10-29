'use client';

import {
  BarChart3,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  MessageSquare,
  Settings,
  Target,
  ClipboardClock,
  BellRing,
  CalendarDays,
  Timer,
  View,
  Siren
} from 'lucide-react';
import React, { cloneElement } from 'react';

import {
  coreFeatureCard,
  coreFeatureDescription,
  coreFeatureIcon,
  coreFeatures,
  coreFeatureTitle,
  featuresContainer,
  featuresSection,
  sectionBackground,
  sectionDescription,
  sectionHeader,
  sectionTitle,
} from './style.css';


const Workflow: React.FC = () => {

  const coreFeaturesList = [
    {
      icon: <View />,
      title: 'Authorization Intelligence',
      description:
        'See every approval in one clear view, track usage, expirations, and renewals effortlessly.',
    },
    {
      icon: <Timer />,
      title: 'Auto-compliance Mapping',
      description:
        'Save hours of manual cross-checking with automatic code mapping built for audit-readiness.',
    },
    {
      icon: <Siren />,
      title: 'Predictive alerts',
      description:
        'Smart in-app and email alerts keep your team ahead before units or dates run out.',
    },    
  ];


  return (
    <section className={featuresSection}>
      <div className={sectionBackground} />
      <div className={featuresContainer}>
        <div className={sectionHeader}>
          <h2 className={sectionTitle}>
          How <span style={{ color: '#7a7eed' }}>Authorizations</span> Stay in Sync With Your Workflow
          </h2>
          
        </div>

        {/* Core Features Grid */}
        <div id="practice-management" className={coreFeatures}>
          {coreFeaturesList.map((feature, index) => (
            <div
              key={feature.title}
              className={coreFeatureCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={coreFeatureIcon}>
                {cloneElement(feature.icon as React.ReactElement, {
                  size: 24,
                } as any)}
              </div>
              <h3 className={coreFeatureTitle}>{feature.title}</h3>
              <p className={coreFeatureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;

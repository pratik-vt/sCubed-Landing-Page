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
  Timer
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


const FeaturesTherapy: React.FC = () => {

  const coreFeaturesList = [
    {
      icon: <ClipboardClock />,
      title: 'Intelligent Appointment Management',
      description:
        'Schedule or reschedule your appointments easily, eliminating any and every confusion',
    },
    {
      icon: <BellRing />,
      title: 'Smart Reminders',
      description:
        'Minimize missed appointments with most accurate and timely notifications',
    },
    {
      icon: <Calendar />,
      title: 'Dynamic Color-coded Calendar',
      description:
        'Identify the appointment types instantly in different color',
    },
    {
      icon: <BarChart3 />,
      title: 'Guardian Portal Access',
      description:
        'The Guardians can access their Kids progress in the Guardian portal.',
    },
    {
      icon: <MessageSquare />,
      title: 'Secure Messaging & Group Chat',
      description:
        'Staff members can communicate securely with Guardians and other staff members',
    },
    {
      icon: <Clock />,
      title: 'Recurring Session Scheduling',
      description:
        'Maintain consistent therapy schedules by setting recurring appointments only once',
    },
    {
      icon: <CalendarDays />,
      title: 'Advanced Calendar Views',
      description:
        'Analyze, manage and filter complex appointments with precision and clarity',
    },
    {
      icon: <Timer />,
      title: 'Real-Time Availability Tracking',
      description:
        "Easily view therapist availability in real time to schedule sessions faster and avoid conflicts.",
    },
  ];


  return (
    <section className={featuresSection}>
      <div className={sectionBackground} />
      <div className={featuresContainer}>
        <div className={sectionHeader}>
          <h2 className={sectionTitle}>
          Key Features That Support Your{' '}
            <span style={{ color: '#7a7eed' }}>Therapy</span>
          </h2>
          <p className={sectionDescription}>
            Our therapy scheduling software makes day to day scheduling less of a struggle.
          </p>
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

export default FeaturesTherapy;

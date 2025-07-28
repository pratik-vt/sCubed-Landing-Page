import { StaticImage } from 'gatsby-plugin-image';
import { CheckCircle } from 'lucide-react';
import React from 'react';

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
                Smarter Billing for{' '}
                <span className={heroTitleHighlight}>Therapy Clinics</span> &{' '}
                <span className={heroTitleHighlight}>
                  School-Based Services
                </span>
              </h1>
              <p className={heroDescription}>
                S Cubed specializes in Revenue Cycle Management (RCM) tailored
                for ABA, Occupational Therapy, Speech Therapy, Physical Therapy,
                and Counseling clinics. Whether you&apos;re a solo provider,
                school-based service, or a multi-location practice, our
                solutions simplify the entire billing lifecycle—so you can focus
                on care, not claims.
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

      <section className={bulletSection}>
        <div className={heroContainer}>
          <div className={bulletCard}>
            <h3>
              Our experienced billing team understands the unique challenges of
              allied health and behavioral therapy services, including:
            </h3>
            <div className={bulletGrid}>
              {bulletPoints.map((item, index) => (
                <div key={index} className={bulletItem}>
                  <div
                    className={bulletIcon}
                    style={{
                      background: `linear-gradient(135deg, ${item.color}33 0%, ${item.color}66 100%)`,
                      color: item.color,
                      borderColor: `${item.color}4D`,
                    }}
                  >
                    <CheckCircle size={24} />
                  </div>
                  <span className={bulletText}>{item.text}</span>
                </div>
              ))}
            </div>
            <p>
              From patient intake to payment posting, S Cubed ensures accuracy,
              compliance, and faster reimbursements.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BillingHero;

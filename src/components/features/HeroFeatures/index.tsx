import { StaticImage } from 'gatsby-plugin-image';
import { Award, Play, Settings, Shield } from 'lucide-react';
import React, { useState } from 'react';

import CalendlyButton from '../CalendlyButton';
import VideoModal from '../VideoModal';

import {
  backgroundImage,
  backgroundOverlay,
  buttonContainer,
  featureCard,
  featureCards,
  featureCardsWrapper,
  featureDescription,
  featureIcon,
  featureTitle,
  floatingElement1,
  floatingElement2,
  heroBadge,
  heroBadgeDot,
  heroContainer,
  heroContent,
  heroSection,
  heroSubtitle,
  heroTitle,
  playIcon,
  primaryButton,
  secondaryButton,
  trustBadge,
  trustBadgeLink,
  trustBadges,
  trustIcon,
  trustText,
} from './style.css';

const HeroFeatures: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleWatchDemo = () => {
    setVideoUrl('https://www.youtube.com/watch?v=XpLFdVnEins');
    setIsVideoModalOpen(true);
  };

  return (
    <>
      <section className={heroSection}>
        {/* Background Image */}
        <div className={backgroundImage}>
          <StaticImage
            src="../../../images/transform-clinic.png"
            alt="Healthcare professional with child patient"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.6,
            }}
            layout="fullWidth"
            placeholder="blurred"
          />
          <div className={backgroundOverlay} />
        </div>

        <div className={heroContainer}>
          <div className={heroContent}>
            <div className={heroBadge}>
              <span className={heroBadgeDot}></span>
              Created by Experts, Built for Real-World Needs
            </div>

            <h1 className={heroTitle}>
              Powerful & Fully Integrated{' '}
              <span style={{ color: '#7a7eed' }}>
                Practice Management Platform
              </span>{' '}
              To Streamline Your Practice
            </h1>

            <p className={heroSubtitle}>
              All-in-One Software for Clinical, Educational, and Therapy
              Management.
              <br />
              Everything You Need, All in One Place.
            </p>

            <div className={buttonContainer}>
              <CalendlyButton
                className={primaryButton}
                buttonText="Schedule Free Demo →"
              />
              <button className={secondaryButton} onClick={handleWatchDemo}>
                <Play className={playIcon} size={16} />
                Watch Demo
              </button>
            </div>

            <div className={trustBadges}>
              <div className={trustBadge}>
                <Shield className={trustIcon} size={16} />
                <span className={trustText}>HIPAA Compliant</span>
              </div>
              <div className={trustBadge}>
                <Award className={trustIcon} size={16} />
                <span className={trustText}>Built by BCBAs</span>
              </div>
              <a
                href="https://www.capterra.com/p/10030734/S-Cubed/"
                target="_blank"
                rel="noopener noreferrer"
                className={trustBadgeLink}
              >
                <Settings className={trustIcon} size={16} />
                <span className={trustText}>Capterra</span>
              </a>
            </div>
          </div>

          <div className={featureCardsWrapper}>
            <div className={featureCards}>
              <div className={featureCard}>
                <div className={featureIcon}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e0e7ff',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6366f1',
                    }}
                  >
                    🏥
                  </div>
                </div>
                <h3 className={featureTitle}>ABA, Speech, OT, PT & More</h3>
                <p className={featureDescription}>
                  Support for ABA, Speech Therapy, Physical and Occupational
                  Therapy, and Counseling services.
                </p>
              </div>

              <div className={featureCard}>
                <div className={featureIcon}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#f3e8ff',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7a7eed',
                    }}
                  >
                    ⚡
                  </div>
                </div>
                <h3 className={featureTitle}>Smart Automation</h3>
                <p className={featureDescription}>
                  Automated billing, goal tracking, and documentation to reduce
                  administrative burden.
                </p>
              </div>

              <div className={featureCard}>
                <div className={featureIcon}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#ecfdf5',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                    }}
                  >
                    🔧
                  </div>
                </div>
                <h3 className={featureTitle}>Flexible for Any Setting</h3>
                <p className={featureDescription}>
                  Private practice, school-based clinic, or multidisciplinary
                  environment - S Cubed adapts to your workflow.
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div style={{ position: 'relative' }}>
              <div className={floatingElement1} />
              <div className={floatingElement2} />
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default HeroFeatures;

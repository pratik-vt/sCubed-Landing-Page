'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
  ctaButton,
  ctaContent,
  ctaDescription,
  ctaSection,
  ctaTitle,
  iconStyle,
} from './styles.css';

const CTA: React.FC = () => {
  const router = useRouter();

  return (
    <div className={ctaSection}>
      <div className={ctaContent}>
        <h3 className={ctaTitle}>Ready to Transform Your Practice?</h3>
        <p className={ctaDescription}>
          Join thousands of therapy practices using S Cubed to streamline their operations.
        </p>
      </div>
      <button
        className={ctaButton}
        onClick={() => router.push('/get-started')}
        aria-label="Get started with S Cubed"
      >
        Get Started
        <ArrowRight className={iconStyle} />
      </button>
    </div>
  );
};

export default CTA;

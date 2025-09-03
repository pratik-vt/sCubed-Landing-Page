'use client';

import { format } from '@react-input/mask';
import { ExternalLink, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import bacbaImage from '../../images/BACBA.jpg';
import logoImage from '../../images/HeaderLogo.png';
import hipaaImage from '../../images/HIPAA.png';

import {
  bottomSection,
  brandDescription,
  brandSection,
  certificationImage,
  columnTitle,
  contactInfo,
  contactItem,
  copyrightText,
  footerColumn,
  footerContainer,
  footerContent,
  footerLink,
  footerWrapper,
  hipaaLogo,
  iconStyle,
  legalLink,
  legalLinks,
  logosRow,
  logoWrapper,
} from './styles.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  // Get environment variables for contact information
  const rawPhone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const phoneNumber = rawPhone
    ? format(rawPhone, { mask: '(___) ___-____', replacement: { _: /\d/ } })
    : '';
  const phoneLink = rawPhone ? `tel:${rawPhone}` : '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <footer className={footerWrapper}>
      <div className={footerContainer}>
        {/* Main Footer Content */}
        <div className={footerContent}>
          {/* Brand Section */}
          <div className={brandSection}>
            <div className={logosRow}>
              <div className={logoWrapper} onClick={handleLogoClick}>
                <Image 
                  src={logoImage} 
                  alt="S Cubed" 
                  placeholder="blur" 
                  quality={100} 
                  style={{ width: 'auto', height: '70px' }}
                />
              </div>
              <Image 
                src={hipaaImage} 
                alt="HIPAA Compliant" 
                className={hipaaLogo}
                quality={100}
              />
              <Image 
                src={bacbaImage} 
                alt="BACBA Certification" 
                className={certificationImage}
                placeholder="blur" 
                quality={100}
              />
            </div>
            <p className={brandDescription}>
              S Cubed strives to leave a positive impact on every child who needs
              help by ensuring our advanced clinical and practice management
              solutions are nothing short of the best for our practitioners.
              <br />
              S Cubed, or Spectrum Solutions Software, aims to revolutionize the effectiveness of therapy practices and improve client care.
            </p>
          </div>

          {/* Company */}
          <div className={footerColumn}>
            <h4 className={columnTitle}>Company</h4>
            <Link href="/" className={footerLink}>
              Home
            </Link>
            <Link href="/billing" className={footerLink}>
              Billing
            </Link>
            <Link href="/features" className={footerLink}>
              Features
            </Link>
            <Link href="/guardian-portal" className={footerLink}>
              Guardian Portal
            </Link>
          </div>

          {/* Resources */}
          <div className={footerColumn}>
            <h4 className={columnTitle}>Resources</h4>
            <a
              href={process.env.NEXT_PUBLIC_GUARDIAN_APP_URL + `auth/login`}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLink}
            >
              Guardian Portal Login <ExternalLink className={iconStyle} style={{ display: 'inline-block', width: '14px', height: '14px', marginLeft: '4px' }} />
            </a>
            <Link href="/blog" className={footerLink}>
              Blog
            </Link>
            <Link href="/faqs" className={footerLink}>
              FAQs
            </Link>
          </div>

          {/* Contact */}
          <div className={footerColumn}>
            <h4 className={columnTitle}>Contact</h4>
            <div className={contactInfo}>
              {phoneNumber && (
                <a href={phoneLink} className={contactItem}>
                  <Phone className={iconStyle} />
                  {phoneNumber}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className={contactItem}>
                  <Mail className={iconStyle} />
                  {email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={bottomSection}>
          <span className={copyrightText}>
            © {currentYear} S Cubed. All rights reserved.
          </span>
          <div className={legalLinks}>
            <Link href="/terms-conditions" className={legalLink}>
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className={legalLink}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
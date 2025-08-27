'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

import {
  bottomFooter,
  footer,
  footerContent,
  footerDesc,
  footerLinks,
  InnerContainerStyle,
  links,
  rights,
} from '../Container/style.css';
import logoWhite from '../../images/scubed logo white.png';

function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <div className={footer}>
      <div className={InnerContainerStyle}>
        <div className={footerContent}>
          <div onClick={() => router.push('/')}>
            <Image src={logoWhite} alt="S Cubed" placeholder="blur" quality={100} />
          </div>
          <p className={footerDesc}>
            S Cubed strives to leave a positive impact on every child who needs
            help by ensuring our advanced clinical and practice management
            solutions are nothing short of the best for our practitioners. S
            Cubed, or Spectrum Solutions Software, aims to revolutionize the
            effectiveness of therapy practices and improve client care.
          </p>
        </div>
        <div className={bottomFooter}>
          <span className={rights}>© {currentYear} S Cubed. All rights reserved.</span>
          <div className={footerLinks}>
            <Link className={links} href={`/faqs`}>
              FAQs
            </Link>
            <a
              className={links}
              href={process.env.NEXT_PUBLIC_GUARDIAN_APP_URL || ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              Guardian Portal
            </a>
            <Link className={links} href={`/terms-conditions`}>
              Terms & Conditions
            </Link>
            <Link className={links} href={`/privacy-policy`}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

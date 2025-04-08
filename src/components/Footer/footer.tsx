import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link, navigate } from 'gatsby';

import {
  footer,
  InnerContainerStyle,
  footerContent,
  bottomFooter,
  footerLinks,
  links,
  rights,
  footerDesc,
} from '../Container/style.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={footer}>
      <div className={InnerContainerStyle}>
        <div className={footerContent}>
          <div onClick={() => navigate('/')}>
            <StaticImage
              src="../../images/scubed logo white.png"
              alt="S Cubed"
              placeholder="blurred"
              quality={100}
            />
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
          <span className={rights}>
            © {currentYear} S Cubed. All rights reserved.
          </span>
          <div className={footerLinks}>
            <Link className={links} to={`/terms-conditions`}>
              Terms & Conditions
            </Link>
            <Link className={links} to={`/privacy-policy`}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

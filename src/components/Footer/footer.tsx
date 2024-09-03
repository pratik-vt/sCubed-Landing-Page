import React from 'react';

import {
  footer,
  InnerContainerStyle,
  footerLogo,
  footerContent,
  bottomFooter,
  footerLinks,
  links,
  rights,
  inputField,
  Submitbtn,
  footerDesc,
  form,
  demoSection,
} from '../Container/style.css';
import logoWhite from '../../images/scubed logo white.png';
import { StaticImage } from 'gatsby-plugin-image';

const demoInfo: React.CSSProperties = {
  fontSize: `24px`,
  color: `#ffffff`,
  fontWeight: `500`,
  borderBottom: `2px solid #fff`,
};

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
}

interface UsernameFormElement extends HTMLFormElement {
  // now we can override the elements type to be an HTMLFormControlsCollection
  // of our own design...
  readonly elements: FormElements
}

function Footer() {
  const handleSubmit = (event: React.FormEvent<UsernameFormElement>) => {
    event.preventDefault()
    if (event.currentTarget instanceof Element){
      const email = event.currentTarget?.elements.email
      email.value = '';
    }
  };
  return (
    <div className={footer}>
      <div className={InnerContainerStyle}>
        <div className={footerLogo}>
          <div>
            <StaticImage src="../../images/scubed logo white.png" alt='S Cubed' placeholder="blurred" />
          </div>
          <div className={demoSection}>
            <span style={demoInfo}>Book A Demo</span>
          </div>
        </div>
        <div className={footerContent}>
          <p className={footerDesc}>
            S Cubed strives to leave a positive impact on every child who needs
            help by ensuring our advanced clinical and practice management
            solutions are nothing short of the best for our practitioners. S
            Cubed, or Spectrum Solutions Software, aims to revolutionize the
            effectiveness of therapy practices and improve client care.
          </p>
          <form className={form} onSubmit={handleSubmit}>
            <input className={inputField} type="email" placeholder="Email" id="email" required />
            <button type="submit" className={Submitbtn}>
              SUBMIT
            </button>
          </form>
        </div>
        <div className={bottomFooter}>
          <span className={rights}>© 2024 S Cubed. All rights reserved.</span>
          <div className={footerLinks}>
            <a className={links} href={process.env.GATSBY_ADMIN_APP_URL + `info/terms_conditions`}>
              Terms & Conditions
            </a>
            <a className={links} href={process.env.GATSBY_ADMIN_APP_URL + `info/privacy`}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

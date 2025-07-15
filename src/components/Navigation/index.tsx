import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import { format } from '@react-input/mask';
import { Phone, Mail, MapPin } from 'lucide-react';

import {
  activeNavStyle,
  navStyle,
  hamburger,
  bar,
  navMenu,
  navMenuOpen,
  activeLinkStyle,
  closeButtonWrapper,
  crossLine1,
  crossLine2,
  headerContentStyles,
  logoOuter,
  contactInfoContainer,
  contactInfoWrapper,
  contactInfoGroup,
  contactInfoItem,
  contactInfoLink,
  socialIconWrapper,
  socialIconsContainer,
  loginButton,
  iconWrapper,
} from './styles.css';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  // Get environment variables for contact information
  const phoneNumber = format(process.env.GATSBY_PHONE_NUMBER!, {
    mask: '(___) ___-____',
    replacement: { _: /\d/ },
  });
  const phoneLink = process.env.GATSBY_PHONE_NUMBER;
  const email = process.env.GATSBY_EMAIL;
  const address = process.env.GATSBY_ADDRESS;
  // Get environment variables for social media links
  const fbUrl = process.env.GATSBY_FACEBOOK_URL;
  const instaUrl = process.env.GATSBY_INSTAGRAM_URL;
  const youtubeUrl = process.env.GATSBY_YOUTUBE_URL;
  const linkedinUrl = process.env.GATSBY_LINKEDIN_URL;

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className={contactInfoContainer}>
        <div className={contactInfoWrapper}>
          <div className={contactInfoGroup}>
            <div className={contactInfoItem}>
              <div className={iconWrapper} title="Call us">
                <Phone size={16} />
              </div>
              <a href={`tel:+1${phoneLink}`} className={contactInfoLink}>
                {phoneNumber}
              </a>
            </div>
            <div className={contactInfoItem}>
              <div className={iconWrapper} title="Email us">
                <Mail size={16} />
              </div>
              <a href={`mailto:${email}`} className={contactInfoLink}>
                {email}
              </a>
            </div>
            <div className={contactInfoItem}>
              <div className={iconWrapper} title="Visit us">
                <MapPin size={16} />
              </div>
              <span>{address}</span>
            </div>
          </div>
          <div className={socialIconsContainer}>
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
              </svg>
            </a>
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={socialIconWrapper}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className={headerContentStyles}>
        <div className={logoOuter} onClick={() => navigate('/')}>
          <StaticImage
            alt="S Cubed"
            src="../../images/HeaderLogo.png"
            quality={100}
            placeholder="blurred"
          />
        </div>
        <nav className={`${navMenu} ${menuOpen ? navMenuOpen : ''}`}>
          <Link to="/" className={navStyle} activeClassName={activeNavStyle}>
            Home {pathname === '/' && <span className={activeLinkStyle} />}
          </Link>
          <a
            href={process.env.GATSBY_ADMIN_APP_URL + `info/get_started`}
            className={navStyle}
          >
            Get Started
          </a>
          <Link
            to="/features"
            className={navStyle}
            activeClassName={activeNavStyle}
          >
            Features{' '}
            {(pathname === '/features' || pathname === '/features/') && (
              <span className={activeLinkStyle} />
            )}
          </Link>
          <button
            className={loginButton}
            onClick={() =>
              window.location.assign(
                (process.env.GATSBY_ADMIN_APP_URL + `auth/login`) as string,
              )
            }
          >
            Login
          </button>
        </nav>
        {!menuOpen ? (
          <div className={hamburger} onClick={toggleMenu}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={bar}></div>
            ))}
          </div>
        ) : (
          <div className={closeButtonWrapper} onClick={toggleMenu}>
            <div className={crossLine1}>
              <div className={crossLine2}></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;

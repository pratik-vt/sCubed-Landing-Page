import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import { format } from '@react-input/mask';

import Button from '../Button/button';
import { buttonStyle } from '../Container/style.css';

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
} from './styles.css';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  // Get environment variables for contact information
  const phoneNumber = format(process.env.GATSBY_PHONE_NUMBER!, {
    mask: '(___) ____-___',
    replacement: { _: /\d/ },
  });
  const phoneLink = process.env.GATSBY_PHONE_NUMBER;
  const email = process.env.GATSBY_EMAIL;
  const address = process.env.GATSBY_ADDRESS;
  // Get environment variables for social media links
  const fbUrl = process.env.GATSBY_FACEBOOK_URL;
  const instaUrl = process.env.GATSBY_INSTAGRAM_URL;
  const youtubeUrl = process.env.GATSBY_YOUTUBE_URL;

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <a href={`tel:+1${phoneLink}`} className={contactInfoLink}>
                {phoneNumber}
              </a>
            </div>
            <div className={contactInfoItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <a href={`mailto:${email}`} className={contactInfoLink}>
                {email}
              </a>
            </div>
            <div className={contactInfoItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
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
          <Button
            className={buttonStyle}
            color="#fff"
            backgroundColor="#7a7eed"
            width="170px"
            onClick={() =>
              window.location.assign(
                (process.env.GATSBY_ADMIN_APP_URL + `auth/login`) as string,
              )
            }
          >
            Login
          </Button>
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

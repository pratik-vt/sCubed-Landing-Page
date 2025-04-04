import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';

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
  contactInfoItem,
  contactInfoLink,
} from './styles.css';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  // Get environment variables for contact information
  const phoneNumber = process.env.GATSBY_PHONE_NUMBER;
  const phoneLink = process.env.GATSBY_PHONE_LINK;
  const email = process.env.GATSBY_EMAIL;
  const address = process.env.GATSBY_ADDRESS;

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
            <a href={phoneLink} className={contactInfoLink}>
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

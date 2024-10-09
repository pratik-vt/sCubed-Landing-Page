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
} from './styles.css';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow')
    }

    return () => {
      document.body.style.removeProperty('overflow')
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
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
  );
};

export default Navigation;

import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Button from '../Button/button';
import {
  headingStyle,
  headerContentStyles,
  logoOuter,
  buttonStyle,
  descStyle,
} from '../Container/style.css';
import BookDemoForm from '../ModalForm';

import {
  activeNavStyle,
  headerWrapperStyles,
  bannerImg,
  navStyle,
  pageStyles,
  hamburger,
  bar,
  navMenu,
  navMenuOpen,
  activeLinkStyle,
  closeButtonWrapper,
  crossLine1,
  crossLine2,
  textBlockStyle,
} from './styles.css';

const Header: React.FC = () => {
  const [headerBackground, setHeaderBackground] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBackground(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <main className={pageStyles}>
      <div
        className={headerWrapperStyles}
        style={{
          backgroundColor: headerBackground ? '#fff' : 'transparent',
        }}
      >
        <div className={headerContentStyles}>
          <div className={logoOuter}>
            <StaticImage
              alt="S Cubed"
              src="../../images/HeaderLogo.png"
              quality={100}
              placeholder="blurred"
            />
          </div>
          <nav className={`${navMenu} ${menuOpen ? navMenuOpen : ''}`}>
            <Link to="/" className={navStyle} activeClassName={activeNavStyle}>
              Home <span className={activeLinkStyle} />
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
                window.location.replace(
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
      </div>
      <StaticImage
        alt="Description of the image"
        src="../../images/Banner.jpg"
        layout="fullWidth"
        quality={100}
        placeholder="blurred"
        className={bannerImg}
      />
      <div className={textBlockStyle}>
        <p className={headingStyle}>
          Empowering Your Practice, Enhancing Every Life You Touch
        </p>
        <p className={descStyle}>
          S Cubed is an all-in-one platform packed with powerful Clinical &
          Practice Management functionalities allowing you to focus on
          delivering exceptional care with less hassle and enhanced results.
        </p>
        <BookDemoForm
          buttonColor="rgb(51, 51, 51)"
          buttonBackground="#a0f5d1"
        />
      </div>
    </main>
  );
};

export default Header;

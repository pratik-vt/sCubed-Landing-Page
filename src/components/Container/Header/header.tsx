import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Button from '../../Button/button';
import {
  textBlockStyle,
  bannerImg,
  headingStyle,
  hamburger,
  bar,
  navmenu,
  navMenuOpen,
  activeLinkStyle,
  headerContentStyles,
  logoOuter,
  buttonStyle,
  descStyle,
} from '../../Container/style.css';
import BookDemoForm from '../../ModalForm';

import {
  activeNavStyle,
  headerWrapperStyles,
  navStyle,
  pageStyles,
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
              alt="Description of the image"
              src="../../../images/HeaderLogo.png"
              quality={100}
              placeholder="blurred"
            />
          </div>
          <nav className={`${navmenu} ${menuOpen ? navMenuOpen : ''}`}>
            <Link to="/" className={navStyle} activeClassName={activeNavStyle}>
              Home <span className={activeLinkStyle} />
            </Link>
            <a href={process.env.GATSBY_ADMIN_APP_URL + `info/get_started`} className={navStyle}>
              Get Started
            </a>
            <Button
              className={buttonStyle}
              color="#fff"
              backgroundColor="#7a7eed"
              width="170px"
              onClick={() =>
                window.location.replace(process.env.GATSBY_ADMIN_APP_URL + `auth/login` as string)
              }
            >
              Login
            </Button>
          </nav>
          <div className={hamburger} onClick={toggleMenu}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={bar}></div>
            ))}
          </div>
        </div>
      </div>
      <StaticImage
        // height={1060}
        alt="Description of the image"
        src="../../../images/Banner.jpg"
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

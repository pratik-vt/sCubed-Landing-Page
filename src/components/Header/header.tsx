import React, { useState, useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image';

// import Button from '../Button/button';
import { headingStyle, descStyle } from '../Container/style.css';
import BookDemoForm from '../ModalForm';
import Navigation from '../Navigation';

import {
  headerWrapperStyles,
  bannerImg,
  pageStyles,
  textBlockStyle,
} from './styles.css';

const Header: React.FC = () => {
  const [headerBackground, setHeaderBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBackground(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={pageStyles}>
      <div
        className={headerWrapperStyles}
        style={{
          backgroundColor: headerBackground ? '#fff' : 'transparent',
        }}
      >
        <Navigation />
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

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// import Button from '../Button/button';
import { headingStyle, descStyle } from '../Container/style.css';
import CalendlyWidget from '../CalendlyWidget';
import Navigation from '../Navigation';
import banner from '../../images/Banner.jpg';

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
    handleScroll();
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
      <Image
        alt="Description of the image"
        src={banner}
        className={bannerImg}
        placeholder="blur"
        priority
        quality={100}
      />
      <div className={textBlockStyle}>
        <h1 className={headingStyle}>
          Empowering Your Practice, Enhancing Every Life You Touch
        </h1>
        <p className={descStyle}>
          S Cubed is an all-in-one platform packed with powerful Clinical and
          Practice Management functionalities, designed to streamline operations
          and enhance outcomes. Whether you&apos;re running a healthcare clinic or
          managing services in educational or school-based settings, S cubed
          empowers you to focus on delivering exceptional care with less hassle
          and greater efficiency.
        </p>
        <CalendlyWidget
          buttonColor="rgb(51, 51, 51)"
          buttonBackground="#a0f5d1"
          buttonText="BOOK A FREE DEMO"
          buttonWidth="200px"
          navigateTo="/get-started"
        />
      </div>
    </main>
  );
};

export default Header;

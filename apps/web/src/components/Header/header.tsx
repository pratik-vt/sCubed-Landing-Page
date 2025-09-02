'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import banner from '../../images/Banner.jpg';
import CalendlyWidget from '../CalendlyWidget';
import { descStyle, headingStyle } from '../Container/style.css';
import Navigation from '../Navigation';

import {
  bannerImg,
  headerWrapperStyles,
  pageStyles,
  textBlockStyle,
} from './styles.css';


interface HeaderProps {
  menuItemColor?: string;
  activeMenuItemColor?: string;
  activeLinkAccentColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  menuItemColor,
  activeMenuItemColor,
  activeLinkAccentColor,
}) => {
  const [headerBackground, setHeaderBackground] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBackground(window.scrollY > 150);
    };
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };
    
    handleScroll();
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className={pageStyles}>
      <div
        className={headerWrapperStyles}
        style={{
          backgroundColor: headerBackground ? '#fff' : 'transparent',
        }}
      >
        <Navigation 
          menuItemColor={isDesktop ? (headerBackground ? '#000' : '#ffffff') : (menuItemColor || '#474747')}
          activeMenuItemColor={isDesktop ? (headerBackground ? '#000' : '#ffffff') : (activeMenuItemColor || '#000')}
          activeLinkAccentColor={activeLinkAccentColor}
        />
      </div>
      {/* <Image
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
          buttonWidth="210px"
          navigateTo="/get-started"
        />
      </div> */}
    </main>
  );
};

export default Header;

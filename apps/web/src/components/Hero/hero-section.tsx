import React from 'react';
import Image from 'next/image';

import { InnerContainerStyle } from '../Container/style.css';
import CalendlyWidget from '../CalendlyWidget';
import heroImg from '../../images/Image.jpg';

import {
  heroStyles,
  heroImage,
  textBlockStyles,
  heroHeading,
} from './style.css';


const Hero: React.FC = () => {
  return (
    <main className={heroStyles}>
      <Image
        className={heroImage}
        src={heroImg}
        alt="banner"
        placeholder="blur"
        priority
        quality={100}
      />
      <div className={InnerContainerStyle}>
        <div className={textBlockStyles}>
          <p className={heroHeading}>
            Ready to scale your business with our easy-to-use clinical and
            practice management platform?
          </p>
          <CalendlyWidget buttonColor="#000" buttonBackground="#fff" />
        </div>
      </div>
    </main>
  );
};

export default Hero;

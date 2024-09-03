import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import { InnerContainerStyle } from '../Container/style.css';
import ModalForm from '../ModalForm';

import {
  heroStyles,
  heroImage,
  textBlockStyles,
  heroHeading,
} from './style.css';

const Hero: React.FC = () => {
  return (
    <main className={heroStyles}>
      <StaticImage
        className={heroImage}
        src="../../images/Image.jpg"
        alt="banner"
        placeholder="blurred"
        quality={100}
      />
      <div className={InnerContainerStyle}>
        <div className={textBlockStyles}>
          <p className={heroHeading}>
            Ready to scale your business with our easy-to-use clinical and
            practice management platform?
          </p>
          <ModalForm buttonColor="#000" buttonBackground="#fff" />
        </div>
      </div>
    </main>
  );
};

export default Hero;

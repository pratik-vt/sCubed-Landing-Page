'use client';

import { Star } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import capterraLogo from '../../images/Capterra.png';
import g2Logo from '../../images/G2.png';
import getAppLogo from '../../images/GetApp.png';
import softwareAdviceLogo from '../../images/SoftwareAdvice.png';

import {
  container,
  contentWrapper,
  heading,
  headingWrapper,
  highlight,
  leftSection,
  logoButton,
  logoContainer,
  logoGrid,
  logoImage,
  ratingText,
  starsContainer,
} from './styles.css';

interface ReviewPlatform {
  name: string;
  url: string;
  logo: StaticImageData;
  height: number;
  width?: number;
}

const reviewPlatforms: ReviewPlatform[] = [
  {
    name: 'Capterra',
    url: 'https://www.capterra.com/p/10030734/S-Cubed/#reviews',
    logo: capterraLogo,
    height: 40,
    width: 100,
  },
  {
    name: 'Software Advice',
    url: 'https://www.softwareadvice.com/product/529516-S-Cubed/',
    logo: softwareAdviceLogo,
    height: 40,
    width: 140,
  },
  {
    name: 'GetApp',
    url: 'https://www.getapp.com/healthcare-pharmaceuticals-software/a/s-cubed/',
    logo: getAppLogo,
    height: 40,
    width: 90,
  },
  {
    name: 'G2',
    url: 'https://www.g2.com/products/s-cubed/reviews',
    logo: g2Logo,
    height: 40,
    width: 45,
  },
];

const ReviewPlatforms: React.FC = () => {
  const rating = 4.8;

  const handleLogoClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={container}>
      {/* Heading Section */}
      <div className={headingWrapper}>
        <h2 className={heading}>
          Recognized on <span className={highlight}>Top B2B Review</span>{' '}
          Platforms
        </h2>
      </div>

      <div className={contentWrapper}>
        {/* Left Section: Stars + Rating */}
        <div className={leftSection}>
          <div className={starsContainer}>
            {Array.from({ length: 5 }, (_, i) => {
              const isFilled = i < Math.floor(rating);
              const isPartial = i === Math.floor(rating) && rating % 1 !== 0;

              return (
                <Star
                  key={`star-${i}`}
                  size={18}
                  fill={isFilled || isPartial ? '#7a7eed' : 'transparent'}
                  color="#7a7eed"
                  strokeWidth={1.5}
                  style={isPartial ? { opacity: 0.8 } : undefined}
                  aria-hidden="true"
                />
              );
            })}
          </div>
          <p className={ratingText}>Rated {rating}/5</p>
        </div>

        {/* Right Section: Logo Grid */}
        <div className={logoGrid}>
          {reviewPlatforms.map((platform) => (
            <div key={platform.name} className={logoContainer}>
              <button
                className={logoButton}
                onClick={() => handleLogoClick(platform.url)}
                aria-label={`View ${platform.name} reviews`}
                type="button"
              >
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  height={50}
                  className={logoImage}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPlatforms;

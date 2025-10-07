import { Star } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import capterraLogo from '../../images/Capterra.svg';
import g2Logo from '../../images/G2.svg';
import getAppLogo from '../../images/GetApp.svg';
import softwareAdviceLogo from '../../images/SoftwareAdvice.svg';

import {
  container,
  contentWrapper,
  gradientOverlay,
  heading,
  headingWrapper,
  highlight,
  leftSection,
  logoItem,
  logoStrip,
  logoStripWrapper,
  reviewText,
  rightSection,
  starsImage,
} from './styles.css';

interface ReviewPlatform {
  name: string;
  url: string;
  logo: StaticImageData;
  height?: number;
  minWidth?: number;
}

const reviewPlatforms: ReviewPlatform[] = [
  {
    name: 'Capterra',
    url: 'https://www.capterra.com/p/10030734/S-Cubed/#reviews',
    logo: capterraLogo,
    height: 35,
  },
  {
    name: 'Software Advice',
    url: 'https://www.softwareadvice.com/product/529516-S-Cubed/',
    logo: softwareAdviceLogo,
    height: 32,
    minWidth: 140,
  },
  {
    name: 'GetApp',
    url: 'https://www.getapp.com/healthcare-pharmaceuticals-software/a/s-cubed/',
    logo: getAppLogo,
    height: 24,
  },
  {
    name: 'G2',
    url: 'https://www.g2.com/products/s-cubed/reviews',
    logo: g2Logo,
    height: 32,
  },
];

const ReviewPlatforms: React.FC = () => {
  const rating = 4.8;

  const renderLogoGroup = (isHidden: boolean = false) => {
    return reviewPlatforms.map((platform) => (
      <a
        key={platform.name}
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className={logoItem}
        style={
          platform.minWidth ? { minWidth: `${platform.minWidth}px` } : undefined
        }
        aria-label={!isHidden ? `View ${platform.name} reviews` : undefined}
        aria-hidden={isHidden || undefined}
        tabIndex={isHidden ? -1 : undefined}
      >
        <Image
          src={platform.logo}
          alt={!isHidden ? platform.name : ''}
          height={platform.height || 28}
          width={0}
          style={{
            width: 'auto',
            height: '100%',
            maxHeight: `${platform.height || 28}px`,
            objectFit: 'contain',
          }}
          priority={false}
        />
      </a>
    ));
  };

  return (
    <div className={container}>
      {/* Heading Section */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={headingWrapper}>
          <h2 className={heading}>
            Recognized on <span className={highlight}>Top B2B Review</span>{' '}
            Platforms
          </h2>
        </div>
      </div>

      <div className={contentWrapper}>
        {/* Left Section: Stars + Rating */}
        <div className={leftSection}>
          <div className={starsImage}>
            {[...Array(5)].map((_, i) => {
              const isFilled = i < Math.floor(rating);
              const isPartial = i === Math.floor(rating) && rating % 1 !== 0;

              return (
                <Star
                  key={i}
                  size={18}
                  fill={isFilled || isPartial ? '#7a7eed' : 'transparent'}
                  color="#7a7eed"
                  strokeWidth={1}
                  style={isPartial ? { opacity: 0.8 } : undefined}
                />
              );
            })}
          </div>
          <p className={reviewText}>Rated {rating}/5</p>
        </div>

        {/* Right Section: Infinite Carousel with Two Groups */}
        <div className={rightSection}>
          <div className={gradientOverlay} aria-hidden="true" />
          <div className={logoStripWrapper} aria-label="Review platform logos">
            {/* First group - visible */}
            <div className={logoStrip}>{renderLogoGroup(false)}</div>
            {/* Second group - duplicate for seamless loop */}
            <div className={logoStrip}>{renderLogoGroup(true)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPlatforms;

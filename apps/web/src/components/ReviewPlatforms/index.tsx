import { Star } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import capterraLogo from '../../images/capterra.svg';
import g2Logo from '../../images/g2-crowd-logo.svg';
import getAppLogo from '../../images/get-app-logo-modified.png';
import softwareAdviceLogo from '../../images/software-advice-logo.svg';

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
}

const reviewPlatforms: ReviewPlatform[] = [
  {
    name: 'Capterra',
    url: 'https://www.capterra.com/p/10030734/S-Cubed/#reviews',
    logo: capterraLogo,
  },
  {
    name: 'Software Advice',
    url: 'https://www.softwareadvice.com/product/529516-S-Cubed/',
    logo: softwareAdviceLogo,
  },
  {
    name: 'GetApp',
    url: 'https://www.getapp.com/healthcare-pharmaceuticals-software/a/s-cubed/',
    logo: getAppLogo,
  },
  {
    name: 'G2',
    url: 'https://www.g2.com/products/s-cubed/reviews',
    logo: g2Logo,
  },
];

const ReviewPlatforms: React.FC = () => {
  const totalReviews = 30;
  const rating = 4.8;

  return (
    <div className={container}>
      {/* Heading Section */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={headingWrapper}>
          <h2 className={heading}>
            Recognized on <span className={highlight}>Top B2B Review</span> Platforms
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
                  fill={isFilled || isPartial ? "#7a7eed" : "transparent"}
                  color="#7a7eed"
                  strokeWidth={1}
                  style={isPartial ? { opacity: 0.8 } : undefined}
                />
              );
            })}
          </div>
          <p className={reviewText}>Rated {rating}/5</p>
        </div>

        {/* Right Section: Logo Strip with Animation */}
        <div className={rightSection}>
          <div className={gradientOverlay} aria-hidden="true" />
          <div className={logoStripWrapper} aria-label="Review platform logos">
            <div className={logoStrip}>
              {reviewPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={logoItem}
                  aria-label={`View ${platform.name} reviews`}
                >
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={220}
                    height={60}
                    style={{
                      objectFit: 'contain',
                      opacity: 0.7,
                    }}
                    priority={false}
                  />
                </a>
              ))}
              {/* Visual duplicate for seamless scroll - hidden from screen readers */}
              {reviewPlatforms.map((platform) => (
                <a
                  key={`${platform.name}-visual`}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={logoItem}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <Image
                    src={platform.logo}
                    alt=""
                    width={220}
                    height={60}
                    style={{
                      objectFit: 'contain',
                      opacity: 0.7,
                    }}
                    priority={false}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPlatforms;

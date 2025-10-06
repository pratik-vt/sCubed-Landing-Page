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
  leftSection,
  logoItem,
  logoItemDuplicate,
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
  const totalReviews = 34; // 9 + 9 + 9 + 7 = 34

  return (
    <div className={container}>
      <div className={contentWrapper}>
        {/* Left Section: Review Count + Stars */}
        <div className={leftSection}>
          <p className={reviewText}>{totalReviews}+ Reviews</p>
          <div className={starsImage}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill="#7a7eed"
                color="#7a7eed"
                strokeWidth={1}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Logo Strip with Animation */}
        <div className={rightSection}>
          <div className={gradientOverlay} aria-hidden="true" />
          <div className={logoStripWrapper}>
            <div className={logoStrip}>
              {/* First set: Always visible */}
              {reviewPlatforms.map((platform) => (
                <a
                  key={`${platform.name}-main`}
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

              {/* Second set: Hidden on mobile, visible only during desktop animation */}
              {reviewPlatforms.map((platform) => (
                <a
                  key={`${platform.name}-duplicate`}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={logoItemDuplicate}
                  aria-label={`View ${platform.name} reviews`}
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

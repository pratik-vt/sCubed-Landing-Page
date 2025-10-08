'use client';

import { Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import capterraLogo from '../../images/Capterra.png';
import g2Logo from '../../images/G2.png';
import getAppLogo from '../../images/GetApp.png';
import softwareAdviceLogo from '../../images/SoftwareAdvice.png';

const Marquee = dynamic(() => import('react-fast-marquee'), {
  ssr: false,
});

import { colors } from '../../styles/tokens.css';
import {
  container,
  contentWrapper,
  heading,
  headingWrapper,
  highlight,
  leftSection,
  logoItem,
  logoStrip,
  reviewText,
  rightSection,
  starsImage,
} from './styles.css';

interface ReviewPlatform {
  name: string;
  url: string;
  logo: StaticImageData;
  height?: number;
  width?: number;
  minWidth?: number;
}

const reviewPlatforms: ReviewPlatform[] = [
  {
    name: 'Capterra',
    url: 'https://www.capterra.com/p/10030734/S-Cubed/#reviews',
    logo: capterraLogo,
    height: 30,
  },
  {
    name: 'Software Advice',
    url: 'https://www.softwareadvice.com/product/529516-S-Cubed/',
    logo: softwareAdviceLogo,
    height: 30,
    minWidth: 140,
  },
  {
    name: 'GetApp',
    url: 'https://www.getapp.com/healthcare-pharmaceuticals-software/a/s-cubed/',
    logo: getAppLogo,
    height: 30,
  },
  {
    name: 'G2',
    url: 'https://www.g2.com/products/s-cubed/reviews',
    logo: g2Logo,
    height: 30,
    width: 45,
  },
];

const ReviewPlatforms: React.FC = () => {
  const rating = 4.8;

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

        {/* Right Section: Infinite Carousel with Marquee */}
        <div className={rightSection}>
          <Marquee
            speed={50}
            gradient={true}
            gradientColor={colors.white}
            gradientWidth={100}
            pauseOnHover={false}
            aria-label="Review platform logos"
          >
            <div className={logoStrip}>
              {reviewPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={logoItem}
                  style={{
                    ...(platform.minWidth && {
                      minWidth: `${platform.minWidth}px`,
                    }),
                    ...(platform.width && {
                      width: `${platform.width}px`,
                      minWidth: `${platform.width}px`,
                    }),
                  }}
                  aria-label={`View ${platform.name} reviews`}
                >
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    height={platform.height || 28}
                    width={platform.width || 0}
                    style={{
                      width: platform.width ? `${platform.width}px` : 'auto',
                      height: `${platform.height || 28}px`,
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    priority={false}
                  />
                </a>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default ReviewPlatforms;

'use client';

import { motion, useInView } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import React, { useRef } from 'react';

import {
  contentSection,
  gridContainer,
  contentCol,
  imageCol,
  imageEl,
  description,
  title,
} from './styles.css';

interface ContentSectionProps {
  titleText: string;
  descriptionText: string;
  backgroundColor?: string;
  imagePosition?: 'left' | 'right';
  imageSrc: StaticImageData | string;
  imageAlt?: string;
}

const ContentSection: React.FC<Readonly<ContentSectionProps>> = ({
  titleText,
  descriptionText,
  backgroundColor = '#ffffff',
  imagePosition = 'left',
  imageSrc,
  imageAlt,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className={contentSection}
      style={{ backgroundColor }}
    >
      <div className={gridContainer}>
        {imagePosition === 'left' ? (
          <>
            <motion.div
              className={imageCol}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt ?? 'Data collection feature illustration'}
                className={imageEl}
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 600px"
                quality={75}
                priority={false}
              />
            </motion.div>

            <motion.div
              className={contentCol}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className={title}>{titleText}</h2>
              <p
                className={description}
                dangerouslySetInnerHTML={{ __html: descriptionText }}
              />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className={contentCol}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className={title}>{titleText}</h2>
              <p
                className={description}
                dangerouslySetInnerHTML={{ __html: descriptionText }}
              />
            </motion.div>

            <motion.div
              className={imageCol}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt ?? 'Data collection feature illustration'}
                className={imageEl}
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 600px"
                quality={75}
                priority={false}
              />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ContentSection;

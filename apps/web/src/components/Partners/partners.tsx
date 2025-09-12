import Image from 'next/image';
import React from 'react';

import partnerImg from '../../images/Image-1.jpg';
import tick from '../../images/tick.png';
import {
  InnerContainerStyle,
  sectionHeading,
  tabBox,
  tabPanel,
} from '../Container/style.css';

import {
  content,
  image,
  listItem,
  listItemContent,
  panelContent,
} from './styles.css';

const Partners: React.FC = () => {
  return (
    <div className={InnerContainerStyle}>
      <div className={tabBox}>
        <h2 className={sectionHeading}>
          Empowering Providers with Smarter ABA Practice Management Software
        </h2>
        <div className={content}>
          Experience the difference with S Cubed - your all-in-one clinical and
          practice management platform designed to empower your therapy
          effectiveness.
        </div>
        <div className={tabPanel}>
          <Image
            className={image}
            placeholder="blur"
            width={567}
            src={partnerImg}
            alt="S Cubed Platform"
            quality={100}
          />
          <div className={panelContent}>
            <div className={listItemContent}>
              S Cubed is an ideal choice to upgrade your clinical and practice
              management processes and enhance your operational efficiency. We
              are a HIPAA-compliant, cloud-based platform streamlining your
              practice with advanced functionalities.
            </div>
            <div className={listItem}>
              <Image src={tick} alt="tick" />
              <div className={listItemContent}>
                We employ robust security measures to maintain integrity and
                confidentiality.
              </div>
            </div>
            <div className={listItem}>
              <Image src={tick} alt="tick" />
              <div className={listItemContent}>
                We have a dedicated support team assisting you with all of your
                requirements.
              </div>
            </div>
            <div className={listItem}>
              <Image src={tick} alt="tick" />
              <div className={listItemContent}>
                S Cubed is a very user-friendly platform, allowing easy
                navigation for both guardians and therapists.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;

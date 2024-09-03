import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import {
  InnerContainerStyle,
  sectionHeading,
  tabPanel,
  panelContent,
  tabBox,
} from '../Container/style.css';
import tick from '../../images/tick.png';

import { image, listItemContent, content, listItem } from './styles.css';

const Partners: React.FC = () => {
  return (
    <div className={InnerContainerStyle}>
      <div className={tabBox}>
        <div className={sectionHeading}>
          Why choose S Cubed as your clinical and practice management partner?
        </div>
        <div className={content}>
          Experience the difference with S Cubed - your all-in-one clinical and
          practice management platform designed to empower your therapy
          effectiveness.
        </div>
        <div className={tabPanel}>
          <StaticImage
            className={image}
            placeholder="blurred"
            width={567}
            src="../../images/Image-1.jpg"
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
              <img src={tick} alt="tick" />
              <div className={listItemContent}>
                We employ robust security measures to maintain integrity and
                confidentiality.
              </div>
            </div>
            <div className={listItem}>
              <img src={tick} alt="tick" />
              <div className={listItemContent}>
                We have a dedicated support team assisting you with all of your
                requirements.
              </div>
            </div>
            <div className={listItem}>
              <img src={tick} alt="tick" />
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

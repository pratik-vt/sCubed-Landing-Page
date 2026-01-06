'use client';

import React from 'react';

import {
    abaFeatureSection,  
    abaListingItem,
    abaNumber,
    abaTitle,
    abaHighlight
} from './styles.css';

const AbaFeature: React.FC = () => {

  return (
    <div className={abaFeatureSection}>
      <div className={abaListingItem}>
            <div className={abaNumber}>10<span className={abaHighlight}>+</span></div>
            <div className={abaTitle}>Years of Experience</div>
      </div>
      <div className={abaListingItem}>
            <div className={abaNumber}>100<span className={abaHighlight}>%</span></div>
            <div className={abaTitle}>Insurance Support Handled</div>
      </div>
      <div className={abaListingItem}>
            <div className={abaNumber}>20<span className={abaHighlight}>+</span></div>
            <div className={abaTitle}>Clinical Assessments Conducted</div>
      </div>
      <div className={abaListingItem}>
            <div className={abaNumber}>98<span className={abaHighlight}>%</span></div>
            <div className={abaTitle}>Guardian Satisfaction</div>
      </div>
      <div className={abaListingItem}>
            <div className={abaNumber}>99.99<span className={abaHighlight}>%</span></div>
            <div className={abaTitle}>Platform Uptime</div>
      </div>
    </div>
  );
};

export default AbaFeature;
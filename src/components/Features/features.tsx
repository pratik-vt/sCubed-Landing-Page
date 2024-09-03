import React from 'react';

import {
  InnerContainerStyle,
  featureItem,
  featureText,
} from '../Container/style.css';
import hippa from '../../images/HIPAA Compliant.png';
import cloud from '../../images/Cloud Based Access.png';
import secure from '../../images/Secure Platform.png';
import user from '../../images/User-Friendly Interface.png';

import { featureContainer } from './styles.css';

const Features: React.FC = () => (
  <div style={{ background: '#f9f9f9' }}>
    <div className={InnerContainerStyle}>
      <div className={featureContainer}>
        <div className={featureItem}>
          <img src={hippa} alt="HIPAA Compliant" />
          <div className={featureText}>
            <span>HIPAA</span>
            <span>Compliant</span>
          </div>
        </div>
        <div className={featureItem}>
          <img src={cloud} alt="Cloud Based Access" />
          <div className={featureText}>
            <span>Cloud Based</span>
            <span>Access</span>
          </div>
        </div>
        <div className={featureItem}>
          <img src={secure} alt="Secure Platform" />
          <div className={featureText}>
            <span>Secure</span>
            <span>Platform</span>
          </div>
        </div>
        <div className={featureItem}>
          <img src={user} alt="User-Friendly Interface" />
          <div className={featureText}>
            <span>User-friendly</span>
            <span>Interface</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Features;

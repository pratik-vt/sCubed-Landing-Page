import Image from 'next/image';
import React from 'react';

import behavoir from '../../images/Behavior Tracking.png';
import document from '../../images/Document Management.png';
import Esign from '../../images/E-sign Documents.png';
import flexible from '../../images/Flexible Permission Management.png';
import graphic from '../../images/Graphing & Reporting.png';
import multi from '../../images/Multi-Location Clinic Management.png';
import quick from '../../images/Quick Communication.png';
import smart from '../../images/Smart Billing Management.png';
import {
  InnerContainerStyle,
  disciplineWrapper,
  featureContainers,
  featureItems,
  featureText,
  sectionHeading,
  standWrapper,
} from '../Container/style.css';
const standHead: React.CSSProperties = {
  fontSize: `24px`,
  fontWeight: `500`,
  color: `#333`,
  marginBottom: `15px`,
  marginTop: 0,
};
const standDesc: React.CSSProperties = {
  fontSize: `18px`,
  fontWeight: `400`,
  color: `#6e6e6e`,
  maxWidth: `456px`,
  width: `100%`,
};

const Stand: React.FC = () => (
  <div style={{ background: '#f9f9f9', paddingBottom: '50px' }}>
    <div className={InnerContainerStyle}>
      <div className={disciplineWrapper}>
        <h2 style={{ paddingTop: '50px' }} className={sectionHeading}>
          Smarter ABA Practice Management Tools - Stronger Outcomes
        </h2>
        <div className={featureContainers}>
          <div className={featureItems}>
            <div className={standWrapper}>
              <Image src={smart} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Smarter ABA Therapy Billing Services</h3>
                <span style={standDesc}>
                  S Cubed offers integrated therapy billing software with
                  automated charge capture, error checking, and detailed
                  reports. Our platform streamlines ABA therapy billing
                  services, helping you save time, reduce errors, and get paid
                  faster.
                </span>
              </div>
            </div>
            <div className={standWrapper}>
              <Image src={quick} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Quick Communication </h3>
                <span style={standDesc}>
                  Secure messaging allows therapists and guardians to stay
                  informed with alerts, updates, and announcements, reducing
                  unnecessary calls.
                </span>
              </div>
            </div>
          </div>
          <div className={featureItems}>
            <div className={standWrapper}>
              <Image src={behavoir} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Behavior Tracking </h3>
                <span style={standDesc}>
                  With our precisely built ABA data collection software, you can
                  track children’s developmental progress, analyze behavioral
                  patterns, and generate meaningful reports that make treatment
                  more effective.
                </span>
              </div>
            </div>
            <div className={standWrapper}>
              <Image src={multi} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Multi-Location Clinic Management</h3>
                <span style={standDesc}>
                Manage multi-location clinics effortlessly with S Cubed’s unified clinic management software. Centralize scheduling, streamline staff coordination, and boost productivity - all from one powerful platform.
                </span>
              </div>
            </div>
          </div>
          <div className={featureItems}>
            <div className={standWrapper}>
              <Image src={graphic} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Graphing & Reporting </h3>
                <span style={standDesc}>
                  Data Collection, customized session notes, graphing and
                  reporting to improve productivity and treatment efficacy.
                </span>
              </div>
            </div>
            <div className={standWrapper}>
              <Image src={flexible} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Flexible Permission Management </h3>
                <span style={standDesc}>
                  Our platform assigns access based on user roles and
                  permissions, ensuring the security and compliance of your
                  sensitive data.
                </span>
              </div>
            </div>
          </div>
          <div className={featureItems}>
            <div className={standWrapper}>
              <Image src={Esign} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>E-sign Documents </h3>
                <span style={standDesc}>
                  Incorporate our secure electronic signatures in your document
                  management system to streamline treatment plans and session
                  approvals, also reducing paperwork.{' '}
                </span>
              </div>
            </div>
            <div className={standWrapper}>
              <Image src={document} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Document Management </h3>
                <span style={standDesc}>
                  Our seamless document management system enables you to upload,
                  store, and retrieve documents keeping the documents organized
                  and readily available.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Stand;

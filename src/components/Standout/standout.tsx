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
          What Makes Us Stand Out?
        </h2>
        <div className={featureContainers}>
          <div className={featureItems}>
            <div className={standWrapper}>
              <img src={smart} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Smart Billing Management </h3>
                <span style={standDesc}>
                  S Cubed offers an integrated billing system with features like
                  automated charge capture, accurate error checking, and
                  detailed billing reports.
                </span>
              </div>
            </div>
            <div className={standWrapper}>
              <img src={quick} alt="HIPAA Compliant" />
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
              <img src={behavoir} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Behavior Tracking </h3>
                <span style={standDesc}>
                  Identify and examine kids’ behavioral patterns to help
                  therapists treat them effectively, track their development,
                  and prepare useful reports.
                </span>
              </div>
            </div>
            <div className={standWrapper}>
              <img src={multi} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Multi-Location Clinic Management</h3>
                <span style={standDesc}>
                  Manage your multi-location clinics with our unified S Cubed
                  platform allowing you centralized scheduling, staff
                  coordination, and ensuring productivity.
                </span>
              </div>
            </div>
          </div>
          <div className={featureItems}>
            <div className={standWrapper}>
              <img src={graphic} alt="HIPAA Compliant" />
              <div className={featureText}>
                <h3 style={standHead}>Graphing & Reporting </h3>
                <span style={standDesc}>
                  Data Collection, customized session notes, graphing and
                  reporting to improve productivity and treatment efficacy.
                </span>
              </div>
            </div>
            <div className={standWrapper}>
              <img src={flexible} alt="HIPAA Compliant" />
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
              <img src={Esign} alt="HIPAA Compliant" />
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
              <img src={document} alt="HIPAA Compliant" />
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

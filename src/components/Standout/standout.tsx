import React from "react";
import {InnerContainerStyle, featureContainers, featureItem, featureText,featureItems,standWrapper,sectionHeading,disciplineWrapper} from "../Container/style.css";

import smart from "../../images/Smart Billing Management.png";
import hippa from "../../images/HIPAA Compliant.png";
import quick from "../../images/Quick Communication.png";
import behavoir from "../../images/Behavior Tracking.png";
import multi from "../../images/Multi-Location Clinic Management.png";
import graphic from "../../images/Graphing & Reporting.png";
import flexible from "../../images/Flexible Permission Management.png";
import Esign from "../../images/E-sign Documents.png";
import document from "../../images/Document Management.png"
const standHead: React.CSSProperties = {
   fontSize:`24px`,
   fontWeight:`500`,
   color:`#333`,
   marginBottom:`25px`
  };
  const standDesc: React.CSSProperties = {
    fontSize:`18px`,
    fontWeight:`400`,
    color:`#6e6e6e`,
    maxWidth:`456px`,
    width:`100%`
   };
   

const Stand: React.FC = () => (
  <div style={{background:"#f9f9f9",paddingBottom:"50px"}}>
    <div className={InnerContainerStyle }>
          <div className={disciplineWrapper}>
         <div style={{paddingTop:"50px"}} className={sectionHeading}>
         What Makes Us Stand Out?
    </div>
  <div className={featureContainers}>
    <div className={featureItems}>
        <div className={standWrapper}>
      <img src={smart} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>Smart Billing Management </span>
        <span style={standDesc}>S Cubed offers an integrated billing system with features like automated charge capture, accurate error checking, and detailed billing reports.</span>
      </div>
      </div>
      <div className={standWrapper}>
      <img src={quick} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>Quick Communication </span>
        <span style={standDesc}>Secure messaging allows therapists and guardians to stay informed with alerts, updates, and announcements, reducing unnecessary calls.
        </span>
      </div>
      </div>
    </div>
    <div className={featureItems}>
        <div className={standWrapper}>
      <img src={ behavoir} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>Behavior Tracking </span>
        <span style={standDesc}>Identify and examine kids’ behavioral patterns to help therapists treat them effectively, track their development, and prepare useful reports.</span>
      </div>
      </div>
      <div className={standWrapper}>
      <img src={multi} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>Multi-Location Clinic Management</span>
        <span style={standDesc}>Manage your multi-location clinics with our unified S Cubed platform allowing you centralized scheduling, staff coordination, and ensuring productivity.</span>
      </div>
      </div>
    </div>
    <div className={featureItems}>
        <div className={standWrapper}>
      <img src={graphic} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>Graphing & Reporting </span>
        <span style={standDesc}>Data Collection, customized session notes, graphing and reporting to improve productivity and treatment efficacy.</span>
      </div>
      </div>
      <div className={standWrapper}>
      <img src={flexible} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>Flexible Permission Management </span>
        <span style={standDesc}>Our platform assigns access based on user roles and permissions, ensuring the security and compliance of your sensitive data.
        </span>
      </div>
      </div>
    </div>
    <div className={featureItems}>
        <div className={standWrapper}>
      <img src={Esign} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>E-sign Documents        </span>
        <span style={standDesc}>Incorporate our secure electronic signatures in your document management system to streamline treatment plans and session approvals, also reducing paperwork. </span>
      </div>
      </div>
      <div className={standWrapper}>
      <img src={document} alt="HIPAA Compliant" />
      <div className={featureText}>
        <span style={standHead}>Document Management </span>
        <span style={standDesc}>Our seamless document management system enables you to upload, store, and retrieve documents keeping the documents organized and readily available.
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

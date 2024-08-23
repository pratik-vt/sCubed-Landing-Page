import React from 'react';
import {
   footer,
   InnerContainerStyle,
   footerLogo,
   footerContent,
   bottomFooter,
   footerLinks,
   links,
   rights,
   inputField,
   Submitbtn,
   footerDesc,
   form,
   demoSection
  }from "../Container/style.css";
  import logoWhite from "../../images/scubed logo white.png";

  const demoInfo: React.CSSProperties = {
    fontSize: `24px`,
    color: `#ffffff`,
    fontWeight: `500`,
    borderBottom: `2px solid #fff`,

    
  };

function Footer() {
  return (
    <div className={footer}>
     <div className={InnerContainerStyle}>
     <div className={footerLogo}>
      <div>
      <img src={logoWhite} alt="S Cubed Logo" />
      </div>
        <div className={demoSection}>
        <span style={demoInfo}>Book A Demo</span>
        </div>
      
      </div>
      <div className={footerContent}>
        <p className={footerDesc}>
          S Cubed strives to leave a positive impact on every child who needs help
          by ensuring our advanced clinical and practice management solutions
          are nothing short of the best for our practitioners. S Cubed, or
          Spectrum Solutions Software, aims to revolutionize the effectiveness
          of therapy practices and improve client care.
        </p>
        <div className={form}>
          <input className={inputField} type="text" placeholder="Email" />
          <button className={Submitbtn}>SUBMIT</button>
        </div>
      </div>
      <div className={bottomFooter}>
        <span className={rights}>© 2024 S Cubed. All rights reserved.</span>
        <div className={footerLinks}>
        <a className={links} href="#">Terms & Conditions</a>
        <a className={links} href="#">Privacy Policy</a>
        </div>
      </div>
     </div>
     
    </div>
  );
}

export default Footer;
import React from "react";
import {
  InnerContainerStyle,
  sectionHeading,
  tabPanel,
  panelContent,
  panelHeading,
  partnerdescright,
  partnerdesc,
  partnerInfo,
  tabBox
} from "../Container/style.css";
import partner from "../../images/Image-1.jpg";
import tick from "../../images/tick.png";

const buttonStyle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: "32px",
  fontWeight: "700",
  textAlign: "center",
};

const partnerimg: React.CSSProperties = {
  maxHeight: "380px",
  height: "100%",
};

const Partners: React.FC = () => {
  return (
    <div className={InnerContainerStyle}>
      <div className={tabBox}>
        <div className={sectionHeading}>
          Why choose S Cubed as your clinical and practice management partner?
        </div>
        <div className={partnerdesc}>
          Experience the difference with S Cubed - your all-in-one clinical and
          practice management platform designed to empower your therapy
          effectiveness.
        </div>
        <div className={tabPanel}>
          <img style={partnerimg} src={partner} alt="S Cubed Platform" />
          <div className={panelContent}>
            <div className={partnerdescright}>
              S Cubed is an ideal choice to upgrade your clinical and practice
              management processes and enhance your operational efficiency. We
              are a HIPAA-compliant, cloud-based platform streamlining your
              practice with advanced functionalities.
            </div>
            <div className={partnerInfo}>
              <img src={tick} alt="tick" />
              <div className={partnerdescright}>
                We employ robust security measures to maintain integrity and
                confidentiality.
              </div>
            </div>
            <div className={partnerInfo}>
              <img src={tick} alt="tick" />
              <div className={partnerdescright}>
                We have a dedicated support team assisting you with all of your
                requirements.
              </div>
            </div>
            <div className={partnerInfo}>
              <img src={tick} alt="tick" />
              <div className={partnerdescright}>
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

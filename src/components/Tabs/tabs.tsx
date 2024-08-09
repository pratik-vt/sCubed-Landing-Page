import React, { useState } from "react";
import {
  InnerContainerStyle,
  tab,
  tabsList,
  tabData,
  sectionHeading,
  tabPanel,
  panelContent,
  panelHeading,
  sectiondesnew
} from "../Container/style.css";
import appointment from "../../images/Efficient Appointment Scheduling.png";
import treatment from "../../images/Customized Treatment Plans.png";
import collection from "../../images/Data Collection & Reporting.png";
import guardian from "../../images/Easy-to-use Guardian Portal.png";
import tabimg from "../../images/Laptop.png";
import Button from "../Button/button";

const buttonStyle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: "32px",
  fontWeight: "700",
  textAlign: "center"
};

const tabBox: React.CSSProperties = {
  marginTop: "80px"
};

const tabContents = [
  {
    heading: "Efficient Appointment Scheduling",
    description:
      "Optimize your appointment scheduling process with our effective calendar system. Streamline the clinic schedules by automated reminders, reducing no-shows and keeping everything on track.",
    image: appointment,
    alt: "appointment"
  },
  {
    heading: "Customized Treatment Plans",
    description:
      "Create personalized treatment plans for each patient with our versatile tools. Tailor therapies and monitor progress efficiently.",
    image: treatment,
    alt: "treatment"
  },
  {
    heading: "Data Collection & Reporting",
    description:
      "Gather, analyze, and report critical data easily. Make informed decisions with comprehensive data insights.",
    image: collection,
    alt: "collection"
  },
  {
    heading: "Easy-to-use Guardian Portal",
    description:
      "Provide guardians with an intuitive portal to access information, updates, and communicate with the clinic effortlessly.",
    image: guardian,
    alt: "guardian"
  }
];

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={InnerContainerStyle}>
      <div style={tabBox}>
        <div className={sectionHeading}>Our Core Capabilities</div>
        <div className={tabsList}>
          {tabContents.map((content, index) => (
            <div
              key={index}
              className={tab}
              onClick={() => setActiveTab(index)}
              style={{
                cursor: "pointer",
                borderBottom: activeTab === index ? "2px solid #7a7eed" : "none"
              }}
            >
              <img src={content.image} alt={content.alt} />
              <div className={tabData}>
                <p>{content.heading}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={tabPanel}>
          <img src={tabimg} alt="Laptop" />
          <div className={panelContent}>
            <div className={panelHeading}>{tabContents[activeTab].heading}</div>
            <div className={sectiondesnew}>
              {tabContents[activeTab].description}
            </div>
            <Button
              style={buttonStyle}
              color="#333"
              backgroundColor="#66e3ed"
              width="170px"
              onClick={() => alert("Button clicked!")}
            >
              BOOK A DEMO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

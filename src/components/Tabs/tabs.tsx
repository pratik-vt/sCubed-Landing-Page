import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import {
  InnerContainerStyle,
  tab,
  tabsList,
  tabData,
  sectionHeading,
  tabPanel,
  panelContent,
  panelHeading,
  sectiondesnew,
  tabPanelImage,
} from '../Container/style.css';
import appointment from '../../images/Efficient Appointment Scheduling.png';
import treatment from '../../images/Customized Treatment Plans.png';
import collection from '../../images/Data Collection & Reporting.png';
import guardian from '../../images/Easy-to-use Guardian Portal.png';
import appointmentImg from '../../images/Appointment.png';
import clinical from '../../images/treatment.png';
import portal from '../../images/dashboard.png';
import dataCollection from '../../images/data-collection.png';
import ModalForm from '../ModalForm';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const tabBox: React.CSSProperties = {
  marginTop: '80px',
};

const query = graphql`
  query MyQuery {
    allFile(filter: { sourceInstanceName: { eq: "capability-images" } }) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              backgroundColor: "white"
              placeholder: NONE
              width: 820
              quality: 100
            )
          }
          base
        }
      }
    }
  }
`;

const tabContents = [
  {
    heading: 'Efficient Appointment Scheduling',
    description:
      'Optimize your appointment scheduling process with our effective calendar system. Streamline the clinic schedules by automated reminders, reducing no-shows and keeping everything on track.',
    image: appointment,
    alt: 'appointment',
    panelImage: 'appointment.png',
    // panelImage: appointmentImg,
  },
  {
    heading: 'Customized Treatment Plans',
    description:
      'Create personalized treatment plans for each patient with our versatile tools. Tailor therapies and monitor progress efficiently.',
    image: treatment,
    alt: 'treatment',
    panelImage: 'treatment-plan.png',
    // panelImage: clinical,
  },
  {
    heading: 'Data Collection & Reporting',
    description:
      'Gather, analyze, and report critical data easily. Make informed decisions with comprehensive data insights.',
    image: collection,
    alt: 'collection',
    panelImage: 'data-collection.png',
    // panelImage: dataCollection,
  },
  {
    heading: 'Easy-to-use Guardian Portal',
    description:
      'Provide guardians with an intuitive portal to access information, updates, and communicate with the clinic effortlessly.',
    image: guardian,
    alt: 'guardian',
    panelImage: 'dashboard.png',
    // panelImage: portal,
  },
];

type Edges = ReadonlyArray<{
  readonly node: {
    readonly base: string;
    readonly childImageSharp: {
      readonly gatsbyImageData: IGatsbyImageData;
    } | null;
  };
}>;

type ImageQuery = {
  readonly allFile: {
    readonly edges: Edges;
  };
};

const getImage = (image: string, edges: Edges) => {
  const imageObj = edges.find((edge) => edge.node.base === image);
  return imageObj?.node.childImageSharp?.gatsbyImageData as IGatsbyImageData;
};

const Tabs: React.FC = () => {
  const { allFile } = useStaticQuery<ImageQuery>(query);
  const [activeTab, setActiveTab] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
  console.log(allFile);

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
                cursor: 'pointer',
                borderBottom:
                  activeTab === index ? '4px solid #7a7eed' : 'none',
              }}
            >
              <img src={content.image} alt={content.alt} />
              <div className={tabData}>
                <p>{content.heading}</p>
              </div>
              {screenWidth <= 768 && activeTab === index && (
                <div className={tabPanel}>
                  {/* <img
                    className={tabPanelImage}
                    src={content.panelImage}
                    alt={content.alt}
                  /> */}
                  <GatsbyImage
                    className={tabPanel}
                    image={getImage(content.panelImage, allFile.edges)}
                    alt={content.alt}
                    imgStyle={{ objectFit: 'contain' }}
                  />
                  <div className={panelContent}>
                    <div className={panelHeading}>{content.heading}</div>
                    <div className={sectiondesnew}>{content.description}</div>
                    <ModalForm
                      buttonColor="#333"
                      buttonBackground="#66e3ed"
                      buttonWidth="170px"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Render tab panel outside of the tab list in web view */}
        {screenWidth > 768 && (
          <div className={tabPanel}>
            {/* <img
              className={tabPanelImage}
              src={tabContents[activeTab].panelImage}
              alt={tabContents[activeTab].alt}
            /> */}
            <GatsbyImage
              className={tabPanelImage}
              image={getImage(tabContents[activeTab].panelImage, allFile.edges)}
              alt={tabContents[activeTab].alt}
              imgStyle={{ objectFit: 'contain' }}
            />
            <div className={panelContent}>
              <div className={panelHeading}>
                {tabContents[activeTab].heading}
              </div>
              <div className={sectiondesnew}>
                {tabContents[activeTab].description}
              </div>
              <ModalForm
                buttonColor="#333"
                buttonBackground="#66e3ed"
                buttonWidth="170px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;

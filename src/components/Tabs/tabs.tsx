import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import {
  InnerContainerStyle,
  sectionHeading,
  tabPanel,
  panelContent,
} from '../Container/style.css';
import appointment from '../../images/Efficient Appointment Scheduling.png';
import treatment from '../../images/Customized Treatment Plans.png';
import collection from '../../images/Data Collection & Reporting.png';
import guardian from '../../images/Easy-to-use Guardian Portal.png';
import ModalForm from '../ModalForm';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import {
  hidePanel,
  tab,
  tabsList,
  tabData,
  panelHeading,
  sectionDescription,
  tabPanelImage,
} from './styles.css';

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
              placeholder: BLURRED
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
  },
  {
    heading: 'Customized Treatment Plans',
    description:
      'Create personalized treatment plans for each patient with our versatile tools. Tailor therapies and monitor progress efficiently.',
    image: treatment,
    alt: 'treatment',
    panelImage: 'treatment-plan.png',
  },
  {
    heading: 'Data Collection & Reporting',
    description:
      'Gather, analyze, and report critical data easily. Make informed decisions with comprehensive data insights.',
    image: collection,
    alt: 'collection',
    panelImage: 'data-collection.png',
  },
  {
    heading: 'Easy-to-use Guardian Portal',
    description:
      'Provide guardians with an intuitive portal to access information, updates, and communicate with the clinic effortlessly.',
    image: guardian,
    alt: 'guardian',
    panelImage: 'dashboard.jpg',
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

  return (
    <div className={InnerContainerStyle}>
      <div style={tabBox}>
        <div className={sectionHeading}>Our Core Capabilities</div>
        <div className={tabsList}>
          {tabContents.map((content, index) => (
            <div
              key={content.panelImage}
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
                  <GatsbyImage
                    className={tabPanel}
                    image={getImage(content.panelImage, allFile.edges)}
                    alt={content.alt}
                    imgStyle={{ objectFit: 'contain' }}
                    loading="eager"
                  />
                  <div className={panelContent}>
                    <div className={panelHeading}>{content.heading}</div>
                    <div className={sectionDescription}>
                      {content.description}
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
          ))}
        </div>
        {screenWidth > 768 &&
          tabContents.map((content, index) => (
            <div
              key={content.panelImage}
              className={activeTab === index ? tabPanel : hidePanel}
            >
              <GatsbyImage
                className={tabPanelImage}
                image={getImage(content.panelImage, allFile.edges)}
                alt={content.alt}
                imgStyle={{ objectFit: 'contain' }}
                loading="eager"
              />
              <div className={panelContent}>
                <div className={panelHeading}>{content.heading}</div>
                <div className={sectionDescription}>{content.description}</div>
                <ModalForm
                  buttonColor="#333"
                  buttonBackground="#66e3ed"
                  buttonWidth="170px"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tabs;

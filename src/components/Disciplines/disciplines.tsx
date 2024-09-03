import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import {
  sectionHeading,
  sectiondesc,
  InnerContainerStyle,
  disciplineWrapper,
  disciplineImg,
} from '../Container/style.css';
// import discipline from '../../images/Disciplines.png';
// import { disciplineImg } from '../../components/Container/style.css';

const Disciplines: React.FC = () => (
  <div className={InnerContainerStyle}>
    <div className={disciplineWrapper}>
      <div className={sectionHeading}>Disciplines</div>
      <div className={sectiondesc}>
        S Cubed Platform simplifies the way you manage your practice and
        clinical process. It is designed to integrate with various disciplines
        allowing you to focus on your little clients’ well-being.
      </div>
      <StaticImage
        className={disciplineImg}
        src="../../images/Disciplines.png"
        alt=""
        quality={100}
        width={1400}
        imgStyle={{ objectFit: 'contain' }}
        placeholder="blurred"
      />
    </div>
  </div>
);

export default Disciplines;

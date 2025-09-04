import React from 'react';
import Image from 'next/image';

import {
  sectionHeading,
  sectiondesc,
  InnerContainerStyle,
  disciplineWrapper,
  disciplineImg,
} from '../Container/style.css';
import discipline from '../../images/Disciplines.png';

const Disciplines: React.FC = () => (
  <div className={InnerContainerStyle}>
    <div className={disciplineWrapper}>
      <h2 className={sectionHeading}>Disciplines</h2>
      <div className={sectiondesc}>
        S Cubed Platform simplifies the way you manage your practice and clinical
        process. It is designed to integrate with various disciplines allowing
        you to focus on your little clients’ well-being.
      </div>
      <Image
        className={disciplineImg}
        src={discipline}
        alt="Disciplines"
        quality={100}
        placeholder="blur"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1400px) 100vw, 1400px"
        style={{ objectFit: 'contain' }}
      />
    </div>
  </div>
);

export default Disciplines;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      The S Cubed Platform simplifies therapy practice management by streamlining both clinical and administrative tasks. As one of the best <Link href="/">ABA practice management software solutions</Link>, it is designed to integrate across multiple disciplines - helping you stay efficient while focusing on what matters most: clients well-being.
      </div>
      <Image
        className={disciplineImg}
        src={discipline}
        alt="Disciplines"
        quality={75}
        placeholder="blur"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1400px) 100vw, 1400px"
        style={{ objectFit: 'contain' }}
      />
    </div>
  </div>
);

export default Disciplines;

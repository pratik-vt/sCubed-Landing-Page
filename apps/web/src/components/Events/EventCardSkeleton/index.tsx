import React from 'react';

import * as styles from './styles.css';

const EventCardSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonDate} />
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonExcerpt} />
        <div className={styles.skeletonMeta}>
          <div className={styles.skeletonLocation} />
          <div className={styles.skeletonTags} />
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
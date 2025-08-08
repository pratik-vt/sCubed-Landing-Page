import React, { FC } from 'react';

import { sectionStyle } from './styles.css';

export const Section: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={sectionStyle}>{children}</div>;
};

import React, { FC } from 'react';

import { headingStyle } from './styles.css';

export const Heading: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h1 className={headingStyle}>{children}</h1>;
};

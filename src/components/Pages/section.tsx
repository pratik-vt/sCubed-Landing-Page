import React, { FC } from 'react';

import { sectionStyle } from './styles.css';

export const Section: FC<{ children: JSX.Element | string | any }> = ({
  children,
}) => {
  return <div className={sectionStyle}>{children}</div>;
};

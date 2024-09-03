import React from 'react';

import { ContainerStyle } from './style.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Container: React.FC<Props> = ({ children }) => (
  <div className={ContainerStyle}>{children}</div>
);

export default Container;

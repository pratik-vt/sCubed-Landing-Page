import React, { FC } from 'react';

import Footer from '../Footer/footer';
import Navigation from '../Navigation';
import Container from '../Container';

import { contentStyle, headerWrapperStyles } from './styles.css';

const Layout: FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <Container>
      <div className={headerWrapperStyles}>
        <Navigation />
      </div>

      <div className={contentStyle}>{children}</div>
      <Footer />
    </Container>
  );
};

export default Layout;

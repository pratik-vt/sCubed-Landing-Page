import React, { FC } from 'react';

import Footer from '../Footer';
import Navigation from '../Navigation';
import Container from '../Container';

import { contentStyle, fullWidthContentStyle, headerWrapperStyles } from './styles.css';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  fullWidth = false,
}) => {
  return (
    <Container>
      <div className={headerWrapperStyles}>
        <Navigation />
      </div>

      <div className={fullWidth ? fullWidthContentStyle : contentStyle}>
        {children}
      </div>
      <Footer />
    </Container>
  );
};

export default Layout;

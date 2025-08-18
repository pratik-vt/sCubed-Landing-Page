import React, { FC } from 'react';

import Footer from '../Footer/footer';
import Navigation from '../Navigation';
import Container from '../Container';

import { contentStyle, contentStyleZeroMargin, headerWrapperStyles } from './styles.css';

interface LayoutProps {
  children: React.ReactNode;
  zeroHeaderMargin?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  zeroHeaderMargin = false,
}) => {
  return (
    <Container>
      <div className={headerWrapperStyles}>
        <Navigation />
      </div>

      <div className={zeroHeaderMargin ? contentStyleZeroMargin : contentStyle}>
        {children}
      </div>
      <Footer />
    </Container>
  );
};

export default Layout;

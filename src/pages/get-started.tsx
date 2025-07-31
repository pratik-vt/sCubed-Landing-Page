import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';

import Container from '../components/Container';
import HeaderSimple from '../components/features/HeaderSimple';
import Footer from '../components/Footer/footer';
import GetStartedForm from '../components/GetStartedForm';
import Seo from '../components/Seo';

const GetStartedPage: React.FC<PageProps> = () => {
  return (
    <Container>
      <HeaderSimple />
      <GetStartedForm />
      <Footer />
    </Container>
  );
};

export default GetStartedPage;

export const Head: HeadFC = () => (
  <Seo title="Get Started with S Cubed" pathname="/get-started/" />
);

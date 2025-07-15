import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';

import Container from '../components/Container';
import CTAFeatures from '../components/CTAFeatures';
import FeaturesComprehensive from '../components/FeaturesComprehensive';
import Footer from '../components/Footer/footer';
import HeaderSimple from '../components/HeaderSimple';
import HeroFeatures from '../components/HeroFeatures';
import Seo from '../components/Seo';

const FeaturesPage: React.FC<PageProps> = () => {
  return (
    <Container>
      <HeaderSimple />
      <HeroFeatures />
      <FeaturesComprehensive />
      <CTAFeatures />
      <Footer />
    </Container>
  );
};

export default FeaturesPage;

export const Head: HeadFC = () => (
  <Seo title="Features - S Cubed Practice Management Software" />
);

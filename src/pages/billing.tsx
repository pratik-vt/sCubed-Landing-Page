import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';

import Container from '../components/Container';
import Footer from '../components/Footer/footer';
import HeaderSimple from '../components/features/HeaderSimple';
import Seo from '../components/Seo';
import BillingHero from '../components/billing/BillingHero';
import BillingFeatures from '../components/billing/BillingFeatures';
import BillingWorkflow from '../components/billing/BillingWorkflow';
import BillingKeyFeatures from '../components/billing/BillingKeyFeatures';
import BillingCTA from '../components/billing/BillingCTA';

const BillingPage: React.FC<PageProps> = () => {
  return (
    <Container>
      <HeaderSimple />
      <BillingHero />
      <BillingFeatures />
      <BillingWorkflow />
      <BillingKeyFeatures />
      <BillingCTA />
      <Footer />
    </Container>
  );
};

export default BillingPage;

export const Head: HeadFC = () => (
  <Seo
    title="Billing - S Cubed Practice Management Software"
    pathname="/billing/"
  />
);

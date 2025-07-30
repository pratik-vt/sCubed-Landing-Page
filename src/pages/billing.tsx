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
    title="ABA Therapy Billing & RCM Services | Software for Claims & Insurance"
    description="Optimize ABA therapy billing with expert RCM services and software. Manage claims, authorizations, and payments efficiently - all from one secure platform."
    pathname="/billing/"
  />
);

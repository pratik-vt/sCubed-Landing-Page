import type { Metadata } from 'next';

import Container from '../../components/Container';
import Footer from '../../components/Footer/footer';
import HeaderSimple from '../../components/features/HeaderSimple';
import BillingHero from '../../components/billing/BillingHero';
import BillingFeatures from '../../components/billing/BillingFeatures';
import BillingWorkflow from '../../components/billing/BillingWorkflow';
import BillingKeyFeatures from '../../components/billing/BillingKeyFeatures';
import BillingCTA from '../../components/billing/BillingCTA';

export const metadata: Metadata = {
  title: 'ABA Therapy Billing & RCM Services | Software for Claims & Insurance',
  description:
    'Optimize ABA therapy billing with expert RCM services and software. Manage claims, authorizations, and payments efficiently - all from one secure platform.',
};

export default function BillingPage() {
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
}

import type { Metadata } from 'next';

import Container from '../../components/Container';
import Footer from '../../components/Footer/footer';
import HeaderSimple from '../../components/features/HeaderSimple';
import GuardianHero from '../../components/guardian-portal/GuardianHero';
import GuardianIntroduction from '../../components/guardian-portal/GuardianIntroduction';
import GuardianBenefits from '../../components/guardian-portal/GuardianBenefits';
import GuardianWhyChoose from '../../components/guardian-portal/GuardianWhyChoose';
import GuardianCTA from '../../components/guardian-portal/GuardianCTA';

export const metadata: Metadata = {
  title: 'Guardian Portal | Stay Connected to Your Child\'s Care Journey',
  description:
    'Access your child\'s progress, treatment plans, and care team communications securely from anywhere. Our Guardian Portal keeps families engaged and informed.',
};

export default function GuardianPortalPage() {
  return (
    <Container>
      <HeaderSimple />
      <GuardianHero />
      <GuardianIntroduction />
      <GuardianBenefits />
      <GuardianWhyChoose />
      <GuardianCTA />
      <Footer />
    </Container>
  );
}
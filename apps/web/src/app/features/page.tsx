import type { Metadata } from 'next';

import Container from '../../components/Container';
import CTAFeatures from '../../components/features/CTAFeatures';
import FeaturesComprehensive from '../../components/features/FeaturesComprehensive';
import Footer from '../../components/Footer/footer';
import HeaderSimple from '../../components/features/HeaderSimple';
import HeroFeatures from '../../components/features/HeroFeatures';

export const metadata: Metadata = {
  title: 'All-in-One Therapy & Clinic Management Software | S Cubed',
  description:
    'Streamline your clinic or school-based practice with S Cubed - an all-in-one software built by BCBAs for ABA, Speech, OT/PT, and counseling. Smart scheduling, billing, progress tracking, secure communication, and more in one powerful platform.',
};

export default function FeaturesPage() {
  return (
    <Container>
      <HeaderSimple />
      <HeroFeatures />
      <FeaturesComprehensive />
      <CTAFeatures />
      <Footer />
    </Container>
  );
}

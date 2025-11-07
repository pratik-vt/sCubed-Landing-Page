import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import CTAFeatures from '../../components/features/CTAFeatures';
import FeaturesComprehensive from '../../components/features/FeaturesComprehensive';
import HeroFeatures from '../../components/features/HeroFeatures';

export const metadata: Metadata = {
  title: 'All-in-One Therapy & Clinic Management Software | S Cubed',
  description:
    'Streamline your clinic or school-based practice with S Cubed - an all-in-one software built by BCBAs for ABA, Speech, OT/PT, and counseling. Smart scheduling, billing, progress tracking, secure communication, and more in one powerful platform.',
  alternates: {
    canonical: '/practice-management',
  },
};

export default function FeaturesPage() {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Practice Management', item: '/practice-management' }
        ]} 
      />
      <Container>
        <HeroFeatures />
        <FeaturesComprehensive />
        <CTAFeatures />
      </Container>
    </>
  );
}

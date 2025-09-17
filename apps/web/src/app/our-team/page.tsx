import { Metadata } from 'next';

import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import Layout from '@/components/Layout';
import OurTeam from '@/components/OurTeam';

export const metadata: Metadata = {
  title: 'About S Cubed | Built by Therapists, for Therapists',
  description:
    'Learn the story behind S Cubed - built by therapists for therapists. Our mission drives ABA practice management software that empowers care, efficiency, and connection.',
  keywords:
    'S Cubed, our team, leadership, mission, healthcare software, practice management, therapy services',
  openGraph: {
    title: 'About S Cubed | Built by Therapists, for Therapists',
    description:
      'Learn the story behind S Cubed - built by therapists for therapists. Our mission drives ABA practice management software that empowers care, efficiency, and connection.',
    type: 'website',
  },
};

export default function OurTeamPage() {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Our Team', item: '/our-team' }
        ]} 
      />
      <Layout>
        <OurTeam />
      </Layout>
    </>
  );
}

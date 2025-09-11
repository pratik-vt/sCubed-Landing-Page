import { Metadata } from 'next';

import OurTeam from '@/components/OurTeam';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Our Team | S Cubed',
  description: 'Meet the S Cubed team - our story, mission, leadership, and why therapists trust us to transform their practice management.',
  keywords: 'S Cubed, our team, leadership, mission, healthcare software, practice management, therapy services',
  openGraph: {
    title: 'Our Team | S Cubed',
    description: 'Meet the S Cubed team - our story, mission, leadership, and why therapists trust us to transform their practice management.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <Layout>
      <OurTeam />
    </Layout>
  );
}
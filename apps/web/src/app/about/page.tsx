import { Metadata } from 'next';

import AboutUs from '@/components/AboutUs';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'About Us | S Cubed',
  description: 'Learn about S Cubed - our story, mission, team, and why therapists trust us to transform their practice management.',
  keywords: 'S Cubed, about us, team, mission, healthcare software, practice management, therapy services',
  openGraph: {
    title: 'About Us | S Cubed',
    description: 'Learn about S Cubed - our story, mission, team, and why therapists trust us to transform their practice management.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <Layout>
      <AboutUs />
    </Layout>
  );
}
import type { Metadata } from 'next';

import Container from '../components/Container';
import Disciplines from '../components/Disciplines/disciplines';
import Features from '../components/Features/features';
import Footer from '../components/Footer/footer';
import Header from '../components/Header/header';
import Hero from '../components/Hero/hero-section';
import HeroImageSlider from '../components/HeroImageSlider';
import OrganizationSchema from '../components/OrganizationSchema';
import Partners from '../components/Partners/partners';
import Stand from '../components/Standout/standout';
import Tabs from '../components/Tabs/tabs';
import { heroSliderData } from '../data/heroSliderData';

export const metadata: Metadata = {
  title: 'S Cubed - ABA Practice Management Software | Therapy Clinic Software',
  description:
    'Transform your ABA, Speech, OT/PT, and counseling practice with S Cubed - the all-in-one therapy practice management software. Streamline scheduling, billing, progress tracking, and client communication.',
  keywords: 'ABA practice management, therapy software, clinic management, ABA scheduling, therapy billing, practice software, speech therapy software, occupational therapy software',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'S Cubed - ABA Practice Management Software',
    description: 'Transform your therapy practice with our all-in-one management software.',
    type: 'website',
    siteName: 'S Cubed',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S Cubed - ABA Practice Management Software',
    description: 'Transform your therapy practice with our all-in-one management software.',
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <HeroImageSlider items={heroSliderData} />
      <Container>
        <Header />
        <Features />
        <Disciplines />
        <Tabs />
        <Stand />
        <Hero />
        <Partners />
        <Footer />
      </Container>
    </>
  );
}

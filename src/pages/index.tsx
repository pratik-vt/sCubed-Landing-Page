import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import Container from '../components/Container';
import Header from '../components/Header/header';
import Features from '../components/Features/features';
import Disciplines from '../components/Disciplines/disciplines';
import Tabs from '../components/Tabs/tabs';
import Stand from '../components/Standout/standout';
import Hero from '../components/Hero/hero-section';
import Partners from '../components/Partners/partners';
import Footer from '../components/Footer/footer';
import SEO from '../components/Seo';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
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
};

export default IndexPage;

export const Head: HeadFC = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'S Cubed',
    url: 'https://www.scubed.io/',
    logo: 'https://www.scubed.io/logo.png',
    description:
      'S Cubed empowers providers to manage ABA, OT, PT, speech, and counseling with ease - streamlining scheduling, billing, documentation, and compliance in one platform.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-254-434-4959',
      contactType: 'Customer Service',
      email: 'info@scubed.io',
    },
    sameAs: [
      'https://www.facebook.com/people/Spectrum-Solutions/61571781968975/',
      'https://www.instagram.com/scubed_solutions/',
      'https://www.youtube.com/@SpectrumSolutionsSoftware',
      'https://www.linkedin.com/company/spectrum-solutions-software/',
    ],
  };

  return (
    <SEO
      title="ABA Therapy Software for Providers | Simplify Scheduling & Billing"
      description="S Cubed empowers providers to manage ABA, OT, PT, speech, and counseling with ease - streamlining scheduling, billing, documentation, and compliance in one platform."
      pathname=""
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </SEO>
  );
};

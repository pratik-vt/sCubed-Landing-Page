import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Container from '../components/Container';
import Header from '../components/Container/Header/header';
import Features from '../components/Features/features';
import Disciplines from '../components/Disciplines/disciplines';
import Tabs from '../components/Tabs/tabs';
import Stand from '../components/Standout/standout';
import Hero from '../components/Hero/hero-section';
import Partners from '../components/Partners/partners';
import Footer from '../components/Footer/footer';

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

export const Head: HeadFC = () => (
  <>
    <html lang="en" />
    <title>Home Page</title>
  </>
);

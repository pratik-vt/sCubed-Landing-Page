import Container from '../components/Container';
import Disciplines from '../components/Disciplines/disciplines';
import Features from '../components/Features/features';
import Footer from '../components/Footer/footer';
import Header from '../components/Header/header';
import Hero from '../components/Hero/hero-section';
import OrganizationSchema from '../components/OrganizationSchema';
import Partners from '../components/Partners/partners';
import Stand from '../components/Standout/standout';
import Tabs from '../components/Tabs/tabs';

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
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

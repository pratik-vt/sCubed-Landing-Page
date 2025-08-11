import Container from '../components/Container';
import Header from '../components/Header/header';
import Features from '../components/Features/features';
import Disciplines from '../components/Disciplines/disciplines';
import Tabs from '../components/Tabs/tabs';
import Stand from '../components/Standout/standout';
import Hero from '../components/Hero/hero-section';
import Partners from '../components/Partners/partners';
import Footer from '../components/Footer/footer';

export default function HomePage() {
  return (
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
  );
}

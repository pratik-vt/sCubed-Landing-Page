import type { Metadata } from 'next';

import Container from '../../components/Container';
import HeaderSimple from '../../components/features/HeaderSimple';
import Footer from '../../components/Footer/footer';
import GetStartedForm from '../../components/GetStartedForm';

export const metadata: Metadata = {
  title: 'Get Started with S Cubed',
};

export default function GetStartedPage() {
  return (
    <Container>
      <HeaderSimple />
      <GetStartedForm />
      <Footer />
    </Container>
  );
}

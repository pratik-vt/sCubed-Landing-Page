import type { Metadata } from 'next';

import Container from '../../components/Container';
import GetStartedForm from '../../components/GetStartedForm';

export const metadata: Metadata = {
  title: 'Get Started with S Cubed',
};

export default function GetStartedPage() {
  return (
    <Container>
      <GetStartedForm />
    </Container>
  );
}

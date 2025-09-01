import type { Metadata } from 'next';

import Container from '../../components/Container';
import GetStartedForm from '../../components/GetStartedForm';

export const metadata: Metadata = {
  title: 'Get Started with S Cubed',
  description: 'Start your journey with S Cubed therapy practice management software. Contact us for a demo or to learn more about our comprehensive ABA, Speech, OT/PT, and counseling practice solutions.',
  alternates: {
    canonical: '/get-started',
  },
};

export default function GetStartedPage() {
  return (
    <Container>
      <GetStartedForm />
    </Container>
  );
}

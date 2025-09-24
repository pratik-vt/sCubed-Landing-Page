import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import EventsGrid from '../../components/events/EventsGrid';
import EventsHero from '../../components/events/EventsHero';

export const metadata: Metadata = {
  title: 'Events & News | ABA Therapy Conferences, Webinars & Training',
  description:
    'Stay updated with the latest ABA therapy industry events, conferences, webinars, and training sessions. Learn about practice management innovations and regulatory updates.',
  alternates: {
    canonical: '/events',
  },
};

export default function EventsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Events & News', item: '/events' }
        ]}
      />
      <EventsHero />
      <Container>
        <ErrorBoundary>
          <EventsGrid />
        </ErrorBoundary>
      </Container>
    </>
  );
}
import type { Metadata } from 'next';
import { data, q } from 'framer-motion/client';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import SchedulingHero from '../../components/Scheduling/Hero/index';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';

import SchedulingCTA from '@/components/Scheduling/CTA';
import FeaturesTherapy from '@/components/Scheduling/FeaturesTheraphy';
import FeaturesCarousel from '@/components/Scheduling/Carousel';

export const metadata: Metadata = {
  title:
    'Smart Therapy Scheduling Software',
  description:
    'Our therapy appointment software is built to handle the complexities of therapy work like shifting availability, recurring sessions, and urgent changes. Scheduling you can rely on because care can’t afford delays.',
  alternates: {
    canonical: '/scheduling-and-appointments',
  },
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Make Scheduling the Easiest Part of your Practice',
  sections: [
    {
      items: [
        {
          question:
            'What calendar do therapists use?',
          answer:
            'It\'s a mix, some use Outlook or Google Calendar, and others use tools built into their practice management systems. Honestly, most are just looking for something that\'s simple, secure, and doesn\'t slow them down.',
        },
        {
          question:
            'What is the best online booking system for therapists?',
          answer:
            'That really depends on what your day-to-day looks like. We believe the best system is one that fits into your workflow, not the other way around. That’s how we built booking inside our therapy scheduling software so it can be easy, secure, and actually helpful.',
        },
        {
          question:
            'Do therapists make their schedules?',
          answer:
            'Most do, yes. Especially in smaller practices or school-based roles. Some have admin help, but either way, they need tools that give them flexibility and control. That\'s something we really focused on getting right.',
        },
        {
          question:
            'Can I send appointment reminders with your HIPAA-Compliant scheduling software for therapists?',
          answer:
            'Yes, absolutely. S Cubed lets you send automated reminders via text or email and everything is fully HIPAA-Compliant. It\'s simple to set up, and it saves everyone a lot of back-and-forth.',
        },
        {
          question:
            'What is the cost for appointment reminders in "S Cubed"?',
          answer:
            'Nothing extra. Reminders are built into S Cubed, no add-ons, no “per reminder” fees. We just think it should be part of the deal, especially in a space where missed appointments mean missed care.',
        },
        {
          question: 'How does ABA scheduling software improve efficiency?',
          answer: 'Good ABA scheduling software helps reduce missed sessions, improves staff-client matching, and takes the guesswork out of daily planning. It keeps things running smoothly so teams can spend less time coordinating, and more time supporting clients.',
        },
        {
          question: 'What are the key features of S Cubed\'s ABA practice management software?',
          answer: 'S Cubed was built to handle the real-world complexity of running an ABA practice without overwhelming you. Some of the key features include:\n\n- Smart scheduling that supports staff-client matching and school-based setups\n- Progress notes and data collection that are simple but flexible\n- Billing and claims tools that don\'t require a manual to understand\n- Secure, cloud-based access that\'s fully HIPAA-Compliant\n- And automated appointment reminders to keep everyone in the loop\n\nIt\'s everything your team needs, all in one platform.\n',
        },
        {
          question: 'What is an ABA scheduler?',
          answer: 'It\'s a tool that helps you manage sessions, staff availability, and client needs, all in one view. When done well, ABA patient scheduling software helps avoid double-bookings, missed sessions, and those last-minute scrambles no one wants.',
        },
        {
          question: 'What is the most popular scheduling software?',
          answer: 'It depends on who you ask, there are a few names that come up often, but popularity doesn\'t always mean it\'s the best fit for you. We built our therapy appointment scheduling software, S Cubed, to be something people actually enjoy using, not just tolerate.',
        },
        {
          question: 'What is the best appointment scheduling software?',
          answer: 'The best one is the one that makes your day easier. It should be secure, flexible, and easy to use, especially when things get busy. That\'s been our north star with S Cubed since day one.',
        },
        {
          question: 'What is the most used scheduling software?',
          answer: 'There\'s no single “most used” across the board, a lot of therapists still use generic tools like Google Calendar or whatever came bundled with their EMR. It gets the job done, but it\'s not built for the unique flow of therapy work. That\'s exactly why platforms like S Cubed, which is designed as therapy scheduling software, exists.',
        },
      ],
    },
  ],
};

// Fetch data at request time
async function getDataCollectionFAQs() {
  const faqData = await getFAQCollection('data-collection-faqs');
  const transformedData = transformFAQData(faqData);

  if (!transformedData) {
    // Return fallback data if API fails
    return fallbackFAQData;
  }

  return transformedData;
}

export default async function DataCollectionPage() {
  const faqData = await getDataCollectionFAQs();

  // Flatten all FAQ items for schema
  const allFAQs = faqData.sections.flatMap((section) => section.items);
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Data Collection', item: '/data-collection' },
        ]}
      />
      <FAQSchema faqs={allFAQs} pageSlug="data-collection" />
      <Container>


        <SchedulingHero />

        <FeaturesTherapy />

        <FeaturesCarousel />


        {faqData.sections.map((section, index) => (
          <FAQSection
            key={section.items[0].question}
            title={index === 0 ? faqData.title : ''}
            faqs={section.items}
          />
        ))}

        <SchedulingCTA />
      </Container>
    </>
  );
}

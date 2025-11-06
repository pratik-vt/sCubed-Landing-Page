import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import CTA from '../../components/authorization/CTA';
import ContentSection from '../../components/authorization/Features';
import Hero from '../../components/authorization/Hero';
import Trust from '../../components/authorization/Trust';

import { getFAQCollection, transformFAQData } from '../../lib/faq-api';

import AllYourAuthorizationsFinallyInOnePlace from '../../images/authorization/all-your-authorizations-finally-in-one-place.png';
import LinkedAutomaticallySoNoAssumptions from '../../images/authorization/linked-automatically-so-no-assumptions.png';
import NeverLoseTrackOfExpirationsAgain from '../../images/authorization/never-lose-track-of-expirations-again.png';

export const metadata: Metadata = {
  title:
    'Authorization Management Built For Real-World Practice',
  description:
    'Manage every approval in one place, track, renew, and connect what matters. No more denials, fewer scheduling surprises, and more time back for your team. Meet S Cubed, your prior authorization software with heart.',
  alternates: {
    canonical: '/authorization',
  },
};

import { BaggageClaim, Timer, CalendarClock, FileClock } from 'lucide-react';

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Data Collection & Reporting for Therapy Practices',
  sections: [
    {
      items: [
        {
          question:
            'What is the best ABA data collection software for therapists?',
          answer:
            'The best ABA data collection software is the one that keeps therapy simple and accurate. It must have features like real-time goal tracking, recording behaviors, and monitoring progress without any session interruptions. Choose systems that are a perfect combination of reliability, flexibility and clear visual reporting. The software must have features that support therapists to concentrate on care and less on paperwork.',
        },
        {
          question:
            'How do ABA data collection tools improve therapy outcomes?',
          answer:
            'Good ABA data tools turn information into action. By collecting and organizing data instantly, therapists can spot patterns, adjust treatment plans faster, and make data-driven decisions that support consistent progress. When information is accurate and easy to read, clients benefit from faster, more personalized intervention.',
        },
        {
          question:
            'What types of data collection methods are supported in ABA software?',
          answer:
            'Most of the applied behavior analysis data collection systems offer many types of data collection methods like duration, interval, frequency and task analysis recording. Some of them also have customizable templates and automated tracking for maximum accuracy. The best platforms let therapists switch between methods easily, according to the client goals and session needs.',
        },
        {
          question:
            'What features make the top ABA data collection tools stand out?',
          answer:
            'The best ABA data collection systems are intuitive, accurate, and built for real clinical work. They include smart templates, quick data entry, customizable dashboards, and secure cloud storage. Tools that integrate ABA graphing software and progress tracking give teams a full picture of growth without hours of manual reporting.',
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

  const features = [
    {
      featureMainTitle: 'Why Do Practices Love S Cubed Authorization Management?',
    },
    {
      icon: <BaggageClaim size={28} />,
      title: 'Fewer Claim Rejections, Stronger Cash Flow',
      description:'Authorizations are validated before billing, helping you prevent costly denials and delays.',
      accentColor: '#7a7eed',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    },
    {
      icon: <Timer size={28} />,
      title: 'Real-Time Visibility, Zero Guesswork',
      description:'Instantly see balances, expirations, and utilization without waiting on reports.',
      accentColor: '#22d3ee',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    },
    {
      icon: <CalendarClock size={28} />,
      title: 'Save Hours Every Week',
      description:'Automation handles renewals, tracking, and reminders so your team can focus on clients, not paperwork.',
      accentColor: '#34d399',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    },
    {
      icon: <FileClock size={28} />,
      title: 'Audit-Ready, Every Time',
      description:'Every update, action, and authorization change is logged for transparency and compliance peace of mind.',
      accentColor: '#fb7185',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
    },
  ];
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Authorization', item: '/authorization' },
        ]}
      />
      <FAQSchema faqs={allFAQs} pageSlug="authorization" />
      <Container>
        <Hero />

        <ContentSection
          titleText="All Your Authorizations, Finally in One Place"
          descriptionText="
          See every client authorization in one clean, searchable view, so your team always knows what’s active, what’s pending, and what needs attention.  
          <br />
          <ul>
            <li>Filter by client, payer, or date without getting lost in details</li>
            <li>Give each role the right access with built-in accountability</li>
            <li>See active, pending, and expired authorizations at a glance</li>
          </ul>
          "
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={AllYourAuthorizationsFinallyInOnePlace}
          imageAlt="ABA data collection during therapy session"
        />

        <ContentSection
          titleText="Linked Automatically, So No Assumptions"
          descriptionText="
          S Cubed connects CPT codes and diagnosis codes for you, keeping your billing clean and your reporting spot-on.
          <br />
          <ul>
            <li>Map multiple CPT codes to a single authorization</li>
            <li>Attach primary and secondary diagnosis codes in seconds</li>
            <li>Built-in validation catches mistakes before claims go out</li>
          </ul>
          "
          backgroundColor="#f9fafb"
          imagePosition="right"
          imageSrc={LinkedAutomaticallySoNoAssumptions}
          imageAlt="Graphing and reporting for ABA goals"
        />

        <ContentSection
          titleText="Never Lose Track of Expirations Again"
          descriptionText="
          S Cubed keeps an eye on every authorization and sends friendly reminders before anything expires or runs low on units.<br/><br />Smart Alerts You Control
          <ul>
            <li>Smart alerts at 60/30/14/7 days</li>
            <li>Low-unit notifications you control</li>
            <li>In-app and email reminders that keep everyone in sync</li>
          </ul>
          "
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={NeverLoseTrackOfExpirationsAgain}
          imageAlt="Document and template management in ABA software"
        />

        <Trust features={features.slice(1)} heading={features[0].featureMainTitle || ''} />

        {/* {faqData.sections.map((section, index) => (
          <FAQSection
            key={section.items[0].question}
            title={index === 0 ? faqData.title : ''}
            faqs={section.items}
          />
        ))} */}

        <CTA title="Authorization Management Shouldn’t Be A Full-time Job" description="We know the struggle of tracking expirations, renewing on time, and keeping billing compliant. S Cubed takes the complexity out of authorization management with smart automation and built-in alerts. Our prior authorization software gives your team time back to focus on what really matters." buttonText="Schedule a Demo →" />
      </Container>
    </>
  );
}

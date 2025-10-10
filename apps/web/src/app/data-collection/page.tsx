import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import DataCollectionCTA from '../../components/data-collection/DataCollectionCTA';
import ContentSection from '../../components/data-collection/DataCollectionFeatures';
import DataCollectionHero from '../../components/data-collection/DataCollectionHero';
import DataCollectionTrust from '../../components/data-collection/DataCollectionTrust';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';
import fallbackImg from '../../images/data-collection.png';
import goalImg from '../../images/data-collection/from-goals-to-measurable-change.png'

export const metadata: Metadata = {
  title:
    'ABA Data Collection Software | Real-Time Therapy Tracking & Reporting',
  description:
    'Track goals, behaviors, and session progress in real time with S Cubed - the all-in-one data collection and reporting platform made for behavior analysis and therapy practices.',
  alternates: {
    canonical: '/data-collection',
  },
};

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
            'How do visual reports and dashboards enhance ABA therapy monitoring?',
          answer:
            'Visual reports simplify complex data. Instead of reading long logs, therapists can see progress and behavior trends in graphs and dashboards that update in real time. These visual summaries make it easier to explain results to families, track long-term outcomes, and identify where a treatment plan may need adjustment.',
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
        <DataCollectionHero />

        <ContentSection
          titleText="Record Data as You Work"
          descriptionText="<strong>S Cubed</strong> helps you stay focused during every session. With our <strong>ABA data collection software</strong>, you can record behaviors, goals, and notes in <strong>real time</strong>, without interrupting the flow of therapy. Built for applied behavior analysis, it keeps your data organized, accurate, and ready whenever you need it."
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={fallbackImg}
          imageAlt="ABA data collection during therapy session"
        />

        <ContentSection
          titleText="From Goals to Measurable Change"
          descriptionText="S Cubed's data collection & reporting for therapy practices helps you define goals, visualize trends, and make <strong>informed, confident decisions</strong>. Whether you're tracking skill acquisition or behavior reduction, our <strong>visual reports</strong> make progress easy to see - and easier to explain."
          backgroundColor="#f9fafb"
          imagePosition="right"
          imageSrc={goalImg}
          imageAlt="Graphing and reporting for ABA goals"
        />

        <ContentSection
          titleText="Build Smarter Templates, Get Clearer Reports"
          descriptionText="Save time with <strong>templates that think ahead</strong>. S Cubed's ABA software and reporting tools automatically turn session notes into <strong>insights you can share</strong>. Create consistent assessments and plans once - then reuse them for every client. Accurate, simple, and designed for therapy teams that need reliable, fast results."
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={fallbackImg}
          imageAlt="Document and template management in ABA software"
        />

        <DataCollectionTrust />

        {faqData.sections.map((section, index) => (
          <FAQSection
            key={section.items[0].question}
            title={index === 0 ? faqData.title : ''}
            faqs={section.items}
          />
        ))}

        <DataCollectionCTA />
      </Container>
    </>
  );
}

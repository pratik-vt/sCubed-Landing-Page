import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import BillingCTA from '../../components/billing/BillingCTA';
import BillingFeatures from '../../components/billing/BillingFeatures';
import BillingHero from '../../components/billing/BillingHero';
import BillingKeyFeatures from '../../components/billing/BillingKeyFeatures';
import BillingWorkflow from '../../components/billing/BillingWorkflow';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';

export const metadata: Metadata = {
  title: 'ABA Therapy Billing & RCM Services | Software for Claims & Insurance',
  description:
    'Optimize ABA therapy billing with expert RCM services and software. Manage claims, authorizations, and payments efficiently - all from one secure platform.',
  alternates: {
    canonical: '/billing',
  },
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Billing FAQs',
  sections: [
    {
      name: 'Billing',
      items: [
        {
          question: 'Does S Cubed offer billing features in-house?',
          answer: 'Yes. S Cubed includes built-in billing features that allow you to generate invoices, track payments, manage insurance claims, and monitor account balances directly within the platform, eliminating the need for separate billing software.'
        },
        {
          question: 'Can payments be tracked in the portal?',
          answer: 'Yes. The clinic can track all payments, view pending or completed transactions, and maintain a clear payment history.'
        },
        {
          question: 'Can S Cubed handle insurance checks and eligibility criteria?',
          answer: 'Yes. S Cubed can verify patient insurance details and check eligibility criteria through integrated insurance verification tools. This helps ensure coverage information is accurate before appointments, reducing claim denials and streamlining billing.'
        },
        {
          question: 'How does S Cubed help with claim rejections?',
          answer: 'S Cubed helps minimize claim rejections by validating insurance and client information before submission, flagging missing or incorrect details, and ensuring claims are formatted according to payer requirements.'
        },
        {
          question: 'How will I know when the payer has paid?',
          answer: 'You will receive a notification within the S Cubed portal as soon as the payment is posted. You can also view payment status and details anytime in the Billing section of your account.'
        }
      ]
    }
  ]
};

// Fetch data at request time
async function getBillingFAQs() {
  const faqData = await getFAQCollection('billing-faqs');
  const transformedData = transformFAQData(faqData);
  
  if (!transformedData) {
    // Return fallback data if API fails
    return fallbackFAQData;
  }

  return transformedData;
}

export default async function BillingPage() {
  const faqData = await getBillingFAQs();

  // Flatten all FAQ items for schema
  const allFAQs = faqData.sections.flatMap(section => section.items);

  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Billing', item: '/billing' }
        ]} 
      />
      <FAQSchema faqs={allFAQs} pageSlug="billing" />
      <Container>
        <BillingHero />
        <BillingFeatures />
        <BillingWorkflow />
        <BillingKeyFeatures />
        
        {faqData.sections.map((section, index) => (
          <FAQSection 
            key={section.name}
            title={index === 0 ? faqData.title : ""}
            sectionTitle={section.name}
            faqs={section.items}
          />
        ))}
        
        <BillingCTA />
      </Container>
    </>
  );
}
import type { Metadata } from 'next';

import Container from '../../components/Container';
import FAQSection from '../../components/FAQSection';
import Footer from '../../components/Footer/footer';
import HeaderSimple from '../../components/features/HeaderSimple';
import BillingHero from '../../components/billing/BillingHero';
import BillingFeatures from '../../components/billing/BillingFeatures';
import BillingWorkflow from '../../components/billing/BillingWorkflow';
import BillingKeyFeatures from '../../components/billing/BillingKeyFeatures';
import BillingCTA from '../../components/billing/BillingCTA';

export const metadata: Metadata = {
  title: 'ABA Therapy Billing & RCM Services | Software for Claims & Insurance',
  description:
    'Optimize ABA therapy billing with expert RCM services and software. Manage claims, authorizations, and payments efficiently - all from one secure platform.',
};

const billingFAQs = [
  {
    question: 'Does S Cubed offer billing features in-house?',
    answer: 'Yes. S Cubed includes built-in billing features that allow you to generate invoices, track payments, manage insurance claims, and monitor account balances directly within the platform—eliminating the need for separate billing software.'
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
];

export default function BillingPage() {
  return (
    <Container>
      <HeaderSimple />
      <BillingHero />
      <BillingFeatures />
      <BillingWorkflow />
      <BillingKeyFeatures />
      
      <FAQSection 
        title="Billing FAQs"
        sectionTitle="Billing"
        faqs={billingFAQs}
      />
      
      <BillingCTA />
      <Footer />
    </Container>
  );
}

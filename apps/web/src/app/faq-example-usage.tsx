// Example usage of FAQSection component in your pages
// This file shows how to import and use the FAQSection component

import FAQSection from '@/components/FAQSection';

// Example 1: Basic usage with default props (uses built-in mock data)
export function BasicUsage() {
  return <FAQSection />;
}

// Example 2: Custom title
export function WithCustomTitle() {
  return <FAQSection title="Common Questions" />;
}

// Example 3: Custom FAQ data from API or CMS
export function WithCustomData() {
  const customFAQs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, ACH transfers, and offer flexible payment plans for annual subscriptions.',
    },
    {
      question: 'Can I migrate my existing patient data?',
      answer: 'Yes! Our migration team will help you securely transfer all your existing patient records, appointments, and billing information to S Cubed.',
    },
  ];

  return <FAQSection title="Billing & Migration" faqs={customFAQs} />;
}

// Example 4: With custom className for additional styling
export function WithCustomStyling() {
  return <FAQSection className="my-custom-faq-section" />;
}

// Example 5: Complete integration in a page
export function FullPageExample() {
  return (
    <div>
      {/* Your other page content */}
      <h1>Welcome to Our Service</h1>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* More page content */}
    </div>
  );
}
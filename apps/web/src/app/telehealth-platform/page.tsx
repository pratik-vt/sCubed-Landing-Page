import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import TelehealthPlatformBenefits from '../../components/telehealth-platform/TelehealthPlatformBenefits';
import TelehealthPlatformCTA from '../../components/telehealth-platform/TelehealthPlatformCTA';
import TelehealthPlatformHero from '../../components/telehealth-platform/TelehealthPlatformHero';
import TelehealthPlatformWhyChoose from '../../components/telehealth-platform/TelehealthPlatformWhyChoose';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';

import TelehealthPlatformHIPPACompliance from '@/components/telehealth-platform/TelehealthPlatformHIPPACompliance';

export const metadata: Metadata = {
  title: 'HIPAA-Compliant Telehealth Platform for ABA Therapy Clinics & BCBAs',
  description:
    'HIPAA-compliant telehealth for ABA therapy clinics and BCBAs. Secure calls, easy scheduling, and a stress-free 30-day free trial.',
  alternates: {
    canonical: '/telehealth-platform',
  },
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Frequently Asked Questions',
  sections: [
    {
      items: [
        {
          question: 'How do I set up and start using a HIPAA-compliant telehealth platform?',
          answer: 'Pick a trusted telehealth or secure video platform that’s built for healthcare, then create your account and add your clients. Schedule your first session and the system will give you a secure link you can send by email or text. Before you see a real client, do a quick test call so you can check your camera, mic, and internet and fix any issues in advance.'
        },
        {
          question: 'What are the privacy and security rules I need to follow for telehealth sessions?',
          answer: 'Always use an encrypted video platform designed to protect patient information, instead of any basic social video apps. Take calls in a private, quiet space so no one else can overhear or see what’s on your screen. Store notes, recordings, and files in your practice’s secure system or encrypted storage, and avoid keeping them on your personal laptop, phone, or regular email.'
        },
        {
          question: 'How do I handle billing and insurance for telehealth sessions?',
          answer: 'You bill the same way you would for an in-person visit, but you use the appropriate telehealth modifiers and place-of-service codes. Most insurers treat telehealth the same as office-based sessions now, but it’s smart to confirm coverage the first time you bill for a new client or payer.'
        },
        {
          question: 'Can I run group, family sessions over telehealth?',
          answer: 'Yes. As long as your platform can handle multiple participants and everyone agrees to the ground rules, you can run groups and families. It helps if participants are in a private space and use headphones to protect confidentiality.'
        },
        {
          question: 'What are some good ways to keep clients engaged during telehealth therapy?',
          answer: 'Be clear about expectations up front (camera on, quiet space, no multitasking). Slow down a bit, check in more often since non-verbal cues are reduced, and name it if someone disconnects emotionally or physically. Having a quick backup plan if the call drops also keeps the session feeling safe and contained.'
        }
      ]
    },
    
  ]
};

// Fetch data at request time
async function getGuardianPortalFAQs() {
  const faqData = await getFAQCollection('guardian-portal-faqs');
  const transformedData = transformFAQData(faqData);
  
  if (!transformedData) {
    // Return fallback data if API fails
    return fallbackFAQData;
  }

  return transformedData;
}

export default async function TelehealthPlatformPage() {
  const faqData = await getGuardianPortalFAQs();

  // Flatten all FAQ items for schema
  const allFAQs = faqData.sections.flatMap(section => section.items);

  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Telehealth Platform', item: '/telehealth-platform' }
        ]} 
      />
      <FAQSchema faqs={allFAQs} pageSlug="telehealth-platform" />
      <Container>
        <TelehealthPlatformHero />        
        <TelehealthPlatformBenefits />
        <TelehealthPlatformWhyChoose />
        <TelehealthPlatformHIPPACompliance />
        
        {faqData.sections.map((section, index) => (
              <FAQSection 
              key={section.items[0].question}
              title={index === 0 ? faqData.title : ""}
              sectionTitle={""}
              faqs={section.items}
              />
            ))}
        
        <TelehealthPlatformCTA />
      </Container>
    </>
  );
}
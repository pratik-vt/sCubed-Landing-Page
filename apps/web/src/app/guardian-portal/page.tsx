import type { Metadata } from 'next';

import Container from '../../components/Container';
import FAQSection from '../../components/FAQSection';
import Footer from '../../components/Footer/footer';
import HeaderSimple from '../../components/features/HeaderSimple';
import GuardianBenefits from '../../components/guardian-portal/GuardianBenefits';
import GuardianCTA from '../../components/guardian-portal/GuardianCTA';
import GuardianHero from '../../components/guardian-portal/GuardianHero';
import GuardianIntroduction from '../../components/guardian-portal/GuardianIntroduction';
import GuardianWhyChoose from '../../components/guardian-portal/GuardianWhyChoose';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';

export const metadata: Metadata = {
  title: 'Guardian Portal | Stay Connected to Your Child\'s Care Journey',
  description:
    'Access your child\'s progress, treatment plans, and care team communications securely from anywhere. Our Guardian Portal keeps families engaged and informed.',
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Guardian Portal FAQs',
  sections: [
    {
      name: 'About Guardian Portal',
      items: [
        {
          question: 'What is the Guardian Portal?',
          answer: 'The Guardian Portal is a secure online platform that allows guardians to stay connected with their child\'s care team, track progress, manage forms, and view appointment details.'
        },
        {
          question: 'How do I access the Guardian Portal?',
          answer: 'You can access the Guardian Portal by logging in with your provided username and password via our website or mobile app. If you\'re a new user, you\'ll receive an email invitation with setup instructions from your clinic.'
        },
        {
          question: 'Is there a cost to use the Guardian Portal?',
          answer: 'No. Access to the Guardian Portal is provided as part of your child\'s therapy clinic enrollment.'
        },
        {
          question: 'Is Guardian Portal available on mobile devices?',
          answer: 'Yes. The Guardian Portal is mobile-friendly and can be accessed through any web browser or via our mobile app for iOS and Android.'
        }
      ]
    },
    {
      name: 'Features & Usage',
      items: [
        {
          question: 'Can multiple guardians have access to the same client\'s account?',
          answer: 'Yes. Multiple guardians can have access, but each guardian will be provided their own individual account in the Guardian Portal.'
        },
        {
          question: 'Can I view my child\'s therapy progress in the Guardian Portal?',
          answer: 'Yes. You can view progress reports and goal updates on the guardian portal.'
        },
        {
          question: 'Can I complete intake forms through the Guardian Portal?',
          answer: 'Yes. Intake forms are available in your account, allowing you to complete them online without printing or mailing documents.'
        },
        {
          question: 'What type of tasks might be assigned to me?',
          answer: 'Tasks could include at-home practice, forms to fill out, or reminders related to your child\'s therapy plan.'
        },
        {
          question: 'How do I communicate with my child\'s care team using the Guardian Portal?',
          answer: 'The portal includes a secure messaging feature, enabling you to send and receive messages directly from your child\'s care team.'
        },
        {
          question: 'Can I see upcoming appointments in the Guardian Portal?',
          answer: 'Yes. The Calendar section displays all scheduled sessions, along with dates, times, and any related instructions.'
        },
        {
          question: 'Will I get notified when there is a new update or message?',
          answer: 'Yes. The portal sends notifications for announcements, new tasks, or messages from your care team.'
        },
        {
          question: 'Can I upload or share documents with the care team through the Guardian Portal?',
          answer: 'Yes. The portal supports secure document sharing so you can upload forms, medical records, or other relevant files.'
        },
        {
          question: 'Do I need special training to use it?',
          answer: 'No. The Guardian Portal is designed to be simple and easy to use, even if you\'re not very tech-savvy.'
        }
      ]
    },
    {
      name: 'Security & Permissions',
      items: [
        {
          question: 'Is the Guardian Portal secure and HIPAA compliant?',
          answer: 'Yes. The Guardian Portal uses encryption and follows HIPAA guidelines to ensure all personal and health information is protected.'
        },
        {
          question: 'Who can see the information inside the Guardian Portal?',
          answer: 'Only guardians with valid login credentials can access their child\'s profile. Each account is secure, and no one outside of the authorized guardian can see the information.'
        }
      ]
    }
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

export default async function GuardianPortalPage() {
  const faqData = await getGuardianPortalFAQs();

  return (
    <Container>
      <HeaderSimple />
      <GuardianHero />
      <GuardianIntroduction />
      <GuardianBenefits />
      <GuardianWhyChoose />
      
      {faqData.sections.map((section, index) => (
            <FAQSection 
              key={section.name}
              title={index === 0 ? faqData.title : ""}
              sectionTitle={section.name}
              faqs={section.items}
            />
          ))}
      
      <GuardianCTA />
      <Footer />
    </Container>
  );
}
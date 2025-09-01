import type { Metadata } from 'next';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - S Cubed ABA Practice Management',
  description:
    'Find answers to common questions about S Cubed ABA practice management software. Learn about features, pricing, security, billing, scheduling, and more.',
  alternates: {
    canonical: '/faqs',
  },
};

import {
  answer,
  chevronIcon,
  contactLink,
  contactLinkWrapper,
  contactText,
  container,
  heroContainer,
  heroContent,
  heroDescription,
  heroSubtitle,
  heroTitle,
  heroTitleHighlight,
  qaContainer,
  qaItem,
  question,
  section,
  sectionExpanded,
  sectionHeader,
  sectionTitle,
  wrapper
} from './styles.css';


// FAQ data structure
const faqData = {
  title: 'Frequently Asked Questions',
  sections: [
    {
      name: 'About S Cubed',
      items: [
        {
          question: 'What is S Cubed?',
          answer: (
            <>
              S Cubed is an <strong>ABA practice management software</strong> that helps you run the business side of an ABA clinic. That includes managing <strong>appointments</strong>, <strong>staff</strong>, <strong>client data</strong>, <strong>billing</strong>, and <strong>progress reports</strong>.
            </>
          ),
        },
        {
          question: 'How can I access the S Cubed platform?',
          answer: (
            <>
              To access the S Cubed platform, you must have a <strong>registered email address and password</strong> created within S Cubed. Once your account is set up, you can log in <strong>securely</strong> from any device with an internet connection, whether it's a <strong>desktop, laptop, tablet, or smartphone</strong>, through our web portal or mobile app. To know more, reach out to us or check our demo.
            </>
          ),
        },
        {
          question: 'Can the platform be used outside of the US?',
          answer: (
            <>
              <strong>No.</strong> The platform is currently available only for use within the <strong>United States</strong> and is not supported for international use.
            </>
          ),
        },
        {
          question: 'How can S Cubed help your ABA practise?',
          answer: (
            <>
              S Cubed streamlines every aspect of your ABA practice, from <strong>scheduling appointments</strong> and creating <strong>customizable treatment plans & session notes</strong> to <strong>tracking client progress</strong> and managing <strong>staff availability</strong>. You can easily analyze session data, generate reports for insurance and compliance, and keep parents informed through a <strong>secure guardian portal</strong>.
            </>
          ),
        },
      ],
    },
    {
      name: 'Tasks, Announcements & Reminders',
      items: [
        {
          question: 'Can the clinic assign tasks and reminders to staff and clients?',
          answer: (
            <>
              <strong>Yes.</strong> The clinic can create, assign, and track <strong>tasks and reminders</strong> to ensure staff and clients stay on top of important activities, deadlines, and follow-ups.
            </>
          ),
        },
        {
          question: 'Can the clinic share announcements with staff and clients?',
          answer: (
            <>
              <strong>Yes.</strong> The clinic can post important updates, policies, or general information as <strong>announcements</strong>, which will be visible to both <strong>staff members and clients</strong> as needed.
            </>
          ),
        },
      ],
    },
    {
      name: 'Secure Messaging',
      items: [
        {
          question: 'Does the clinic have a secure way to communicate with staff and clients?',
          answer: (
            <>
              <strong>Yes.</strong> The portal includes a <strong>HIPAA-compliant secure messaging system</strong> that allows private and safe communication between <strong>staff-to-staff</strong> and <strong>staff-to-client</strong>.
            </>
          ),
        },
      ],
    },
    {
      name: 'Management of Clinics at Multiple Locations',
      items: [
        {
          question: 'Can I enroll my multiple clinics on S Cubed?',
          answer: (
            <>
              <strong>Absolutely!</strong> S Cubed lets you manage <strong>multiple clinic locations</strong> from <strong>one account</strong>, keeping everything organized and accessible in <strong>one portal</strong>.
            </>
          ),
        },
        {
          question: 'How can I see the data of multiple clinics?',
          answer: (
            <>
              If you have <strong>access permissions</strong> for more than one clinic, you can view their data by <strong>switching between clinics</strong> from the clinic selection menu in your account. Once you select a clinic, all <strong>reports, appointments, and records</strong> will display for that clinic only.
            </>
          ),
        },
        {
          question: 'Can therapists in the same clinic view each other\'s client details?',
          answer: (
            <>
              <strong>No.</strong> Therapists can only view the details of clients who are <strong>assigned to them</strong>. Client information is restricted to maintain <strong>privacy</strong> and comply with <strong>HIPAA regulations</strong>, ensuring that data is only accessible to <strong>authorized staff</strong>.
            </>
          ),
        },
      ],
    },
    {
      name: 'Appointment Scheduling',
      items: [
        {
          question: 'Can staff book appointments directly from the calendar?',
          answer: (
            <>
              <strong>Yes.</strong> Staff can schedule appointments <strong>directly through the calendar</strong>, making it easy to manage client sessions without switching between systems.
            </>
          ),
        },
        {
          question: 'Can appointments be rescheduled or canceled through the calendar?',
          answer: (
            <>
              <strong>Yes.</strong> Staff members can request to <strong>reschedule or cancel appointments</strong>. The updates are reflected <strong>instantly</strong> in the calendar.
            </>
          ),
        },
        {
          question: 'Does the calendar show appointment details?',
          answer: (
            <>
              <strong>Yes.</strong> Clicking on an appointment in the calendar displays key details such as <strong>date, time, assigned staff, and session type</strong>.
            </>
          ),
        },
        {
          question: 'Can the clinic see multiple appointments at once?',
          answer: (
            <>
              <strong>Yes.</strong> The calendar supports a <strong>day, week, or month view</strong>, allowing the clinic to see all scheduled appointments and avoid conflicts.
            </>
          ),
        },
      ],
    },
    {
      name: 'Clinical Data & Treatment',
      items: [
        {
          question: 'Is my clinic data safe on S Cubed?',
          answer: (
            <>
              <strong>Yes.</strong> We take <strong>data security</strong> very seriously. Our platform is <strong>HIPAA-compliant</strong>, meaning all <strong>protected health information (PHI)</strong> is handled according to strict privacy and security regulations. We also implement <strong>secure user authentication</strong>, <strong>role-based access controls</strong>, and <strong>regular system monitoring</strong> to safeguard your clinic's data at all times.
            </>
          ),
        },
        {
          question: 'What size clinics can use S Cubed?',
          answer: (
            <>
              S Cubed is designed to support <strong>ABA practices of all sizes</strong>, from <strong>solo practitioners and small clinics</strong> to <strong>large multi-location organizations</strong>. Whether you have just a handful of clients or manage multiple teams, S Cubed <strong>scales with your needs</strong>, offering the flexibility to grow your practice without switching systems.
            </>
          ),
        },
        {
          question: 'Can the clinic set individual goals for each client?',
          answer: (
            <>
              <strong>Yes.</strong> Therapists can set <strong>personalized goals</strong> based on each client's treatment plan and <strong>track progress over time</strong>.
            </>
          ),
        },
        {
          question: 'Can the clinic view all client goals in one place?',
          answer: (
            <>
              <strong>Yes.</strong> The system provides a <strong>consolidated view</strong> of all client goals, making it easier for the clinic to manage and review progress across clients.
            </>
          ),
        },
        {
          question: 'Can goals be updated during the treatment?',
          answer: (
            <>
              <strong>Yes.</strong> Goals can be <strong>adjusted anytime</strong> based on the client's progress, therapist recommendations, or changing treatment needs.
            </>
          ),
        },
        {
          question: 'Can the S Cubed portal generate reports showing goal progress?',
          answer: (
            <>
              <strong>Yes.</strong> The portal allows the clinic to generate <strong>detailed reports</strong> showing <strong>goal & behavioral progress</strong> and <strong>session outcomes</strong>.
            </>
          ),
        },
        {
          question: 'Can the clinic view goal progress during or after each session?',
          answer: (
            <>
              <strong>Yes.</strong> Goal performance and progress can be <strong>updated during sessions</strong> and <strong>reviewed after each session</strong>.
            </>
          ),
        },
        {
          question: 'Can I create treatment plans directly within S Cubed?',
          answer: (
            <>
              <strong>Yes.</strong> S Cubed allows you to <strong>create, customize, and manage treatment plans</strong> directly within the platform ensuring that these plans are <strong>tailored to each client's needs</strong> and easily accessible to <strong>authorized staff</strong>.
            </>
          ),
        },
        {
          question: 'Can I create intake forms directly within S Cubed?',
          answer: (
            <>
              <strong>Yes.</strong> S Cubed allows you to create <strong>custom intake forms</strong> directly within the platform, so you can collect <strong>client information, medical history, and consent documents digitally</strong>. These forms can be tailored to your clinic's needs and shared with clients for easy, <strong>paperless completion</strong>.
            </>
          ),
        },
        {
          question: 'Can multiple staff members contribute to tracking the same client\'s goals?',
          answer: (
            <>
              <strong>Yes.</strong> Multiple <strong>authorized staff members</strong> working with the same client can update and review the client's goal progress, ensuring <strong>coordinated care</strong>.
            </>
          ),
        },
        {
          question: 'How does the clinic record and manage session details?',
          answer: (
            <>
              Therapists can add <strong>session notes directly</strong> in the portal, making it easy to document therapy sessions, <strong>track interventions</strong>, and maintain <strong>complete client records</strong>.
            </>
          ),
        },
        {
          question: 'Can the clinic generate reports?',
          answer: (
            <>
              <strong>Yes.</strong> The portal provides <strong>detailed clinic-level reports</strong>, helping staff and administrators review <strong>client progress, appointment history, and overall clinic performance</strong>.
            </>
          ),
        },
      ],
    },
    {
      name: 'Management of Staff',
      items: [
        {
          question: 'Can I assign staff to specific clients?',
          answer: (
            <>
              <strong>Yes.</strong> In S Cubed, staff can be <strong>assigned to clients</strong> based on the client's specific needs. This ensures that each client is matched with the <strong>most suitable provider</strong> for their care.
            </>
          ),
        },
        {
          question: 'Can S Cubed manage staff availability?',
          answer: (
            <>
              <strong>Yes.</strong> S Cubed lets you manage both <strong>staff shifts and availability</strong>. Clinic admins can <strong>assign shifts, block time off, and update schedules in real time</strong>, ensuring appointments are booked only when staff are available.
            </>
          ),
        },
      ],
    },
  ],
};

'use client';

export default function FAQPage() {
  const [openSectionIndex, setOpenSectionIndex] = useState<number>(0); // First section open by default

  const toggleSection = (index: number) => {
    setOpenSectionIndex(openSectionIndex === index ? -1 : index);
  };

  // Animation variants for section content
  const sectionVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      transition: {
        height: {
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1]
        },
        opacity: {
          duration: 0.2,
          ease: 'easeOut'
        }
      }
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      overflow: 'hidden',
      transition: {
        height: {
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1]
        },
        opacity: {
          duration: 0.2,
          ease: 'easeIn',
          delay: 0.05
        }
      }
    }
  };

  // Chevron animation variants
  const chevronVariants: Variants = {
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    open: {
      rotate: 180,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <>
      
        <div className={heroContainer}>
          <div className={heroContent}>
            <h1 className={heroTitle}>
              Frequently Asked <span className={heroTitleHighlight}>Questions</span>
            </h1>
            <p className={heroSubtitle}>
              Everything you need to know about <span className={heroTitleHighlight} style={{ fontWeight: 600 }}>S Cubed</span> – from getting started to maximizing your practice efficiency
            </p>
            <p className={heroDescription}>
              Find quick answers to common questions about our ABA practice management software,
              or reach out to our support team for personalized assistance.
            </p>
          </div>
        </div>
      
      
      <div className={container}>
        <div className={wrapper}>
          {faqData.sections.map((sectionData, sectionIndex) => {
            const isOpen = openSectionIndex === sectionIndex;
            
            return (
              <div key={sectionData.name} className={`${section} ${isOpen ? sectionExpanded : ''}`}>
                <button
                  className={sectionHeader}
                  onClick={() => toggleSection(sectionIndex)}
                  aria-expanded={isOpen}
                  aria-controls={`section-${sectionIndex}`}
                >
                  <h2 className={sectionTitle}>{sectionData.name}</h2>
                  <motion.span
                    className={chevronIcon}
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}
                    variants={chevronVariants}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`section-content-${sectionData.name}`}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={sectionVariants}
                      id={`section-${sectionIndex}`}
                      style={{ overflow: 'hidden' }}
                    >
                      <motion.div
                        className={qaContainer}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {sectionData.items.map((item) => (
                          <div key={item.question} className={qaItem}>
                            <h3 className={question}>{item.question}</h3>
                            <div className={answer}>
                              <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 16 16" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ flexShrink: 0, marginRight: '12px', marginTop: '4px' }}
                              >
                                <path 
                                  d="M3 8H13M13 8L9 4M13 8L9 12" 
                                  stroke="#6B7280" 
                                  strokeWidth="1.5" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div>{item.answer}</div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          
          <div className={contactLinkWrapper}>
            <span className={contactText}>
              Didn't find your answer?{' '}
              <Link href="/get-started" className={contactLink}>
                Contact us
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

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
              S Cubed is an ABA practice management software that helps you run the business side of an ABA clinic. That includes managing appointments, staff, client data, billing, and progress reports.
            </>
          ),
        },
        {
          question: 'How can I access the S Cubed platform?',
          answer: (
            <>
              To access the S Cubed platform, you must have a registered email address and password created within S Cubed. Once your account is set up, you can log in securely from any device with an internet connection, whether it's a desktop, laptop, tablet, or smartphone, through our web portal or mobile app. To know more, reach out to us or check our demo.
            </>
          ),
        },
        {
          question: 'Can the platform be used outside of the US?',
          answer: (
            <>
              No. The platform is currently available only for use within the United States and is not supported for international use.
            </>
          ),
        },
        {
          question: 'How can S Cubed help your ABA practise?',
          answer: (
            <>
              S Cubed streamlines every aspect of your ABA practice, from scheduling appointments and creating customizable treatment plans & session notes to tracking client progress and managing staff availability. You can easily analyze session data, generate reports for insurance and compliance, and keep parents informed through a secure guardian portal.
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
              Yes. The clinic can create, assign, and track tasks and reminders to ensure staff and clients stay on top of important activities, deadlines, and follow-ups.
            </>
          ),
        },
        {
          question: 'Can the clinic share announcements with staff and clients?',
          answer: (
            <>
              Yes. The clinic can post important updates, policies, or general information as announcements, which will be visible to both staff members and clients as needed.
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
              Yes. The portal includes a HIPAA-compliant secure messaging system that allows private and safe communication between staff-to-staff and staff-to-client.
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
              Absolutely! S Cubed lets you manage multiple clinic locations from one account, keeping everything organized and accessible in one portal.
            </>
          ),
        },
        {
          question: 'How can I see the data of multiple clinics?',
          answer: (
            <>
              If you have access permissions for more than one clinic, you can view their data by switching between clinics from the clinic selection menu in your account. Once you select a clinic, all reports, appointments, and records will display for that clinic only.
            </>
          ),
        },
        {
          question: 'Can therapists in the same clinic view each other\'s client details?',
          answer: (
            <>
              No. Therapists can only view the details of clients who are assigned to them. Client information is restricted to maintain privacy and comply with HIPAA regulations, ensuring that data is only accessible to authorized staff.
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
              Yes. Staff can schedule appointments directly through the calendar, making it easy to manage client sessions without switching between systems.
            </>
          ),
        },
        {
          question: 'Can appointments be rescheduled or canceled through the calendar?',
          answer: (
            <>
              Yes. Staff members can request to reschedule or cancel appointments. The updates are reflected instantly in the calendar.
            </>
          ),
        },
        {
          question: 'Does the calendar show appointment details?',
          answer: (
            <>
              Yes. Clicking on an appointment in the calendar displays key details such as date, time, assigned staff, and session type.
            </>
          ),
        },
        {
          question: 'Can the clinic see multiple appointments at once?',
          answer: (
            <>
              Yes. The calendar supports a day, week, or month view, allowing the clinic to see all scheduled appointments and avoid conflicts.
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
              Yes. We take data security very seriously. Our platform is HIPAA-compliant, meaning all protected health information (PHI) is handled according to strict privacy and security regulations. We also implement secure user authentication, role-based access controls, and regular system monitoring to safeguard your clinic's data at all times.
            </>
          ),
        },
        {
          question: 'What size clinics can use S Cubed?',
          answer: (
            <>
              S Cubed is designed to support ABA practices of all sizes, from solo practitioners and small clinics to large multi-location organizations. Whether you have just a handful of clients or manage multiple teams, S Cubed scales with your needs, offering the flexibility to grow your practice without switching systems.
            </>
          ),
        },
        {
          question: 'Can the clinic set individual goals for each client?',
          answer: (
            <>
              Yes. Therapists can set personalized goals based on each client's treatment plan and track progress over time.
            </>
          ),
        },
        {
          question: 'Can the clinic view all client goals in one place?',
          answer: (
            <>
              Yes. The system provides a consolidated view of all client goals, making it easier for the clinic to manage and review progress across clients.
            </>
          ),
        },
        {
          question: 'Can goals be updated during the treatment?',
          answer: (
            <>
              Yes. Goals can be adjusted anytime based on the client's progress, therapist recommendations, or changing treatment needs.
            </>
          ),
        },
        {
          question: 'Can the S Cubed portal generate reports showing goal progress?',
          answer: (
            <>
              Yes. The portal allows the clinic to generate detailed reports showing goal & behavioral progress and session outcomes.
            </>
          ),
        },
        {
          question: 'Can the clinic view goal progress during or after each session?',
          answer: (
            <>
              Yes. Goal performance and progress can be updated during sessions and reviewed after each session.
            </>
          ),
        },
        {
          question: 'Can I create treatment plans directly within S Cubed?',
          answer: (
            <>
              Yes. S Cubed allows you to create, customize, and manage treatment plans directly within the platform ensuring that these plans are tailored to each client's needs and easily accessible to authorized staff.
            </>
          ),
        },
        {
          question: 'Can I create intake forms directly within S Cubed?',
          answer: (
            <>
              Yes. S Cubed allows you to create custom intake forms directly within the platform, so you can collect client information, medical history, and consent documents digitally. These forms can be tailored to your clinic's needs and shared with clients for easy, paperless completion.
            </>
          ),
        },
        {
          question: 'Can multiple staff members contribute to tracking the same client\'s goals?',
          answer: (
            <>
              Yes. Multiple authorized staff members working with the same client can update and review the client's goal progress, ensuring coordinated care.
            </>
          ),
        },
        {
          question: 'How does the clinic record and manage session details?',
          answer: (
            <>
              Therapists can add session notes directly in the portal, making it easy to document therapy sessions, track interventions, and maintain complete client records.
            </>
          ),
        },
        {
          question: 'Can the clinic generate reports?',
          answer: (
            <>
              Yes. The portal provides detailed clinic-level reports, helping staff and administrators review client progress, appointment history, and overall clinic performance.
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
              Yes. In S Cubed, staff can be assigned to clients based on the client's specific needs. This ensures that each client is matched with the most suitable provider for their care.
            </>
          ),
        },
        {
          question: 'Can S Cubed manage staff availability?',
          answer: (
            <>
              Yes. S Cubed lets you manage both staff shifts and availability. Clinic admins can assign shifts, block time off, and update schedules in real time, ensuring appointments are booked only when staff are available.
            </>
          ),
        },
      ],
    },
  ],
};

export default function FAQClient() {
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

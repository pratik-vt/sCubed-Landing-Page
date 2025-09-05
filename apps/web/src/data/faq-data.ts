export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  name: string;
  items: FAQItem[];
}

export interface FAQData {
  title: string;
  sections: FAQSection[];
}

export const faqData: FAQData = {
  title: 'Frequently Asked Questions',
  sections: [
    {
      name: 'About S Cubed',
      items: [
        {
          question: 'What is S Cubed?',
          answer: 'S Cubed is an ABA practice management software that helps you run the business side of an ABA clinic, including appointments, staff, client data, billing, and progress reports.'
        },
        {
          question: 'How can I access the S Cubed platform?',
          answer: 'You need a registered email and password created within S Cubed. Once set up, you can log in securely from any internet-connected device via the web portal or mobile app.'
        },
        {
          question: 'Can the platform be used outside of the US?',
          answer: 'No, S Cubed is currently available only for use within the United States.'
        },
        {
          question: 'How can S Cubed help your ABA practice?',
          answer: 'S Cubed streamlines practice operations, from scheduling and customizable treatment plans to tracking progress, managing staff availability, analyzing data, generating reports, and keeping parents informed via a guardian portal.'
        }
      ]
    },
    {
      name: 'Tasks, Announcements & Reminders',
      items: [
        {
          question: 'Can the clinic assign tasks and reminders?',
          answer: 'Yes. Clinics can create, assign, and track tasks and reminders for staff and clients.'
        },
        {
          question: 'Can the clinic share announcements?',
          answer: 'Yes. Clinics can post updates, policies, and general information as announcements visible to staff and clients.'
        }
      ]
    },
    {
      name: 'Secure Messaging',
      items: [
        {
          question: 'Does the clinic have a secure way to communicate?',
          answer: 'Yes. The platform includes a HIPAA-compliant secure messaging system for staff-to-staff and staff-to-client communication.'
        }
      ]
    },
    {
      name: 'Management of Clinics at Multiple Locations',
      items: [
        {
          question: 'Can I enroll multiple clinics on S Cubed?',
          answer: 'Yes. S Cubed allows you to manage multiple clinic locations from one account.'
        },
        {
          question: 'How can I see the data of multiple clinics?',
          answer: 'If you have access to multiple clinics, you can switch between them in the clinic selection menu. Reports, appointments, and records will display for the selected clinic.'
        },
        {
          question: 'Can therapists view other therapists\' client details?',
          answer: 'No. Therapists can only view details of clients assigned to them, ensuring HIPAA compliance and privacy.'
        }
      ]
    },
    {
      name: 'Appointment Scheduling',
      items: [
        {
          question: 'Can staff book, reschedule, or cancel appointments?',
          answer: 'Yes. Staff can schedule, reschedule, and cancel appointments directly through the calendar, with updates reflected instantly.'
        },
        {
          question: 'Does the calendar show appointment details?',
          answer: 'Yes. Clicking on an appointment shows details like date, time, staff, and session type. The calendar also supports day, week, or month views.'
        }
      ]
    },
    {
      name: 'Clinical Data & Treatment',
      items: [
        {
          question: 'Is clinic data safe on S Cubed?',
          answer: 'Yes. S Cubed is HIPAA-compliant, with secure authentication, role-based access, and system monitoring to protect clinic data.'
        },
        {
          question: 'What size clinics can use S Cubed?',
          answer: 'S Cubed supports practices of all sizes—from solo practitioners to large multi-location organizations—and scales as you grow.'
        },
        {
          question: 'Can the clinic set and manage client goals?',
          answer: 'Yes. Therapists can set personalized goals, view all goals in one place, update them anytime, and generate progress reports.'
        },
        {
          question: 'Can I create treatment plans and intake forms?',
          answer: 'Yes. You can create and manage treatment plans and custom intake forms directly in S Cubed, making the process digital and paperless.'
        },
        {
          question: 'Can multiple staff track a client\'s goals?',
          answer: 'Yes. Authorized staff can collaboratively update and review a client\'s goals for coordinated care.'
        },
        {
          question: 'How does the clinic manage session details?',
          answer: 'Therapists can add session notes in the portal to document therapy sessions, interventions, and maintain records.'
        },
        {
          question: 'Can the clinic generate reports?',
          answer: 'Yes. S Cubed provides detailed client-level and clinic-level reports for progress, appointments, and performance.'
        }
      ]
    },
    {
      name: 'Management of Staff',
      items: [
        {
          question: 'Can staff be assigned to specific clients?',
          answer: 'Yes. Staff can be assigned based on client needs to ensure the best provider-client match.'
        },
        {
          question: 'Can S Cubed manage staff availability?',
          answer: 'Yes. Admins can manage shifts, block time off, and update staff availability in real time.'
        }
      ]
    }
  ]
};

// Flatten all FAQ items for schema generation
export const getAllFAQItems = (): FAQItem[] => {
  return faqData.sections.flatMap(section => section.items);
};
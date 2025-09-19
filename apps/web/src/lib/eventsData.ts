export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'webinar' | 'conference' | 'workshop' | 'announcement' | 'training';
  registrationLink?: string;
}

export const eventsData: Event[] = [
  {
    id: 'event-1',
    title: 'ABA Therapy Innovation Summit 2025',
    description: 'Join industry leaders for an exclusive conference on the latest advancements in ABA therapy practice management, insurance billing innovations, and regulatory compliance updates. Network with practitioners and discover cutting-edge solutions for modern therapy practices.',
    date: '2025-02-15',
    time: '9:00 AM - 5:00 PM EST',
    location: 'Orlando Convention Center, FL',
    type: 'conference',
    registrationLink: '#',
  },
  {
    id: 'event-2',
    title: 'Mastering Insurance Authorization Workflows',
    description: 'Learn proven strategies to streamline your authorization process, reduce denial rates, and accelerate reimbursements. This hands-on webinar covers best practices for documentation, submission timing, and follow-up protocols.',
    date: '2025-01-28',
    time: '2:00 PM - 3:30 PM EST',
    location: 'Virtual Webinar',
    type: 'webinar',
    registrationLink: '#',
  },
  {
    id: 'event-3',
    title: 'S Cubed 4.0 Release: Next-Gen Practice Management',
    description: 'Be the first to experience our groundbreaking new features including AI-powered scheduling optimization, enhanced telehealth capabilities, and revolutionary billing automation. Live demonstration and Q&A session included.',
    date: '2025-02-01',
    time: '11:00 AM EST',
    location: 'Virtual Launch Event',
    type: 'announcement',
    registrationLink: '#',
  },
  {
    id: 'event-4',
    title: 'HIPAA Compliance Workshop for Therapy Practices',
    description: 'Comprehensive training on maintaining HIPAA compliance in digital therapy practices. Cover recent regulatory updates, security best practices, and implementation strategies for protecting patient data.',
    date: '2025-02-08',
    time: '10:00 AM - 12:00 PM EST',
    location: 'Virtual Workshop',
    type: 'workshop',
    registrationLink: '#',
  },
  {
    id: 'event-5',
    title: 'School-Based Therapy Services Excellence',
    description: 'Specialized workshop focusing on managing school-based therapy programs, IEP integration, district billing procedures, and effective collaboration with educational teams. Includes case studies from successful implementations.',
    date: '2025-02-20',
    time: '3:00 PM - 5:00 PM EST',
    location: 'Atlanta, GA',
    type: 'workshop',
    registrationLink: '#',
  },
  {
    id: 'event-6',
    title: 'Telehealth Integration Masterclass',
    description: 'Discover how to seamlessly integrate telehealth services into your practice. Learn about platform selection, session documentation, insurance billing for virtual visits, and maintaining therapeutic rapport online.',
    date: '2025-03-05',
    time: '1:00 PM - 2:30 PM EST',
    location: 'Virtual Webinar',
    type: 'webinar',
    registrationLink: '#',
  },
  {
    id: 'event-7',
    title: 'Multi-Disciplinary Clinic Management Strategies',
    description: 'Expert panel discussion on coordinating ABA, OT, Speech, and PT services within a single practice. Topics include scheduling optimization, cross-discipline documentation, and unified billing approaches.',
    date: '2025-03-12',
    time: '4:00 PM - 5:30 PM EST',
    location: 'Virtual Panel',
    type: 'webinar',
    registrationLink: '#',
  },
  {
    id: 'event-8',
    title: 'CPT Coding Updates for Allied Health 2025',
    description: 'Essential training on the latest CPT code changes affecting ABA, occupational, speech, and physical therapy practices. Learn proper coding techniques to maximize reimbursements and minimize claim denials.',
    date: '2025-03-18',
    time: '9:00 AM - 11:00 AM EST',
    location: 'Chicago, IL',
    type: 'training',
    registrationLink: '#',
  },
  {
    id: 'event-9',
    title: 'Building High-Performance Therapy Teams',
    description: 'Leadership workshop focused on recruiting, training, and retaining top therapy professionals. Explore effective supervision models, professional development programs, and creating positive workplace culture.',
    date: '2025-03-25',
    time: '2:00 PM - 4:00 PM EST',
    location: 'Virtual Workshop',
    type: 'workshop',
    registrationLink: '#',
  },
  {
    id: 'event-10',
    title: 'Data-Driven Decision Making in Therapy Practices',
    description: 'Learn to leverage analytics and reporting tools to optimize practice operations, track patient outcomes, and identify growth opportunities. Includes hands-on dashboard creation and KPI tracking.',
    date: '2025-04-02',
    time: '11:00 AM - 12:30 PM EST',
    location: 'Virtual Webinar',
    type: 'webinar',
    registrationLink: '#',
  },
  {
    id: 'event-11',
    title: 'Parent Engagement & Family Support Systems',
    description: 'Strategies for building strong family partnerships in therapy services. Cover communication protocols, parent training programs, home practice support, and leveraging family involvement for better outcomes.',
    date: '2025-04-10',
    time: '3:00 PM - 4:30 PM EST',
    location: 'Virtual Workshop',
    type: 'workshop',
    registrationLink: '#',
  },
  {
    id: 'event-12',
    title: 'S Cubed User Conference 2025',
    description: 'Annual gathering of S Cubed users featuring advanced training sessions, product roadmap reveals, networking opportunities, and direct access to our product team. Early bird registration now open with exclusive discounts.',
    date: '2025-05-15',
    time: '8:00 AM - 6:00 PM EST',
    location: 'Las Vegas, NV',
    type: 'conference',
    registrationLink: '#',
  },
];

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

export function getUpcomingEvents(limit?: number): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = eventsData
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getEventsByType(type: Event['type']): Event[] {
  return eventsData.filter(event => event.type === type);
}
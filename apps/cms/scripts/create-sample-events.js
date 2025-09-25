const fs = require('fs');
const path = require('path');

async function createSampleEvents(strapi) {
  console.log('🎪 Creating sample events...');

  try {
    // Check if events already exist
    const existingEvents = await strapi.entityService.findMany('api::event.event', {
      limit: 1,
    });

    if (existingEvents && existingEvents.length > 0) {
      console.log('⚠️  Events already exist. Deleting existing events first...');
      // Delete existing events
      const allEvents = await strapi.entityService.findMany('api::event.event', {
        limit: 100,
      });
      for (const event of allEvents) {
        await strapi.entityService.delete('api::event.event', event.id);
      }
      console.log('✅ Existing events deleted');
    }

    // Get categories and tags
    const categories = await strapi.entityService.findMany('api::category.category', {
      limit: 10,
    });

    const tags = await strapi.entityService.findMany('api::tag.tag', {
      limit: 10,
    });

    // Helper function to get future date (date only, no time)
    const getFutureDate = (daysFromNow) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromNow);
      return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
    };

    // Helper function to get past date (date only, no time)
    const getPastDate = (daysAgo) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
    };

    // Helper function to format time in HH:mm:ss format
    const formatTime = (hours, minutes = 0) => {
      const h = hours.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      return `${h}:${m}:00.000`;
    };

    // Sample events data - mix of upcoming, ongoing, and completed events
    const eventsData = [
      // Featured upcoming events
      {
        title: 'ABA Therapy Innovation Summit 2025',
        slug: 'aba-therapy-innovation-summit-2025',
        excerpt: 'Premier conference on ABA therapy innovations, practice management, and regulatory compliance.',
        description: '<h2>About the Summit</h2><p>Join industry leaders for an exclusive conference on the latest advancements in ABA therapy practice management. This comprehensive summit covers insurance billing innovations, regulatory compliance updates, and cutting-edge technology solutions.</p><h3>Key Topics</h3><ul><li>Insurance Authorization Best Practices</li><li>HIPAA Compliance Updates</li><li>Digital Transformation in Therapy</li><li>Practice Growth Strategies</li><li>AI and Machine Learning in Therapy</li></ul><h3>Who Should Attend</h3><p>Practice owners, clinical directors, billing specialists, and therapy professionals looking to stay ahead of industry trends.</p><h3>Event Highlights</h3><ul><li>50+ Expert Speakers</li><li>Networking Opportunities</li><li>Vendor Exhibition</li><li>Certificate of Completion</li></ul>',
        start_date: getFutureDate(60),
        end_date: getFutureDate(62),
        time: formatTime(9, 0),
        location: 'Orlando Convention Center, 9899 International Drive, Orlando, FL 32819',
        registration_url: 'https://example.com/register/summit-2025',
        featured: true,
        meta_title: 'ABA Therapy Innovation Summit 2025 | S Cubed Events',
        meta_description: 'Join the premier ABA therapy conference. Learn about practice management, insurance billing, and compliance updates.',
        social_share: true,
        categories: categories.slice(0, 2),
        tags: tags.slice(0, 3),
      },
      {
        title: 'Mastering Insurance Authorization Workflows',
        slug: 'mastering-insurance-authorization-workflows',
        excerpt: 'Hands-on webinar on streamlining insurance authorization and reducing denial rates.',
        description: '<h2>Workshop Overview</h2><p>Learn proven strategies to streamline your authorization process, reduce denial rates, and accelerate reimbursements. This hands-on webinar covers best practices for documentation, submission timing, and follow-up protocols.</p><h3>What You\'ll Learn</h3><ul><li>Authorization documentation requirements</li><li>Common denial reasons and how to avoid them</li><li>Follow-up best practices</li><li>Technology tools for automation</li><li>Creating efficient workflows</li></ul><h3>Interactive Session</h3><p>Participate in live Q&A sessions and work through real-world scenarios with our experts.</p>',
        start_date: getFutureDate(15),
        end_date: getFutureDate(15),
        time: formatTime(14, 0),
        location: 'Online Event',
        registration_url: 'https://example.com/register/webinar-auth',
        featured: true,
        categories: categories.slice(1, 3),
        tags: tags.slice(2, 4),
        social_share: true,
      },

      // More upcoming events
      {
        title: 'HIPAA Compliance Workshop for Digital Practices',
        slug: 'hipaa-compliance-workshop',
        excerpt: 'Essential HIPAA compliance training for digital therapy practices.',
        description: '<h2>Workshop Details</h2><p>Comprehensive training on maintaining HIPAA compliance in digital therapy practices. Cover recent regulatory updates, security best practices, and implementation strategies for protecting patient data.</p><h3>Agenda</h3><ul><li>HIPAA Fundamentals Review</li><li>2025 Regulatory Updates</li><li>Digital Security Best Practices</li><li>Incident Response Planning</li><li>Risk Assessment Procedures</li></ul>',
        start_date: getFutureDate(30),
        end_date: getFutureDate(30),
        time: formatTime(10, 0),
        location: 'Healthcare Training Center, 123 Medical Plaza, Chicago, IL 60601',
        registration_url: 'https://example.com/register/hipaa-workshop',
        featured: false,
        categories: categories.slice(0, 1),
        tags: tags.slice(1, 3),
        social_share: true,
      },
      {
        title: 'Speech Therapy Technology Showcase',
        slug: 'speech-therapy-tech-showcase',
        excerpt: 'Explore cutting-edge technology solutions for speech therapy practices.',
        description: '<h2>Event Overview</h2><p>Discover the latest technological innovations transforming speech therapy practices. From AI-powered assessment tools to virtual therapy platforms, see how technology is reshaping patient care.</p><h3>Featured Technologies</h3><ul><li>AI Assessment Tools</li><li>Virtual Reality Therapy</li><li>Mobile Practice Apps</li><li>Teletherapy Platforms</li></ul>',
        start_date: getFutureDate(45),
        end_date: getFutureDate(45),
        time: formatTime(9, 0),
        location: 'Tech Innovation Center, 456 Innovation Drive, San Francisco, CA 94105',
        registration_url: 'https://example.com/register/tech-showcase',
        featured: false,
        categories: categories.slice(2, 4),
        tags: tags.slice(0, 2),
        social_share: true,
      },
      {
        title: 'Occupational Therapy Best Practices Forum',
        slug: 'ot-best-practices-forum',
        excerpt: 'Annual forum on evidence-based practices in occupational therapy.',
        description: '<h2>Forum Description</h2><p>Join leading OT professionals for an in-depth discussion on evidence-based practices, clinical innovations, and patient outcome improvements.</p><h3>Discussion Topics</h3><ul><li>Evidence-Based Interventions</li><li>Outcome Measurement Tools</li><li>Pediatric OT Innovations</li><li>Documentation Excellence</li></ul>',
        start_date: getFutureDate(75),
        end_date: getFutureDate(76),
        time: formatTime(8, 0),
        location: 'Medical Conference Center, 789 Health Ave, Boston, MA 02115',
        registration_url: 'https://example.com/register/ot-forum',
        featured: true,
        categories: categories.slice(1, 2),
        tags: tags.slice(3, 5),
        social_share: true,
      },

      // Ongoing event (happening now)
      {
        title: 'Virtual Therapy Excellence Week',
        slug: 'virtual-therapy-excellence-week',
        excerpt: 'Week-long series of workshops on delivering exceptional virtual therapy services.',
        description: '<h2>Event in Progress</h2><p>Currently ongoing! Join us for the remaining sessions of our Virtual Therapy Excellence Week. Each day features different aspects of virtual therapy delivery.</p><h3>Remaining Sessions</h3><ul><li>Patient Engagement Strategies</li><li>Technology Troubleshooting</li><li>Virtual Group Sessions</li><li>Outcome Tracking</li></ul>',
        start_date: getPastDate(2),
        end_date: getFutureDate(3),
        time: formatTime(9, 0),
        location: 'Online Event',
        registration_url: 'https://example.com/register/virtual-week',
        featured: false,
        categories: categories.slice(0, 2),
        tags: tags.slice(1, 3),
        social_share: true,
      },

      // Past/Completed events
      {
        title: 'Annual Therapy Practice Management Conference 2024',
        slug: 'practice-management-conference-2024',
        excerpt: 'Comprehensive conference on therapy practice management and growth strategies.',
        description: '<h2>Conference Recap</h2><p>Thank you for making our 2024 conference a success! This event brought together over 500 therapy professionals to discuss practice management excellence.</p><h3>Key Highlights</h3><ul><li>30+ Expert Presentations</li><li>Networking with 500+ Professionals</li><li>Vendor Exhibition</li><li>Awards Ceremony</li></ul><p>Recordings available for registered attendees.</p>',
        start_date: getPastDate(30),
        end_date: getPastDate(28),
        time: formatTime(9, 0),
        location: 'Las Vegas Convention Center, Las Vegas, NV',
        registration_url: '',
        featured: false,
        categories: categories.slice(0, 3),
        tags: tags.slice(0, 4),
        social_share: true,
      },
      {
        title: 'Insurance Billing Masterclass Series',
        slug: 'billing-masterclass-series-2024',
        excerpt: 'Completed series on mastering insurance billing for therapy practices.',
        description: '<h2>Series Overview</h2><p>This comprehensive masterclass series covered everything from basic billing principles to advanced reimbursement strategies.</p><h3>Topics Covered</h3><ul><li>CPT Code Updates</li><li>Claim Submission Best Practices</li><li>Denial Management</li><li>Audit Preparation</li></ul><p>Recordings available for purchase.</p>',
        start_date: getPastDate(60),
        end_date: getPastDate(45),
        time: formatTime(10, 0),
        location: 'Online Event',
        registration_url: '',
        featured: false,
        categories: categories.slice(1, 2),
        tags: tags.slice(2, 4),
        social_share: false,
      },

      // Additional upcoming events
      {
        title: 'Pediatric Therapy Innovations Symposium',
        slug: 'pediatric-therapy-symposium',
        excerpt: 'Focused symposium on innovations in pediatric therapy across all disciplines.',
        description: '<h2>Symposium Focus</h2><p>Explore breakthrough approaches in pediatric therapy, including sensory integration, play-based interventions, and family-centered care models.</p><h3>Featured Topics</h3><ul><li>Early Intervention Strategies</li><li>Sensory Processing Innovations</li><li>Technology in Pediatric Care</li><li>Parent Collaboration Models</li></ul>',
        start_date: getFutureDate(90),
        end_date: getFutureDate(91),
        time: formatTime(9, 0),
        location: 'Children\'s Medical Center, 321 Pediatric Way, Dallas, TX 75235',
        registration_url: 'https://example.com/register/pediatric-symposium',
        featured: false,
        categories: categories.slice(0, 2),
        tags: tags.slice(0, 3),
        social_share: true,
      },
      {
        title: 'Teletherapy Platform Training',
        slug: 'teletherapy-platform-training',
        excerpt: 'Comprehensive training on implementing and optimizing teletherapy platforms.',
        description: '<h2>Training Overview</h2><p>Learn to effectively implement and utilize teletherapy platforms to expand your practice reach and improve patient accessibility.</p><h3>Training Modules</h3><ul><li>Platform Selection Criteria</li><li>Technical Setup and Requirements</li><li>Patient Onboarding</li><li>Session Management</li><li>Documentation and Compliance</li></ul>',
        start_date: getFutureDate(20),
        end_date: getFutureDate(20),
        time: formatTime(13, 0),
        location: 'Online Event',
        registration_url: 'https://example.com/register/teletherapy-training',
        featured: false,
        categories: categories.slice(2, 3),
        tags: tags.slice(1, 4),
        social_share: true,
      },
      {
        title: 'Practice Growth Strategies Workshop',
        slug: 'practice-growth-workshop',
        excerpt: 'Learn proven strategies to grow your therapy practice and increase revenue.',
        description: '<h2>Workshop Goals</h2><p>Discover actionable strategies to expand your practice, attract more patients, and optimize revenue streams.</p><h3>Key Learning Points</h3><ul><li>Marketing for Therapy Practices</li><li>Referral Network Building</li><li>Service Line Expansion</li><li>Financial Planning and Management</li><li>Staff Development and Retention</li></ul>',
        start_date: getFutureDate(35),
        end_date: getFutureDate(35),
        time: formatTime(9, 0),
        location: 'Business Development Center, 555 Growth Street, Austin, TX 78701',
        registration_url: 'https://example.com/register/growth-workshop',
        featured: false,
        categories: categories.slice(0, 1),
        tags: tags.slice(2, 5),
        social_share: true,
      },
      {
        title: 'Quality Assurance in Therapy Services',
        slug: 'quality-assurance-therapy',
        excerpt: 'Implement robust quality assurance programs in your therapy practice.',
        description: '<h2>Program Overview</h2><p>Learn to develop and implement comprehensive quality assurance programs that ensure consistent, high-quality therapy services.</p><h3>Core Components</h3><ul><li>Quality Metrics Development</li><li>Performance Monitoring</li><li>Patient Satisfaction Measurement</li><li>Continuous Improvement Processes</li></ul>',
        start_date: getFutureDate(55),
        end_date: getFutureDate(55),
        time: formatTime(10, 0),
        location: 'Quality Institute, 999 Excellence Blvd, Phoenix, AZ 85001',
        registration_url: 'https://example.com/register/qa-therapy',
        featured: false,
        categories: categories.slice(1, 3),
        tags: tags.slice(0, 2),
        social_share: true,
      },
    ];

    // Create events
    for (const eventData of eventsData) {
      const event = await strapi.entityService.create('api::event.event', {
        data: {
          ...eventData,
          publishedAt: new Date(),
        },
      });
      console.log(`✅ Created event: ${event.title}`);
    }

    console.log(`🎉 ${eventsData.length} sample events created successfully!`);
  } catch (error) {
    console.error('❌ Error creating sample events:', error);
    throw error;
  }
}

module.exports = createSampleEvents;
'use client';

import React from 'react';
// @ts-expect-error - react-slick types are not installed in this workspace
import Slider from 'react-slick';

import capterraLogo from '../../images/testimonial-logo/capterra.png';
import g2Logo from '../../images/testimonial-logo/g2.png';
import softwareAdviceLogo from '../../images/testimonial-logo/softwareadvice.png';
import quote from '../../images/testimonial-logo/testimonialQuote.svg';

import {
  sliderWrapper,
  testimonialBox,
  contentSection,
  quoteImage,
  heading,
  paragraphContent,
  authorSection,
  authorInfo,
  authorHeading,
  authorParagraph,
  clutchSection,
  sectionTitle,
  sectionDescription,
  sectionHeader,
} from './styles.css';
import { StaticImageData } from 'next/image';

type Testimonial = Readonly<{
  title: string;
  subtitle: string;
  author: string;
  designation: string;
  verifiedByLogo: StaticImageData | string;
  verifiedByAlt: string;
}>;

const testimonials: Testimonial[] = [
  {
    title: 'Streamlined, Reliable, and Perfect for Managing Complex Workflows',
    subtitle:
      'The thing I love most about S Cubed is how intuitive it is once you get used to it. Managing multiple processes across departments especially when dealing with lettings and client communications has become far smoother. The platform keeps everyone on the same page, and its automation tools have saved us hours each week. I also appreciate how easy it is to pull reports and analyze team performance without having to chase down data manually.',
    author: 'Gary B.',
    designation: 'Mid-Market',
    verifiedByLogo: g2Logo,
    verifiedByAlt: 'Verified on g2',
  },
  {
    title:
      'Streamlined Operations and Smarter Decision-Making Across All Our Locations',
    subtitle:
      'I appreciate how intuitive S Cubed is. It allows us to easily manage operations across multiple outlets while maintaining a clear view of daily performance metrics. The reporting features are particularly impressive helping us identify trends, forecast demand, and make better business decisions. It’s also been great for aligning our management and in-store teams, ensuring everyone works toward the same goals.',
    author: 'Allen K.',
    designation: 'Mid-Market',
    verifiedByLogo: g2Logo,
    verifiedByAlt: 'Verified on g2',
  },
  {
    title: 'Outstanding Practice Management Platform',
    subtitle:
      'My overall experience has been very positive. The platform is reliable, user-friendly, and designed in a way that supports efficiency without overwhelming me with unnecessary features. It helps streamline workflows and makes day-to-day tasks much easier to manage.',
    author: 'Dr. Mitre N.',
    designation: 'Medical Practice',
    verifiedByLogo: capterraLogo,
    verifiedByAlt: 'Verified on capterra',
  },
  {
    title: 'A Practical Tool That Improves Efficiency in Healthcare Settings',
    subtitle:
      'S Cubed has been an excellent addition to our operations. It reduces waiting times caused by scheduling delays, cuts down paperwork, and helps us stay consistent across teams. For any healthcare organization looking for a reliable, easy-to-use management solution, S Cubed is a smart choice.',
    author: 'Ronnie K.',
    designation: 'Events Services',
    verifiedByLogo: capterraLogo,
    verifiedByAlt: 'Verified on capterra',
  },
  {
    title: 'Streamlined and Reliable Practice Management Software',
    subtitle:
      'Using S Cubed has been a very positive experience. It makes managing our therapy operations much smoother and allows us to focus more on client care rather than administration. The software is intuitive, secure, and built with therapists and clients in mind.',
    author: 'Dr. Manoj',
    designation: 'Mental Health Care',
    verifiedByLogo: softwareAdviceLogo,
    verifiedByAlt: 'Verified on softwareadvice',
  },
  {
    title: 'Keeps My Workday Organized and Less Stressful',
    subtitle:
      'My overall experience has been positive. Personally, it helps me stay on top of documentation and daily tasks without adding to my workload. A few more advanced features would make it even better.',
    author: 'Adam',
    designation: 'Medical Practice',
    verifiedByLogo: softwareAdviceLogo,
    verifiedByAlt: 'Verified on softwareadvice',
  },
  {
    title: 'Reliable Software That Keeps Our Team and Clients',
    subtitle:
      'Our overall experience with S Cubed has been very positive. One of the biggest benefits is that everything related to a client is stored in one secure place, making it easy for multiple therapists across different disciplines to stay updated on a client’s progress. The platform has really streamlined how we operate day-to-day, helping us work more efficiently and keeping our focus on client care. It’s user-friendly, and once you get familiar with the layout, navigation feels smooth. On the administrative side, S Cubed has made accounting and billing processes much simpler to manage.',
    author: 'Ayman',
    designation: 'Health, Wellness and Fitness',
    verifiedByLogo: softwareAdviceLogo,
    verifiedByAlt: 'Verified on softwareadvice',
  },
];

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 600,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Testimonials: React.FC = () => {
  return (
    <div className={sliderWrapper}>
        <div className={sectionHeader}>
            <h2 className={sectionTitle}>Testimonials</h2>
            <p className={sectionDescription}>We Made It Happen…</p>
        </div>
      <Slider {...sliderSettings}>
        {testimonials.map((t, idx) => (
          <div key={idx}>
            <div className={testimonialBox}>
              <div className={contentSection}>
                <div className={quoteImage}>
                  <img
                    decoding="async"
                    src={quote.src}
                    alt="quote"
                  />
                </div>
                <div className={heading}>{t.title}</div>
                <div className={paragraphContent}>
                  {t.subtitle}
                </div>
              </div>
              <div className={authorSection}>
                <div className={authorInfo}>
                  <div className={authorHeading}>{t.author}</div>
                  <p className={authorParagraph}>{t.designation}</p>
                </div>
                <div className={clutchSection}>
                  <img
                    height="35"
                    decoding="async"
                    src={typeof t.verifiedByLogo === 'string' ? t.verifiedByLogo : t.verifiedByLogo.src}
                    alt={t.verifiedByAlt}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;



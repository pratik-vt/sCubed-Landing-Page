import USATodayMobileImage from '../../public/images/As featured in USA Today-mobile.jpg';
import USATodayImage from '../../public/images/As featured in USA Today.jpg';
import BannerImage from '../../public/images/Banner.jpg';
import NYSABA2025Image from '../../public/images/NYSABA Event Banner.jpg';
import { HeroSliderItem } from '../components/HeroImageSlider';

export const heroSliderData: HeroSliderItem[] = [
  {
    id: 'empowering-practice',
    title:
      'ABA Practice Management Software\nThat Empowers Your Practice\nAnd The People You Serve',
    mobileTitle:
      'ABA Practice Management Software That Empowers Your Practice And The People You Serve',
    description:
      'S Cubed is an all-in-one platform with powerful clinical tools, applied behavior analysis (ABA) data collection, and therapy practice management features, built to streamline operations and improve outcomes. Whether supporting healthcare clinics, ABA services, or school-based programs, S Cubed helps you deliver exceptional care with less hassle and greater efficiency.',
    image: {
      src: BannerImage,
      alt: 'S Cubed Practice Management Dashboard',
      width: 1920,
      height: 800,
    },
    secondaryLink: {
      href: '/get-started',
      text: 'Book a Free Demo',
    },
    link: {
      href: '/get-started',
      text: 'Get Started for Free',
    },
    contentAlign: 'center', // Example: Center this slide's content
  },
  {
    id: 'nysaba-2025-the-future-of-aba',
    title: "Join us at NYSABA 2025 - The Future of ABA",
    description:
      "Let's connect, collaborate, and explore smarter ways to streamline ABA practice.",
    eventDate: "October 9-10, 2025",
    eventLocation: "Albany Capital Center, Albany, NY",
    image: {
      src: NYSABA2025Image,
      alt: 'Join us at NYSABA 2025 - The Future of ABA',
      width: 1920,
      height: 800,
      mobilePosition: 'center center',
    },
    link: {
      href: '/events/the-future-of-aba-at-nysaba-2025-be-part-of-the-conversation',
      text: "Join us at NYSABA 2025",
      mobileText: "Join us at NYSABA 2025", // Shorter text for mobile
    },
    contentWidth: '30%', // Set content width to 30%
  },
  {
    id: 'from-mothers-journey',
    title: "From a Mother's Journey Became a Lifeline for Families",
    description:
      'How <a href="https://www.trevorsplace.net/" target="_blank" rel="noopener noreferrer">Trevor\'s Place</a> & <a href="https://scubed.io/">S Cubed</a> are transforming therapy and family communication through innovation and compassion.',
    image: {
      src: USATodayImage,
      alt: 'As featured in USA Today',
      width: 1920,
      height: 800,
      mobileSrc: USATodayMobileImage, // Optional mobile image
      // position: 'center right', // Keep person visible on desktop
      mobilePosition: 'right center', // Center the person on mobile
    },
    link: {
      href: 'https://www.usatoday.com/story/special/contributor-content/2025/08/28/from-playing-school-to-building-trevors-place-how-one-mothers-journey-became-a-lifeline-for-families/85873205007/',
      text: "As featured in 'USA Today'",
      mobileText: "As in 'USA Today'", // Shorter text for mobile
      external: true,
    },
  },
];

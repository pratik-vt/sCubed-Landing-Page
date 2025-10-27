import USATodayMobileImage from '../../public/images/As featured in USA Today-mobile.jpg';
import USATodayImage from '../../public/images/As featured in USA Today.jpg';
import BannerImage from '../../public/images/Banner.jpg';
// import NYSABA2025Image from '../../public/images/NYSABA Event Banner.jpg';
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
    link: {
      href: '/get-started',
      text: 'Start 30 Days Free Trial Today',
    },
    contentAlign: 'center', // Example: Center this slide's content
  },
  // {
  //   id: 'nysaba-2025-the-future-of-aba',
  //   title: "Join us at BABAT 2025",
  //   description:
  //     "Let's connect, collaborate, and explore smarter ways to streamline ABA practice.",
  //   eventStartDate: "2025-10-15",
  //   eventEndDate: "2025-10-17",
  //   eventLocation: "50 Foster Street, Worcester, MA 01608, USA",
  //   image: {
  //     src: NYSABA2025Image,
  //     alt: 'Join us at BABAT 2025',
  //     width: 1920,
  //     height: 800,
  //     mobilePosition: 'center center',
  //   },
  //   link: {
  //     href: '/events/technology-that-serves-care-s-cubed-joins-babat-2025',
  //     text: "Join us at BABAT 2025",
  //     mobileText: "Join us at BABAT 2025", // Shorter text for mobile
  //   },
  //   contentWidth: '30%', // Set content width to 30%
  // },
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

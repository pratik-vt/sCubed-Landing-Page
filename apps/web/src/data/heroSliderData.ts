import USATodayMobileImage from '../../public/images/As featured in USA Today-mobile.jpg';
import USATodayImage from '../../public/images/As featured in USA Today.jpg';
import BannerImage from '../../public/images/Banner.jpg';
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

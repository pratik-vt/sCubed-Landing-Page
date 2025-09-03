import { HeroSliderItem } from '../components/HeroImageSlider';

export const heroSliderData: HeroSliderItem[] = [
  {
    id: 'empowering-practice',
    title: 'Empowering Your Practice, Enhancing Every Life You Touch',
    description: "S Cubed is an all-in-one platform packed with powerful Clinical and Practice Management functionalities, designed to streamline operations and enhance outcomes. Whether you're running a healthcare clinic or managing services in educational or school-based settings, S cubed empowers you to focus on delivering exceptional care with less hassle and greater efficiency.",
    image: {
      src: '/images/Banner.jpg',
      alt: 'S Cubed Practice Management Dashboard',
      width: 1920,
      height: 800,
    },
    link: {
      href: '/get-started',
      text: 'Book a Free Demo',
    },
    contentAlign: 'center', // Example: Center this slide's content
  },
  {
    id: 'from-mothers-journey',
    title: 'From a Mother\'s Journey Became a Lifeline for Families',
    description: 'How <a href="https://www.trevorsplace.net/" target="_blank" rel="noopener noreferrer">Trevor\'s Place</a> & <a href="https://scubed.io/">S Cubed</a> are transforming therapy and family communication through innovation and compassion.',
    image: {
      src: '/images/As featured in USA Today.jpg',
      alt: "As featured in USA Today",
      width: 1920,
      height: 800,
      mobileSrc: '/images/As featured in USA Today-mobile.jpg', // Optional mobile image
      // position: 'center right', // Keep person visible on desktop
      mobilePosition: 'center center', // Center the person on mobile
    },
    link: {
      href: 'https://www.usatoday.com/story/special/contributor-content/2025/08/28/from-playing-school-to-building-trevors-place-how-one-mothers-journey-became-a-lifeline-for-families/85873205007/',
      text: "As featured in 'USA Today'",
      mobileText: "As in 'USA Today'", // Shorter text for mobile
      external: true,
    },
  },
];

import { HeroSliderItem } from '../components/HeroImageSlider';

export const heroSliderData: HeroSliderItem[] = [
  {
    id: 'from-mothers-journey',
    title: 'From a Mother\'s Journey Became a Lifeline for Families',
    description: 'How <a href="https://www.trevorsplace.net/" target="_blank" rel="noopener noreferrer">Trevor\'s Place</a> & <a href="https://scubed.io/">S Cubed</a> are transforming therapy and family communication through innovation and compassion.',
    image: {
      src: '/images/As featured in USA Today.jpg',
      alt: 'As featured in USA Today',
      width: 1200,
      height: 600,
      mobileSrc: '/images/As featured in USA Today-mobile.png', // Optional mobile image
    },
    link: {
      href: 'https://www.usatoday.com/story/special/contributor-content/2025/08/28/from-playing-school-to-building-trevors-place-how-one-mothers-journey-became-a-lifeline-for-families/85873205007/',
      text: 'As featured in USA Today',
      external: true,
    },
  },
  {
    id: 'empowering-practice',
    title: 'Empowering Your Practice, Enhancing Every Life You Touch',
    description: "S Cubed is an all-in-one platform packed with powerful Clinical and Practice Management functionalities, designed to streamline operations and enhance outcomes. Whether you're running a healthcare clinic or managing services in educational or school-based settings, S cubed empowers you to focus on delivering exceptional care with less hassle and greater efficiency.",
    image: {
      src: '/images/Banner.jpg',
      alt: 'S Cubed Practice Management Dashboard',
      width: 1200,
      height: 600,
    },
    link: {
      href: '/get-started',
      text: 'Book a Free Demo',
    },
    contentAlign: 'center', // Example: Center this slide's content
  },
  // {
  //   id: 'comprehensive-data',
  //   title: 'Comprehensive Data Collection',
  //   description: 'Track client progress with advanced analytics, customizable reports, and real-time data visualization tools that drive better outcomes.',
  //   image: {
  //     src: '/images/dashboard.png',
  //     alt: 'Data Collection and Analytics Dashboard',
  //     width: 1200,
  //     height: 600,
  //   },
  //   link: {
  //     href: '/features',
  //     text: 'View All Features',
  //   },
  // },
  // {
  //   id: 'guardian-engagement',
  //   title: 'Enhanced Guardian Engagement',
  //   description: 'Keep families connected with our intuitive guardian portal featuring progress reports, communication tools, and appointment management.',
  //   image: {
  //     src: '/images/Image-1.jpg',
  //     alt: 'Guardian Portal Interface',
  //     width: 1200,
  //     height: 600,
  //   },
  //   link: {
  //     href: '/guardian-portal',
  //     text: 'Discover Guardian Portal',
  //   },
  // },
];

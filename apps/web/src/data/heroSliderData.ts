import BannerImage from '../../public/images/Banner.jpg';
// Slide 1 - Fluxx Awards
import BackgroundFirstSlide from '../../public/images/background-image-first-slide.jpg';
import RightImageFirstSlide from '../../public/images/right-image-first-slide.png';
// Slide 2 - MSN Top Entrepreneurs
import BackgroundTwoSlide from '../../public/images/background-image-two-slide.png';
import RightImageTwoSlide from '../../public/images/right-image-two-slide.png';
// Slide 3 - Mother's Journey
import BackgroundThreeSlide from '../../public/images/background-image-three-slide.png';
import RightImageThreeSlide from '../../public/images/right-image-three-slide.png';
// import NYSABA2025Image from '../../public/images/NYSABA Event Banner.jpg';
import { HeroSliderItem } from '../components/HeroImageSlider';

export const heroSliderData: HeroSliderItem[] = [
  {
    id: 'fluxx-awards-2025-nominee',
    title: "Proudly Announcing: Stephanie Emmons - Fluxx Awards 2025 Nominee",
    description:
      'Honoring her vision and commitment to empowering ABA therapy teams with innovative, supportive solutions.',
    layoutMode: 'split', // Split layout: content left, image right
    backgroundImage: {
      src: BackgroundFirstSlide,
      alt: 'Fluxx Awards 2025 Background',
      position: 'center center',
    },
    splitImage: {
      src: RightImageFirstSlide,
      alt: 'Fluxx Awards 2025 Nomination Badge',
      width: 800,
      height: 800,
    },
    link: {
      href: 'https://scubed.io/blog/s-cubed-founder-stephanie-emmons-nominated-fluxx-awards-2025-aba-tech-wellness',
      text: "Explore the Fluxx Nomination",
      mobileText: "Fluxx Nomination",
      external: false,
    },
  },
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
  {
    id: 'msn-top-entrepreneurs',
    title: "MSN's Top 10 Trailblazing Entrepreneurs to Follow in 2025",
    description:
      'Congratulations to our founder, Stephanie Emmons, for being recognized for her innovation in care.',
    layoutMode: 'split', // Split layout: content left, image right
    backgroundImage: {
      src: BackgroundTwoSlide,
      alt: 'MSN Top 10 Trailblazing Entrepreneurs Background',
      position: 'center center',
    },
    splitImage: {
      src: RightImageTwoSlide,
      alt: 'Top 10 Trailblazing Entrepreneurs Badge',
      width: 800,
      height: 800,
    },
    link: {
      href: 'https://www.msn.com/en-us/money/smallbusiness/top-10-trailblazing-entrepreneurs-to-follow-in-2025/ar-AA1Pi9Yi',
      text: "Read the MSN feature",
      mobileText: "MSN feature",
      external: true,
    },
  },
  {
    id: 'from-mothers-journey',
    title: "From a Mother's Journey Became a Lifeline for Families",
    description:
      'How <a href="https://www.trevorsplace.net/" target="_blank" rel="noopener noreferrer">Trevor\'s Place</a> & <a href="https://scubed.io/">S Cubed</a> are transforming therapy and family communication through innovation and compassion.',
    layoutMode: 'split', // Split layout: content left, image right
    backgroundImage: {
      src: BackgroundThreeSlide,
      alt: 'As featured in USA Today Background',
      position: 'center center',
    },
    splitImage: {
      src: RightImageThreeSlide,
      alt: "Mother's Journey - Top 10 Trailblazing Entrepreneurs",
      width: 800,
      height: 800,
    },
    link: {
      href: 'https://www.usatoday.com/story/special/contributor-content/2025/08/28/from-playing-school-to-building-trevors-place-how-one-mothers-journey-became-a-lifeline-for-families/85873205007/',
      text: "As featured in 'USA Today'",
      mobileText: "As in 'USA Today'",
      external: true,
    },
  },

];

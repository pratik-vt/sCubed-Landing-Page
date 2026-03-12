import BannerImage from '../../public/images/Banner.jpg';
// Slide 3 - Mother's Journey
import BackgroundThreeSlide from '../../public/images/background-image-three-slide.png';
import RightImageThreeSlide from '../../public/images/right-image-three-slide.png';
// import NYSABA2025Image from '../../public/images/NYSABA Event Banner.jpg';
import { HeroSliderItem } from '../components/HeroImageSlider';

// APBA Conference
import BackgroundAPBASlide from '../../public/images/APBA Homepage Banner.jpg';
import RightImageAPBASlide from '../../public/images/APBA-Text.png';

export const heroSliderData: HeroSliderItem[] = [
  {
    id: 'apba-conference-2026',
    title:
      '<span style="font-weight: 400;">New Orleans, We\'re Coming to </span><span style="color: #7a7eed;">APBA Connect 2026</span>',
    mobileTitle:
      '<span style="font-weight: 400;">New Orleans, We\'re Coming to </span><span style="color: #7a7eed;">APBA Connect 2026</span>',
    description:
      'We\'ll be at the <strong>Sheraton New Orleans</strong> all three days, <strong>March 12-14.</strong> Come by our booth and let\'s talk about what truly supporting an ABA practice looks like.',
    descriptionMaxWidth: '650px',
    contentWidth: '30%',
    layoutMode: 'split',
    backgroundImage: {
      src: BackgroundAPBASlide,
      alt: 'APBA Conference 2026',
      position: 'center center',
    },
    splitImage: {
      src: RightImageAPBASlide,
      alt: 'APBA 2026 New Orleans, LA',
    },
    link: {
      href: '/events/s-cubed-is-heading-to-apba-2026-here-s-why-new-orleans-is-the-place-to-be-this-march',
      text: 'Discover More',
      mobileText: 'Discover More',
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
      href: '/subscribe?plan=free',
      text: 'Start 30 Days Free Trial Today',
    },
    contentAlign: 'center',
  },
  {
    id: 'from-mothers-journey',
    title: "From a Mother's Journey Became a Lifeline for Families",
    description:
      'How <a href="https://www.trevorsplace.net/" target="_blank" rel="noopener noreferrer">Trevor\'s Place</a> & <a href="https://scubed.io/">S Cubed</a> are transforming therapy and family communication through innovation and compassion.',
    layoutMode: 'split',
    backgroundImage: {
      src: BackgroundThreeSlide,
      alt: 'As featured in USA Today Background',
      position: 'center center',
    },
    splitImage: {
      src: RightImageThreeSlide,
      alt: "Mother's Journey - Top 10 Trailblazing Entrepreneurs",
    },
    link: {
      href: 'https://www.usatoday.com/story/special/contributor-content/2025/08/28/from-playing-school-to-building-trevors-place-how-one-mothers-journey-became-a-lifeline-for-families/85873205007/',
      text: "As featured in 'USA Today'",
      mobileText: "As in 'USA Today'",
      external: true,
    },
  },
];

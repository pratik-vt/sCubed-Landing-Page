# HeroImageSlider Component

A full-screen hero image slider component that displays one image at a time with smooth transitions, perfect for showcasing key content at the top of your website.

## Features

- 🖼️ **Single Image Display**: Shows one large hero image at a time
- 🎬 **Smooth Transitions**: Animated transitions between slides using Framer Motion
- ⏯️ **Auto-play**: Configurable auto-play with pause on hover
- 🎯 **Navigation Controls**: Arrow buttons and dot indicators for manual navigation
- 📱 **Responsive Design**: Full viewport height with mobile optimizations
- 🎨 **Overlay Text**: Rich text content overlaid on images with call-to-action buttons
- ♿ **Accessible**: Semantic HTML with proper ARIA labels and keyboard support
- 🖱️ **Interactive**: Hover effects and smooth animations

## Usage

```tsx
import HeroImageSlider from '../components/HeroImageSlider';
import { HeroSliderItem } from '../components/HeroImageSlider';

const heroData: HeroSliderItem[] = [
  {
    id: 'slide-1',
    title: 'Transform Your Practice',
    description: 'Experience the power of comprehensive practice management.',
    image: {
      src: '/images/hero-1.jpg',
      alt: 'Hero image description',
      width: 1200,
      height: 600,
    },
    link: {
      href: '/get-started',
      text: 'Get Started Today',
      external: false,
    },
  },
  // ... more slides
];

<HeroImageSlider 
  items={heroData}
  autoPlay={true}
  autoPlayInterval={5000}
/>
```

## Props

### HeroImageSlider Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `HeroSliderItem[]` | ✅ | - | Array of hero slider items |
| `autoPlay` | `boolean` | ❌ | `true` | Enable auto-play functionality |
| `autoPlayInterval` | `number` | ❌ | `5000` | Auto-play interval in milliseconds |
| `className` | `string` | ❌ | - | Optional CSS class name |

### HeroSliderItem Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the slide |
| `title` | `string` | ✅ | Main heading text overlaid on image |
| `description` | `string` | ✅ | Descriptive text below the title |
| `image` | `ImageData` | ✅ | Hero image configuration |
| `link` | `LinkData` | ❌ | Optional call-to-action button |

### ImageData Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `src` | `string` | ✅ | Image source URL |
| `alt` | `string` | ✅ | Alt text for accessibility |
| `width` | `number` | ❌ | Image width (defaults to 1200) |
| `height` | `number` | ❌ | Image height (defaults to 600) |

### LinkData Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `href` | `string` | ✅ | Link URL |
| `text` | `string` | ✅ | Button text |
| `external` | `boolean` | ❌ | Whether link opens in new tab |

## Behavior

### Auto-play
- Automatically advances to the next slide every 5 seconds (configurable)
- Pauses when user hovers over the component
- Resumes when mouse leaves the component
- Disabled when there's only one slide

### Navigation
- **Arrow buttons**: Navigate to previous/next slide
- **Dot indicators**: Jump directly to any slide
- **Keyboard support**: Arrow keys for navigation (when focused)

### Responsive Design
- **Desktop**: Full viewport height (100vh) with max-height limits
- **Tablet**: Reduced height (70vh) for better content visibility
- **Mobile**: Further reduced height (60vh) with minimum constraints

## Accessibility

- Uses semantic `<header>` element
- Proper ARIA labels for all interactive elements
- Keyboard navigation support
- Alt text for all images
- Focus management for screen readers
- High contrast text with background overlay

## Performance

- Uses Next.js Image component for optimization
- Lazy loading for better performance
- Smooth animations with hardware acceleration
- Optimized re-renders with React hooks

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support
- Animation support (falls back gracefully)
- Touch gesture support on mobile devices

## Best Practices

1. **Image Quality**: Use high-resolution images (1200x600 minimum)
2. **Text Contrast**: Ensure good contrast between text and background
3. **Content Length**: Keep titles concise and descriptions brief
4. **Load Time**: Optimize images for web to reduce loading time
5. **Accessibility**: Always provide meaningful alt text

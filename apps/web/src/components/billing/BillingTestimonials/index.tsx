import React from 'react';
import { Star, Quote } from 'lucide-react';

import {
  testimonialsSection,
  testimonialsContainer,
  sectionTitle,
  testimonialsGrid,
  testimonialCard,
  testimonialQuote,
  testimonialContent,
  testimonialAuthor,
  testimonialRole,
  testimonialStars,
  quoteIcon,
} from './styles.css';

const BillingTestimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "S Cubed transformed our billing process. We've seen a 40% reduction in claim denials and our revenue cycle is now 3x faster.",
      author: 'Dr. Sarah Mitchell',
      role: 'Clinical Director, Therapy Plus',
      rating: 5,
    },
    {
      quote:
        'The automation features have saved us countless hours. Our staff can now focus on patient care instead of paperwork.',
      author: 'Michael Chen',
      role: 'Practice Manager, ABC Therapy',
      rating: 5,
    },
    {
      quote:
        'Best decision we made for our practice. The support team is exceptional and the platform is incredibly intuitive.',
      author: 'Jennifer Rodriguez',
      role: 'Owner, Sunshine Behavioral Health',
      rating: 5,
    },
  ];

  return (
    <section className={testimonialsSection}>
      <div className={testimonialsContainer}>
        <h2 className={sectionTitle}>Trusted by Leading Practices</h2>
        <div className={testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={testimonialCard}>
              <div className={quoteIcon}>
                <Quote size={24} />
              </div>
              <div className={testimonialStars}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className={testimonialContent}>{testimonial.quote}</p>
              <div className={testimonialQuote}>
                <div className={testimonialAuthor}>{testimonial.author}</div>
                <div className={testimonialRole}>{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BillingTestimonials;

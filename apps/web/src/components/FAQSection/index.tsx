'use client';

import { AnimatePresence, motion, useInView, Variants } from 'framer-motion';
import React, { useRef, useState } from 'react';

import * as styles from './styles.css';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  sectionTitle?: string;
  faqs?: FAQItem[];
  className?: string;
}

const mockFAQData: FAQItem[] = [
  {
    question: 'What is S Cubed and how can it help my practice?',
    answer: 'S Cubed is a comprehensive practice management platform designed specifically for therapy practices. It streamlines administrative tasks, appointment scheduling, billing, and client management, allowing you to focus more on patient care and less on paperwork.',
  },
  {
    question: 'Is S Cubed HIPAA compliant?',
    answer: 'Yes, S Cubed is fully HIPAA compliant. We use industry-standard encryption, secure data centers, and strict access controls to ensure your practice and patient data remains protected at all times. We also provide Business Associate Agreements (BAAs) for all our customers.',
  },
  {
    question: 'How long does it take to set up S Cubed for my practice?',
    answer: 'Most practices are up and running within 24-48 hours. Our onboarding team provides personalized support to help you import your existing data, configure your settings, and train your staff. We also offer comprehensive training materials and ongoing support.',
  },
  {
    question: 'Can S Cubed integrate with my existing tools?',
    answer: 'Yes! S Cubed integrates with popular tools including electronic health records (EHRs), payment processors, telehealth platforms, and calendar systems. We also offer an API for custom integrations to meet your specific needs.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We provide multiple levels of support including 24/7 email support, business hours phone support, live chat, and a comprehensive knowledge base. Premium plans also include dedicated account managers and priority support.',
  },
  {
    question: 'Can I try S Cubed before committing?',
    answer: 'Absolutely! We offer a 14-day free trial with full access to all features. No credit card is required to start your trial, and our team will help you get set up and answer any questions during your evaluation period.',
  },
];

const FAQSection: React.FC<FAQSectionProps> = ({ 
  title = 'Frequently Asked Questions',
  sectionTitle,
  faqs = mockFAQData,
  className = '' 
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const toggleFAQ = (index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Container animation variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Item animation variants for FAQ items
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  // Animation variants for smooth expand/collapse
  const answerVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1]
        },
        opacity: {
          duration: 0.3,
          ease: 'easeOut'
        }
      }
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: {
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1]
        },
        opacity: {
          duration: 0.4,
          ease: 'easeIn',
          delay: 0.2
        }
      }
    }
  };

  // Chevron animation variants for synchronized rotation
  const chevronVariants: Variants = {
    closed: {
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    open: {
      rotate: 180,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  // Reusable FAQ Item Component with enhanced animations
  const FAQItemComponent = ({ faq, index, delay }: { faq: FAQItem; index: number; delay: number }) => {
    const isOpen = openIndices.has(index);
    
    return (
      <motion.div 
        className={styles.accordionGroup}
        variants={itemVariants}
        whileHover="hover"
        custom={delay}
        style={{ transformOrigin: 'center' }}
      >
        <div 
          className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
        >
          <motion.button
            className={styles.faqQuestion}
            onClick={() => toggleFAQ(index)}
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${index}`}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.span 
              className={styles.icon}
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              variants={chevronVariants}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.iconSvg}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
            <span className={styles.questionText}>{faq.question}</span>
          </motion.button>
          
          <AnimatePresence initial={false} mode="wait">
            {isOpen && (
              <motion.div
                key={`faq-answer-${index}`}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={answerVariants}
                id={`faq-answer-${index}`}
                className={styles.faqAnswer}
                style={{ overflow: 'hidden' }}
              >
                <motion.div 
                  className={styles.answerContent}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  // Split FAQs into two columns for desktop
  const leftColumnFaqs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFaqs = faqs.filter((_, index) => index % 2 === 1);

  return (
    <section className={`${styles.container} ${className}`} ref={sectionRef}>
      <div className={styles.wrapper}>
        {title && (
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {title}
          </motion.h2>
        )}
        {sectionTitle && (
          <motion.h3 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            {sectionTitle}
          </motion.h3>
        )}
        <motion.div 
          className={styles.faqContainer}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className={styles.faqColumn}>
            {leftColumnFaqs.map((faq, columnIndex) => {
              const index = columnIndex * 2;
              return <FAQItemComponent key={index} faq={faq} index={index} delay={columnIndex * 0.1} />;
            })}
          </motion.div>
          <motion.div className={styles.faqColumn}>
            {rightColumnFaqs.map((faq, columnIndex) => {
              const index = columnIndex * 2 + 1;
              return <FAQItemComponent key={index} faq={faq} index={index} delay={columnIndex * 0.1 + 0.05} />;
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
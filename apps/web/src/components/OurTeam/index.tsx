'use client';

import { motion, useInView, Variants } from 'framer-motion';
import {
  Building2,
  Lightbulb,
  Lock,
  RefreshCw,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import lizImg from '../../images/Liz.jpg';
import maryImg from '../../images/Mary.jpg';
import stephanieImg from '../../images/Stephanie.jpg';
import taylorImg from '../../images/Taylor.jpg';

import * as styles from './styles.css';

const OurTeam = () => {
  const router = useRouter();

  // Refs for scroll-triggered animations
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Check if sections are in view
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isMissionInView = useInView(missionRef, {
    once: true,
    margin: '-100px',
  });
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const isWhyChooseInView = useInView(whyChooseRef, {
    once: true,
    margin: '-100px',
  });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const teamCardVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const teamMembers = [
    {
      name: 'Stephanie Emmons',
      title: 'M.Ed., LBA, BCBA – CEO & President',
      image: stephanieImg,
      bio: "Stephanie is a dedicated leader and Board Certified Behavior Analyst (BCBA) with a passion for building innovative and compassionate services for individuals and families. With a Master's degree in Education and extensive experience in applied behavior analysis, she has spent her career driving meaningful change in the field. As CEO and President, Stephanie combines clinical expertise with visionary leadership, ensuring that the organization delivers high-quality care while fostering a culture of growth and collaboration. Guided by both professional dedication and personal commitment, she continues to shape programs that empower families and create lasting impact.",
    },
    {
      name: 'Mary Shabunia',
      title: 'Director of Operations',
      image: maryImg,
      bio: "Mary is a seasoned healthcare professional with over 30 years of experience in the medical industry. She currently serves as the Director of Operations for Trevor's Place. With a certification in Human Resources and a deep understanding of healthcare operations, she leads with both strategic vision and empathy. Throughout her career, she has successfully started and managed multiple medical specialty offices, demonstrating her expertise in practice development and operational. A passionate advocate for quality care and community engagement, she has served on multiple community boards, using her experience to drive positive change and support underserved populations.",
    },
    {
      name: 'Liz',
      title: 'Director of Billing Operations',
      image: lizImg,
      bio: "Liz leads the Billing Operations department with precision, dedication, and a deep understanding of the financial side of healthcare services. She has built her career around ensuring accuracy, compliance, and transparency in billing practices, making her an invaluable part of the team. With her focus on streamlining processes and supporting families through often complex billing systems, Liz works tirelessly to create a smoother experience for clients while strengthening the organization's financial health. Her commitment ensures that care remains accessible and sustainable.",
    },
    {
      name: 'Taylor Beagle',
      title: 'M.S., LBA, BCBA – Director of Product Experience',
      image: taylorImg,
      bio: 'Taylor is a Board Certified Behavior Analyst (BCBA) with a Master of Science degree and a passion for enhancing the way therapy services are delivered. As Director of Product Experience, Taylor bridges clinical expertise with innovation, ensuring that programs, tools, and resources meet the highest standards of effectiveness and usability. With a background rooted in applied behavior analysis and a forward-thinking approach, Taylor is dedicated to creating products and experiences that empower families, practitioners, and the broader community.',
    },
  ];

  const missionPoints = [
    {
      icon: Lightbulb,
      title: 'What Keeps Us Going',
      content:
        "We didn't want to build a software, we wanted to reshape how care gets delivered.",
    },
    {
      icon: Rocket,
      title: 'What Moved Us To Start',
      content:
        'We know the work is heavy, so we give you tools to find space and focus on your practice.',
    },
    {
      icon: Target,
      title: 'What We Set Out To Do',
      content:
        'We don\'t want to innovate anything, we\'re here to take the "real weight" off your shoulders.',
    },
    {
      icon: RefreshCw,
      title: 'How We Turn Listing Into Action',
      content:
        'S Cubed is built by considering the real therapists and listening to their real needs so they can focus better on care.',
    },
  ];

  const whyChooseUsPoints = [
    {
      icon: Building2,
      title: 'One Platform For All',
      content:
        'Most clinics struggle with different systems for different needs while S Cubed provides you with one clean, connected platform.',
    },
    {
      icon: Lock,
      title: 'Truly HIPAA-Compliant',
      content:
        'S Cubed is built with HIPAA compliance which means you are care-free about your data and we make sure your data is encrypted, it has role-based access and secure cloud hosting.',
    },
    {
      icon: Users,
      title: 'Made With Providers, For Providers',
      content:
        'This platform is not built just to make it work, it is made to support after having a real talk with ABA therapists, BCBAs, OTs, PTs, and counselors.',
    },
    {
      icon: TrendingUp,
      title: 'Grows With You',
      content:
        'S Cubed is made to adapt to your requirements, whether you are a solo practitioner, a multi-location clinic or an educational institute, our platform will grow with you.',
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <motion.section
        ref={heroRef}
        className={styles.heroSection}
        initial="hidden"
        animate={isHeroInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
      >
        <motion.div className={styles.heroContent} variants={staggerContainer}>
          <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
            Our <span style={{ color: '#ffffff' }}>Story</span>
          </motion.h1>
          <motion.p className={styles.heroText} variants={fadeInUp}>
            We didn't come up with S Cubed as a business plan. We started it
            because we came across too many educators and therapists struggling
            with tools that didn't make their job any easier. When we saw that
            care was slipping through the cracks of systems and brilliant
            professionals were buried in admin, we knew we could bridge this
            gap.
          </motion.p>
        </motion.div>
      </motion.section>

      <motion.section
        ref={missionRef}
        className={styles.sectionAlt}
        initial="hidden"
        animate={isMissionInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={styles.sectionContent}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Our Mission and <span style={{ color: '#7a7eed' }}>Goal</span>
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>
            Driven by purpose, guided by experience, committed to your success
          </motion.p>
          <motion.div className={styles.grid} variants={staggerContainer}>
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className={styles.cardContent}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    <point.icon
                      size={24}
                      style={{ color: '#7a7eed', flexShrink: 0 }}
                    />
                    <h3 className={styles.cardTitle} style={{ margin: 0 }}>
                      {point.title}
                    </h3>
                  </div>
                  <p className={styles.cardText}>{point.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={teamRef}
        className={styles.section}
        initial="hidden"
        animate={isTeamInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={styles.sectionContent}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Meet Our <span style={{ color: '#7a7eed' }}>Expert Team</span>
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>
            Passionate professionals dedicated to transforming healthcare
            delivery
          </motion.p>
          <motion.div className={styles.teamGrid} variants={staggerContainer}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className={styles.teamCard}
                variants={teamCardVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className={styles.teamCardLayout}>
                  <div className={styles.teamCardHeader}>
                    <motion.div
                      className={styles.teamImageWrapper}
                      whileHover={{ rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.title}`}
                        className={styles.teamImage}
                        width={100}
                        height={100}
                        placeholder="blur"
                        style={
                          ['Mary Shabunia', 'Liz'].includes(member.name)
                            ? { objectPosition: 'center 20%' }
                            : undefined
                        }
                      />
                    </motion.div>
                    <div className={styles.teamInfo}>
                      <h3 className={styles.teamName}>{member.name}</h3>
                      <p className={styles.teamTitle}>{member.title}</p>
                    </div>
                  </div>
                  <div className={styles.teamBio}>
                    <p>{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={whyChooseRef}
        className={styles.sectionAlt}
        initial="hidden"
        animate={isWhyChooseInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={styles.sectionContent}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Why Therapists{' '}
            <span style={{ color: '#7a7eed' }}>Choose S Cubed</span>
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>
            The platform that grows with you, supports you, and never slows you
            down
          </motion.p>
          <motion.div className={styles.grid} variants={staggerContainer}>
            {whyChooseUsPoints.map((point, index) => (
              <motion.div
                key={point.title}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  backgroundColor: 'rgba(122, 126, 237, 0.05)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className={styles.cardContent}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    <point.icon
                      size={24}
                      style={{ color: '#7a7eed', flexShrink: 0 }}
                    />
                    <h3 className={styles.cardTitle} style={{ margin: 0 }}>
                      {point.title}
                    </h3>
                  </div>
                  <p className={styles.cardText}>{point.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={ctaRef}
        className={styles.ctaSection}
        initial="hidden"
        animate={isCtaInView ? 'visible' : 'hidden'}
      >
        <motion.div className={styles.ctaContent} variants={scaleIn}>
          <motion.h2 className={styles.ctaTitle} variants={fadeInUp}>
            Ready to{' '}
            <span
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                textDecorationThickness: '3px',
                textUnderlineOffset: '5px',
              }}
            >
              Transform
            </span>{' '}
            Your Practice?
          </motion.h2>
          <motion.p className={styles.ctaText} variants={fadeInUp}>
            Join thousands of healthcare professionals who trust S Cubed to
            streamline their operations and focus on what matters most -
            providing exceptional care.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block' }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => router.push('/get-started')}
            >
              <span
                style={{
                  color: '#7a7eed',
                  fontSize: '18px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                }}
              >
                Get Started Today
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default OurTeam;

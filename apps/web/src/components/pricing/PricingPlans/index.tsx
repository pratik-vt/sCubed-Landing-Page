'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  badge,
  billingToggle,
  billingToggleActive,
  billingToggleOption,
  discountedAmount,
  discountedPrice,
  discountPercentage,
  featuresGrid,
  featuresTitle,
  originalPrice,
  planCard,
  planCardPopular,
  planCTA,
  planCTAPopular,
  planDescription,
  planFeature,
  planFeatureIcon,
  planName,
  planPrice,
  planPriceAmount,
  planPricePeriod,
  planPriceWrapper,
  plansContainer,
  plansGrid,
  plansWrapper,
  popularBadge,
  savingBadge,
  yearlyLabel,
} from './styles.css';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  staffCount: string;
  features: PlanFeature[];
  isPopular?: boolean;
  ctaText: string;
  savings?: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for small practices just getting started',
    monthlyPrice: 29,
    yearlyPrice: 295,
    staffCount: '5 Staff',
    savings: '15% off',
    features: [
      { text: 'Unlimited Clients', included: true },
      { text: 'Documentation & Session Notes', included: true },
      { text: 'HIPAA-Grade Security', included: true },
      { text: 'Appointment Scheduling', included: true },
      { text: 'Custom Roles & Permissions', included: true },
      { text: 'Messaging (Staff & Client)', included: true },
      { text: 'Reports & Graphs', included: true },
      { text: 'Data Collection', included: true },
      { text: 'Behavior Tracking', included: true },
      { text: 'Custom Templates', included: true },
      { text: 'In-App Notifications & Email', included: true },
      { text: 'Support & Training', included: true },
      { text: 'Mobile App & Tablet Support', included: true },
    ],
    ctaText: 'Start Free Trial',
  },
  {
    name: 'Essential',
    description: 'Most popular for growing therapy practices',
    monthlyPrice: 49,
    yearlyPrice: 499,
    staffCount: '10 Staff',
    savings: '15% off',
    isPopular: true,
    features: [
      { text: 'Everything in Starter, plus:', included: true },
      { text: 'Clock In, Clock Out', included: true },
      { text: 'Guardian Portal', included: true },
      { text: 'Billing Portal (Clearinghouses Fees)', included: true },
      { text: 'VB-MAPP', included: true },
      { text: 'Advanced Reporting', included: true },
      { text: 'Smart Dashboard', included: true },
      { text: 'Customizable Forms', included: true },
      { text: 'Electronic Signatures', included: true },
      { text: 'Document Management', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Team Collaboration Tools', included: true },
      { text: 'API Access', included: true },
    ],
    ctaText: 'Start Free Trial',
  },
  {
    name: 'Growth',
    description: 'Complete solution for multi-location practices',
    monthlyPrice: 89,
    yearlyPrice: 899,
    staffCount: '20+ Staff',
    savings: '16% off',
    features: [
      { text: 'Everything in Essential, plus:', included: true },
      { text: 'Unlimited Staff Members', included: true },
      { text: 'Multi-Location Management', included: true },
      { text: 'Advanced Analytics & Insights', included: true },
      { text: 'Custom Integrations', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Onboarding & Training', included: true },
      { text: 'Custom Workflows', included: true },
      { text: 'White-Label Options', included: true },
      { text: 'Enterprise Security Features', included: true },
      { text: 'SLA Guarantee', included: true },
      { text: '24/7 Phone Support', included: true },
      { text: 'Quarterly Business Reviews', included: true },
    ],
    ctaText: 'Contact Sales',
  },
];

const PricingPlans: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const router = useRouter();

  const handlePlanSelect = (planName: string) => {
    if (planName === 'Growth') {
      router.push('/contact-sales');
    } else {
      router.push('/get-started');
    }
  };

  return (
    <section className={plansWrapper}>
      <div className={plansContainer}>
        {/* Billing Toggle */}
        <div className={billingToggle}>
          <button
            className={`${billingToggleOption} ${
              billingPeriod === 'monthly' ? billingToggleActive : ''
            }`}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${billingToggleOption} ${
              billingPeriod === 'yearly' ? billingToggleActive : ''
            }`}
            onClick={() => setBillingPeriod('yearly')}
          >
            Yearly
            <span className={savingBadge}>Save up to 16%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className={plansGrid}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.isPopular ? planCardPopular : planCard}
            >
              {plan.isPopular && (
                <div className={popularBadge}>
                  <Star size={16} />
                  Most Popular
                </div>
              )}

              <div className={planName}>{plan.name}</div>
              <div className={badge}>{plan.staffCount}</div>
              <p className={planDescription}>{plan.description}</p>

              <div className={planPriceWrapper}>
                {billingPeriod === 'yearly' ? (
                  <>
                    <div className={originalPrice}>
                      ${plan.monthlyPrice * 12} / staff / year
                    </div>
                    <div className={discountedPrice}>
                      <span className={discountedAmount}>${plan.yearlyPrice}</span>
                      <span className={planPricePeriod}>/ staff / year</span>
                    </div>
                    {plan.savings && (
                      <div className={discountPercentage}>({plan.savings})</div>
                    )}
                  </>
                ) : (
                  <div className={planPrice}>
                    <span className={planPriceAmount}>${plan.monthlyPrice}</span>
                    <span className={planPricePeriod}>/ staff / month</span>
                  </div>
                )}
              </div>

              <button
                className={plan.isPopular ? planCTAPopular : planCTA}
                onClick={() => handlePlanSelect(plan.name)}
              >
                {plan.ctaText}
                <ArrowRight size={18} />
              </button>

              <div className={featuresGrid}>
                <h4 className={featuresTitle}>What's included:</h4>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className={planFeature}>
                    <Check className={planFeatureIcon} size={16} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;

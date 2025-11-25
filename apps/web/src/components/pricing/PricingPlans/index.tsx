'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Minus, Star } from 'lucide-react';
import Link from 'next/link';
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
  planFeatureHighlight,
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
      { text: 'HIPAA-Grade Security', included: true },
      { text: 'Appointment Scheduling', included: true },
      { text: 'Documentation & Session Notes', included: true },
      { text: 'Mobile App Support', included: true },
    ],
    ctaText: 'Get Started',
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
      { text: 'Guardian Portal', included: true },
      { text: 'Clock In, Clock Out', included: true },
      { text: 'Smart Dashboard', included: true },
    ],
    ctaText: 'Get Started',
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
      { text: 'Billing Portal (Includes Clearinghouses Fees)', included: true },
      { text: 'VB Mapp', included: true },
      { text: 'Advanced Analytics', included: true },
    ],
    ctaText: 'Get Started',
  },
];

const PricingPlans: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly',
  );

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
            Yearly{' '}
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
                      <span className={discountedAmount}>
                        ${plan.yearlyPrice}
                      </span>
                      <span className={planPricePeriod}>/ staff / year</span>
                    </div>
                    {plan.savings && (
                      <div className={discountPercentage}>({plan.savings})</div>
                    )}
                  </>
                ) : (
                  <div className={planPrice}>
                    <span className={planPriceAmount}>
                      ${plan.monthlyPrice}
                    </span>
                    <span className={planPricePeriod}>/ staff / month</span>
                  </div>
                )}
              </div>

              <Link
                href="/get-started"
                className={plan.isPopular ? planCTAPopular : planCTA}
              >
                {plan.ctaText}
                <ArrowRight size={18} />
              </Link>

              <div className={featuresGrid}>
                <h4 className={featuresTitle}>What's included:</h4>
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === 0 &&
                      (feature.text.startsWith('Everything in') ||
                        feature.text === 'Everything in Starter, plus:' ||
                        feature.text === 'Everything in Essential, plus:')
                        ? planFeatureHighlight
                        : planFeature
                    }
                  >
                    {feature.included ? (
                      <Check className={planFeatureIcon} size={16} />
                    ) : (
                      <Minus
                        size={16}
                        style={{
                          color: '#9ca3af',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      />
                    )}
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

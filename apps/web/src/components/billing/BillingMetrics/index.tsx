import { BadgeCheck, ClipboardCheck, Clock, Eye, FileCheck, TrendingDown, Zap } from 'lucide-react';
import React from 'react';

import {
    featureCard,
    featureDescription,
    featureIconWrapper,
    featuresContainer,
    featuresGrid,
    featuresSection,
    featureTitle,
    sectionTitle,
    featureContentTopValues,
    sectionSubtitle
} from './styles.css';


const BillingFeatures: React.FC = () => {
    const features = [
        {
            icon: <Eye size={28} />,
            title: '100%',
            description: 'Claim visibility',
            accentColor: '#8b5cf6', // Purple
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
        },
        {
            icon: <BadgeCheck size={28} />,
            title: '96%',
            description: 'First pass acceptance rate',
            accentColor: '#22d3ee', // Teal accent
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
        },
        {
            icon: <TrendingDown size={28} />,
            title: '62%',
            description:
                'Reduction in claim denials',
            accentColor: '#7a7eed', // Primary purple
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
        },
        
        {
            icon: <Zap size={28} />,
            title: '12',
            description: 'Days faster revenue cycle',
            accentColor: '#34d399', // Green accent
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
        },
        {
            icon: <FileCheck size={28} />,
            title: '89%',
            description: 'Reduction in data entry errors',
            accentColor: '#a78bfa', // Light purple
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
        },
        {
            icon: <ClipboardCheck size={28} />,
            title: '80%',
            description: 'Less audit preparation time',
            accentColor: '#fbbf24', // Amber
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
        },
        {
            icon: <Clock size={28} />,
            title: '75%',
            description: 'Time saved on ERA posting',
            accentColor: '#fb7185', // Coral accent
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
        },                       
    ];

    return (
        <section className={featuresSection}>
            <div className={featuresContainer}>
                <h2 className={sectionTitle}>
                Real Results Across Your Billing Workflow
                </h2>
                <p className={sectionSubtitle}>
                Smarter automation that cuts denials, accelerates payments, and improves revenue cycle visibility.
                </p>
                <div className={featuresGrid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={featureCard}
                            style={{
                                background: feature.bgColor,
                                borderLeft: `4px solid ${feature.accentColor}33`, // Fixed opacity syntax
                            }}
                        >
                            <div className={featureContentTopValues}>
                                <div
                                    className={featureIconWrapper}
                                    style={{
                                        background: `linear-gradient(135deg, ${feature.accentColor}22 0%, ${feature.accentColor}33 100%)`,
                                        color: feature.accentColor,
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className={featureTitle}>{feature.title}</h3>
                            </div>
                            <p className={featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BillingFeatures;

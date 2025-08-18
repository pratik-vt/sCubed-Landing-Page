import React from 'react';
import Image from 'next/image';

import { getStrapiImageUrl, StrapiImage } from '../../../lib/strapi';

interface ModuleQuoteData {
  quote_text?: string;
  author_name?: string;
  author_position?: string;
  author_company?: string;
  author_photo?: StrapiImage;
  quote_style?: 'default' | 'highlighted' | 'callout' | 'testimonial';
  quote_size?: 'normal' | 'large' | 'featured';
  show_quote_marks?: boolean;
  [key: string]: any; // Allow additional properties from Strapi
}

interface ModuleQuoteProps {
  data: ModuleQuoteData;
}

const ModuleQuote: React.FC<ModuleQuoteProps> = ({ data }) => {
  const {
    quote_text = '',
    author_name,
    author_position,
    author_company,
    author_photo,
    quote_style = 'default',
    quote_size = 'normal',
    show_quote_marks = true
  } = data;

  // If no quote text, don't render anything
  if (!quote_text) {
    return null;
  }

  const getQuoteStyles = () => {
    const baseStyles = {
      margin: '2rem 0',
      padding: '2rem',
      borderRadius: '16px',
      position: 'relative' as const,
      fontFamily: 'inherit'
    };
    
    switch (quote_style) {
      case 'highlighted':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          borderLeft: '4px solid #0ea5e9',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        };
      case 'callout':
        return {
          ...baseStyles,
          backgroundColor: '#fefce8',
          border: '1px solid #facc15',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        };
      case 'testimonial':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
          border: '1px solid #e5e7eb',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: '#f9fafb',
          borderLeft: '4px solid #6b7280',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        };
    }
  };

  const getQuoteSizeStyles = () => {
    switch (quote_size) {
      case 'large':
        return { fontSize: '1.25rem', lineHeight: '1.75', fontWeight: '400' };
      case 'featured':
        return { fontSize: '1.5rem', lineHeight: '1.75', fontWeight: '500' };
      default:
        return { fontSize: '1.125rem', lineHeight: '1.75', fontWeight: '400' };
    }
  };

  const getQuoteMarkColor = () => {
    switch (quote_style) {
      case 'highlighted':
        return '#93c5fd';
      case 'callout':
        return '#fde047';
      case 'testimonial':
        return '#c4b5fd';
      default:
        return '#d1d5db';
    }
  };

  return (
    <blockquote style={getQuoteStyles()}>
      <div style={{ position: 'relative' }}>
        {show_quote_marks && (
          <>
            <span style={{
              fontSize: '4rem',
              color: getQuoteMarkColor(),
              position: 'absolute',
              top: '-1rem',
              left: '-0.5rem',
              fontFamily: 'Georgia, serif',
              userSelect: 'none',
              opacity: 0.6,
              lineHeight: 1
            }}>
              "
            </span>
            <span style={{
              fontSize: '4rem',
              color: getQuoteMarkColor(),
              position: 'absolute',
              bottom: '-2rem',
              right: '-0.5rem',
              fontFamily: 'Georgia, serif',
              userSelect: 'none',
              opacity: 0.6,
              transform: 'rotate(180deg)',
              lineHeight: 1
            }}>
              "
            </span>
          </>
        )}
        
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          padding: '0 1rem'
        }}>
          <p style={{
            ...getQuoteSizeStyles(),
            marginBottom: '1.5rem',
            color: '#1f2937',
            fontStyle: 'italic'
          }}>
            {quote_text}
          </p>
        </div>
      </div>
      
      {(author_name || author_position || author_company) && (
        <footer style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          {author_photo && (
            <div style={{ 
              marginRight: '1rem', 
              flexShrink: 0 
            }}>
              <Image
                src={getStrapiImageUrl(author_photo)}
                alt={author_name || 'Author'}
                width={56}
                height={56}
                style={{
                  borderRadius: '50%',
                  border: '2px solid white',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          )}
          
          <div style={{ flexGrow: 1 }}>
            {author_name && (
              <cite style={{
                fontWeight: '600',
                color: '#111827',
                fontStyle: 'normal',
                display: 'block'
              }}>
                {author_name}
              </cite>
            )}
            
            {(author_position || author_company) && (
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginTop: '0.25rem'
              }}>
                {author_position && (
                  <span style={{ fontWeight: '500' }}>{author_position}</span>
                )}
                {author_position && author_company && (
                  <span style={{ margin: '0 0.25rem' }}>•</span>
                )}
                {author_company && (
                  <span>{author_company}</span>
                )}
              </div>
            )}
          </div>
          
          {/* Decorative element for testimonial style */}
          {quote_style === 'testimonial' && (
            <div style={{ 
              flexShrink: 0, 
              marginLeft: '1rem' 
            }}>
              <div style={{ 
                display: 'flex', 
                gap: '0.25rem' 
              }}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      color: '#fbbf24',
                      fill: 'currentColor'
                    }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          )}
        </footer>
      )}
    </blockquote>
  );
};

export default ModuleQuote; 
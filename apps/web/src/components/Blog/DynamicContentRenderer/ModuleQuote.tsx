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

  const getQuoteStyleClasses = () => {
    const baseClasses = "quote-module my-8 p-6 rounded-xl";
    
    switch (quote_style) {
      case 'highlighted':
        return `${baseClasses} bg-gradient-to-r from-primary-50 to-primary-100 border-l-4 border-primary-500`;
      case 'callout':
        return `${baseClasses} bg-accent-50 border border-accent-300 shadow-sm`;
      case 'testimonial':
        return `${baseClasses} bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border shadow-md`;
      default:
        return `${baseClasses} bg-neutral-50 border-l-4 border-neutral-400`;
    }
  };

  const getQuoteSizeClasses = () => {
    switch (quote_size) {
      case 'large':
        return "text-xl leading-relaxed";
      case 'featured':
        return "text-2xl leading-relaxed font-medium";
      default:
        return "text-lg leading-relaxed";
    }
  };

  const getQuoteMarkColor = () => {
    switch (quote_style) {
      case 'highlighted':
        return 'text-primary-300';
      case 'callout':
        return 'text-accent-300';
      case 'testimonial':
        return 'text-purple-300';
      default:
        return 'text-neutral-300';
    }
  };

  return (
    <blockquote className={getQuoteStyleClasses()}>
      <div className="relative">
        {show_quote_marks && (
          <>
            <span className={`text-6xl ${getQuoteMarkColor()} absolute -top-4 -left-2 font-serif select-none`}>
              "
            </span>
            <span className={`text-6xl ${getQuoteMarkColor()} absolute -bottom-8 -right-2 font-serif select-none transform rotate-180`}>
              "
            </span>
          </>
        )}
        
        <div className="relative z-10 px-4">
          <p className={`${getQuoteSizeClasses()} mb-6 text-gray-800`}>
            {quote_text}
          </p>
        </div>
      </div>
      
      {(author_name || author_position || author_company) && (
        <footer className="flex items-center mt-6 pt-4 border-t border-gray-200">
          {author_photo && (
            <div className="mr-4 flex-shrink-0">
              <Image
                src={getStrapiImageUrl(author_photo)}
                alt={author_name || 'Author'}
                width={56}
                height={56}
                className="rounded-full border-2 border-white shadow-sm"
              />
            </div>
          )}
          
          <div className="flex-grow">
            {author_name && (
              <cite className="font-semibold text-gray-900 not-italic block">
                {author_name}
              </cite>
            )}
            
            {(author_position || author_company) && (
              <div className="text-sm text-gray-600 mt-1">
                {author_position && (
                  <span className="font-medium">{author_position}</span>
                )}
                {author_position && author_company && (
                  <span className="mx-1">•</span>
                )}
                {author_company && (
                  <span>{author_company}</span>
                )}
              </div>
            )}
          </div>
          
          {/* Decorative element for testimonial style */}
          {quote_style === 'testimonial' && (
            <div className="flex-shrink-0 ml-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
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
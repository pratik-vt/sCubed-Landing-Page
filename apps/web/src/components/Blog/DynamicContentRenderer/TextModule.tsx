import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface TextModuleData {
  content?: string;
  text_alignment?: 'left' | 'center' | 'right' | 'justify';
  text_size?: 'small' | 'normal' | 'large';
  background_style?: 'none' | 'light' | 'primary' | 'accent';
  spacing?: 'compact' | 'normal' | 'spacious';
  [key: string]: any; // Allow additional properties from Strapi
}

interface TextModuleProps {
  data: TextModuleData;
  blockIndex?: number;
}

const TextModule: React.FC<TextModuleProps> = ({ data, blockIndex = 0 }) => {
  const {
    content = '',
    text_alignment = 'left',
    text_size = 'normal',
    background_style = 'none',
    spacing = 'normal'
  } = data;

  // If no content, don't render anything
  if (!content) {
    return null;
  }

  // Spacing classes
  const spacingClasses = {
    compact: 'py-2',
    normal: 'py-4',
    spacious: 'py-8'
  };

  // Text alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  // Text size classes
  const sizeClasses = {
    small: 'text-sm leading-relaxed',
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed'
  };

  // Background style classes
  const backgroundClasses = {
    none: '',
    light: 'bg-neutral-50 p-6 rounded-lg',
    primary: 'bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500',
    accent: 'bg-accent-50 p-6 rounded-lg border border-accent-200'
  };

  const containerClasses = [
    'text-module',
    spacingClasses[spacing],
    alignmentClasses[text_alignment],
    sizeClasses[text_size],
    backgroundClasses[background_style]
  ].filter(Boolean).join(' ');

  const customComponents: Components = {
    // Custom heading styles
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => {
      // Create ID from heading text for TOC linking
      const headingText = typeof children === 'string' ? children : 
        React.Children.toArray(children).join('');
      const baseId = headingText
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      // Include block index to ensure uniqueness across blocks
      const headingId = `${baseId}-block-${blockIndex}`;
      
      return (
        <h2 
          id={headingId} 
          className="text-3xl font-semibold mb-5 text-gray-900"
          style={{ scrollMarginTop: '100px' }}
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-semibold mb-4 text-gray-900" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-semibold mb-3 text-gray-900" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className="text-lg font-semibold mb-2 text-gray-900" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 className="text-base font-semibold mb-2 text-gray-900" {...props}>
        {children}
      </h6>
    ),
    // Custom paragraph styles
    p: ({ children, ...props }) => (
      <p className="mb-4 text-gray-700 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    // Custom list styles
    ul: ({ children, ...props }) => (
      <ul className="mb-4 ml-6 space-y-2 list-disc text-gray-700" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 ml-6 space-y-2 list-decimal text-gray-700" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    // Custom link styles
    a: ({ children, ...props }) => (
      <a
        className="text-primary-600 hover:text-primary-700 underline transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    // Custom blockquote styles
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-primary-500 bg-primary-50 p-4 my-6 italic" {...props}>
        {children}
      </blockquote>
    ),
    // Custom code styles
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm" {...props}>
            {children}
          </code>
        );
      }
      return (
        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto" {...props}>
          {children}
        </code>
      );
    },
    // Custom table styles
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border border-gray-200 rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200" {...props}>
        {children}
      </td>
    ),
  };

  return (
    <div className={containerClasses}>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown components={customComponents}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TextModule; 
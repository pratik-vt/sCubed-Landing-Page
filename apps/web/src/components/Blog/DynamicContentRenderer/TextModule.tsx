import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

import {
  tableWrapper,
  table,
  tableHeader,
  headerCell,
  tableBody,
  bodyRow,
  bodyCell,
  cellContent,
} from './table.css';

// Type for component props
type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

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
    h1: ({ children, ...props }: ComponentProps) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentProps) => {
      // Create ID from heading text for TOC linking
      const headingText = typeof children === 'string' ? children : 
        React.Children.toArray(children)
          .map(child => typeof child === 'string' ? child : '')
          .join('');
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
    h3: ({ children, ...props }: ComponentProps) => (
      <h3 className="text-2xl font-semibold mb-4 text-gray-900" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: ComponentProps) => (
      <h4 className="text-xl font-semibold mb-3 text-gray-900" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }: ComponentProps) => (
      <h5 className="text-lg font-semibold mb-2 text-gray-900" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }: ComponentProps) => (
      <h6 className="text-base font-semibold mb-2 text-gray-900" {...props}>
        {children}
      </h6>
    ),
    // Custom paragraph styles
    p: ({ children, ...props }: ComponentProps) => (
      <p className="mb-4 text-gray-700 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    // Custom list styles
    ul: ({ children, ...props }: ComponentProps) => (
      <ul className="mb-4 ml-6 space-y-2 list-disc text-gray-700" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: ComponentProps) => (
      <ol className="mb-4 ml-6 space-y-2 list-decimal text-gray-700" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: ComponentProps) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    // Custom link styles
    a: ({ children, ...props }: ComponentProps) => (
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
    blockquote: ({ children, ...props }: ComponentProps) => (
      <blockquote className="border-l-4 border-primary-500 bg-primary-50 p-4 my-6 italic" {...props}>
        {children}
      </blockquote>
    ),
    // Custom code styles
    code: ({ children, className, ...props }: ComponentProps) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }
      return (
        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono" {...props}>
          {children}
        </code>
      );
    },
    // Code block with language support
    pre: ({ children, ...props }: ComponentProps) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm" {...props}>
        {children}
      </pre>
    ),
    // Strikethrough support (via remark-gfm)
    del: ({ children, ...props }: ComponentProps) => (
      <del className="text-gray-500 line-through" {...props}>
        {children}
      </del>
    ),
    // Support for HTML elements like <u>
    u: ({ children, ...props }: ComponentProps) => (
      <u className="underline decoration-2 decoration-primary-500" {...props}>
        {children}
      </u>
    ),
    // Strong/bold support
    strong: ({ children, ...props }: ComponentProps) => (
      <strong className="font-semibold text-gray-900" {...props}>
        {children}
      </strong>
    ),
    // Emphasis/italic support
    em: ({ children, ...props }: ComponentProps) => (
      <em className="italic text-gray-800" {...props}>
        {children}
      </em>
    ),
    // Mark/highlight support
    mark: ({ children, ...props }: ComponentProps) => (
      <mark className="bg-yellow-200 px-1 rounded" {...props}>
        {children}
      </mark>
    ),
    // Enhanced table styles with custom CSS
    table: ({ children, ...props }: ComponentProps) => (
      <div className={tableWrapper}>
        <table className={table} {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: ComponentProps) => (
      <thead className={tableHeader} {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }: ComponentProps) => (
      <th className={headerCell} {...props}>
        {children}
      </th>
    ),
    tbody: ({ children, ...props }: ComponentProps) => (
      <tbody className={tableBody} {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: ComponentProps) => (
      <tr className={bodyRow} {...props}>
        {children}
      </tr>
    ),
    td: ({ children, ...props }: ComponentProps) => (
      <td className={bodyCell} {...props}>
        <div className={cellContent}>
          {children}
        </div>
      </td>
    ),
  };

  return (
    <div className={containerClasses}>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown 
          components={customComponents}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TextModule; 
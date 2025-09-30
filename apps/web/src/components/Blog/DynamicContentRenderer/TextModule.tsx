import React from 'react';
import type { Components } from 'react-markdown';

import DynamicContentRenderer from '../../DynamicContentRenderer';
import { replaceDatePlaceholder } from '../../../lib/date-utils';

import {
  bodyCell,
  bodyRow,
  cellContent,
  headerCell,
  table,
  tableBody,
  tableHeader,
  tableWrapper,
} from './table.css';

// Type for component props
type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

interface EventMetadata {
  start_date?: string;
  end_date?: string;
  time?: string;
}

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
  eventMetadata?: EventMetadata;
}

const TextModule: React.FC<TextModuleProps> = ({ data, blockIndex = 0, eventMetadata }) => {
  const {
    content = '',
    text_alignment = 'left',
    text_size = 'normal',
    background_style = 'none',
    spacing = 'normal',
  } = data;

  // If no content, don't render anything
  if (!content) {
    return null;
  }

  // Process date placeholders if eventMetadata is provided
  const processedContent = eventMetadata?.start_date && eventMetadata?.end_date
    ? replaceDatePlaceholder(content, eventMetadata.start_date, eventMetadata.end_date)
    : content;

  // Spacing classes
  const spacingClasses = {
    compact: 'py-2',
    normal: 'py-4',
    spacious: 'py-8',
  };

  // Text alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Text size classes
  const sizeClasses = {
    small: 'text-sm leading-relaxed',
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
  };

  // Background style classes
  const backgroundClasses = {
    none: '',
    light: 'bg-neutral-50 p-6 rounded-lg',
    primary: 'bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500',
    accent: 'bg-accent-50 p-6 rounded-lg border border-accent-200',
  };

  const containerClasses = [
    'text-module',
    spacingClasses[spacing],
    alignmentClasses[text_alignment],
    sizeClasses[text_size],
    backgroundClasses[background_style],
  ]
    .filter(Boolean)
    .join(' ');

  // Custom table components that use the Vanilla Extract styles
  const tableComponents: Partial<Components> = {
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
        <div className={cellContent}>{children}</div>
      </td>
    ),
  };

  return (
    <div className={containerClasses}>
      <DynamicContentRenderer
        content={processedContent}
        components={tableComponents}
        blockIndex={blockIndex}
      />
    </div>
  );
};

export default TextModule;

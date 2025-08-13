import React from 'react';
import ReactMarkdown from 'react-markdown';

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
}

const TextModule: React.FC<TextModuleProps> = ({ data }) => {
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

  return (
    <div className={containerClasses}>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            // Custom heading styles
            h1: ({ children }: { children: React.ReactNode }) => (
              <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
            ),
            h2: ({ children }: { children: React.ReactNode }) => (
              <h2 className="text-3xl font-semibold mb-5 text-gray-900">{children}</h2>
            ),
            h3: ({ children }: { children: React.ReactNode }) => (
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{children}</h3>
            ),
            h4: ({ children }: { children: React.ReactNode }) => (
              <h4 className="text-xl font-semibold mb-3 text-gray-900">{children}</h4>
            ),
            h5: ({ children }: { children: React.ReactNode }) => (
              <h5 className="text-lg font-semibold mb-2 text-gray-900">{children}</h5>
            ),
            h6: ({ children }: { children: React.ReactNode }) => (
              <h6 className="text-base font-semibold mb-2 text-gray-900">{children}</h6>
            ),
            // Custom paragraph styles
            p: ({ children }: { children: React.ReactNode }) => (
              <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
            ),
            // Custom list styles
            ul: ({ children }: { children: React.ReactNode }) => (
              <ul className="mb-4 ml-6 space-y-2 list-disc text-gray-700">{children}</ul>
            ),
            ol: ({ children }: { children: React.ReactNode }) => (
              <ol className="mb-4 ml-6 space-y-2 list-decimal text-gray-700">{children}</ol>
            ),
            li: ({ children }: { children: React.ReactNode }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            // Custom link styles
            a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
              <a
                href={href}
                className="text-primary-600 hover:text-primary-700 underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            // Custom blockquote styles
            blockquote: ({ children }: { children: React.ReactNode }) => (
              <blockquote className="border-l-4 border-primary-500 bg-primary-50 p-4 my-6 italic">
                {children}
              </blockquote>
            ),
            // Custom code styles
            code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                );
              }
              return (
                <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  {children}
                </code>
              );
            },
            // Custom table styles
            table: ({ children }: { children: React.ReactNode }) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }: { children: React.ReactNode }) => (
              <thead className="bg-gray-50">{children}</thead>
            ),
            th: ({ children }: { children: React.ReactNode }) => (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                {children}
              </th>
            ),
            td: ({ children }: { children: React.ReactNode }) => (
              <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TextModule; 
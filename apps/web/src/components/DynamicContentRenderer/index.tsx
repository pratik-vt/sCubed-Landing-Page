import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

interface DynamicContentRendererProps {
  content: string;
  components?: Partial<Components>;
  className?: string;
  remarkPlugins?: any[];
  rehypePlugins?: any[];
  blockIndex?: number;
}

export const defaultMarkdownComponents: Components = {
  h1: ({ children, ...props }: ComponentProps) => (
    <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps) => {
    const headingText = typeof children === 'string' ? children :
      React.Children.toArray(children)
        .map(child => typeof child === 'string' ? child : '')
        .join('');
    const baseId = headingText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const blockIndex = (props as any).blockIndex || 0;
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
  p: ({ children, ...props }: ComponentProps) => (
    <p className="mb-4 text-gray-700 leading-relaxed" {...props}>
      {children}
    </p>
  ),
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
  a: ({ children, ...props }: ComponentProps) => (
    <a
      className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: ComponentProps) => (
    <blockquote className="border-l-4 border-primary-500 bg-primary-50 p-4 my-6 italic" {...props}>
      {children}
    </blockquote>
  ),
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
  pre: ({ children, ...props }: ComponentProps) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm" {...props}>
      {children}
    </pre>
  ),
  del: ({ children, ...props }: ComponentProps) => (
    <del className="text-gray-500 line-through" {...props}>
      {children}
    </del>
  ),
  u: ({ children, ...props }: ComponentProps) => (
    <u className="underline decoration-2 decoration-primary-500" {...props}>
      {children}
    </u>
  ),
  strong: ({ children, ...props }: ComponentProps) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: ComponentProps) => (
    <em className="italic text-gray-800" {...props}>
      {children}
    </em>
  ),
  mark: ({ children, ...props }: ComponentProps) => (
    <mark className="bg-yellow-200 px-1 rounded" {...props}>
      {children}
    </mark>
  ),
  hr: ({ ...props }: ComponentProps) => (
    <hr className="my-8 border-t border-gray-300" {...props} />
  ),
};

const DynamicContentRenderer: React.FC<DynamicContentRendererProps> = ({
  content,
  components,
  className = '',
  remarkPlugins = [remarkGfm],
  rehypePlugins = [rehypeRaw],
  blockIndex = 0,
}) => {
  if (!content) {
    return null;
  }

  const mergedComponents: Components = {
    ...defaultMarkdownComponents,
    ...components,
    h2: components?.h2 || (({ children, ...props }: ComponentProps) => {
      const H2Component = defaultMarkdownComponents.h2 as React.FC<ComponentProps>;
      return <H2Component {...props} blockIndex={blockIndex}>{children}</H2Component>;
    }),
  };

  return (
    <div className={className}>
      <ReactMarkdown
        components={mergedComponents}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default DynamicContentRenderer;
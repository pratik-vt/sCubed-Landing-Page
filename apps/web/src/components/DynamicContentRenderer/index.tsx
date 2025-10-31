import React from 'react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import {
  extractYouTubeVideoId,
  getYouTubeEmbedUrl,
  isYouTubeUrl,
} from '../../lib/youtube-utils';
import { videoContainer, videoIframe, videoWrapper } from './video-embed.css';

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
    <h1
      style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#111827',
      }}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps) => {
    const headingText =
      typeof children === 'string'
        ? children
        : React.Children.toArray(children)
            .map((child) => (typeof child === 'string' ? child : ''))
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
        style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '1.25rem',
          color: '#111827',
          scrollMarginTop: '100px',
        }}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: ComponentProps) => (
    <h3
      style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#111827',
      }}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps) => (
    <h4
      style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
        color: '#111827',
      }}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: ComponentProps) => (
    <h5
      style={{
        fontSize: '1.125rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#111827',
      }}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: ComponentProps) => (
    <h6
      style={{
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#111827',
      }}
      {...props}
    >
      {children}
    </h6>
  ),
  p: ({ children, ...props }: ComponentProps) => (
    <p
      style={{ marginBottom: '1rem', color: '#374151', lineHeight: 1.75 }}
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentProps) => (
    <ul
      style={{
        marginBottom: '1rem',
        marginLeft: '1.5rem',
        listStyleType: 'disc',
        color: '#374151',
      }}
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps) => (
    <ol
      style={{
        marginBottom: '1rem',
        marginLeft: '1.5rem',
        listStyleType: 'decimal',
        color: '#374151',
      }}
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentProps) => (
    <li style={{ lineHeight: 1.75 }} {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }: ComponentProps) => {
    // Check if the link is a YouTube URL
    if (href && isYouTubeUrl(href)) {
      const videoId = extractYouTubeVideoId(href);

      if (videoId) {
        const embedUrl = getYouTubeEmbedUrl(videoId, {
          privacyMode: true,
          showControls: true,
        });

        return (
          <div className={videoWrapper}>
            <div className={videoContainer}>
              <iframe
                className={videoIframe}
                src={embedUrl}
                title={
                  typeof children === 'string' ? children : 'YouTube video'
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        );
      }
    }

    // Default link rendering
    return (
      <a
        href={href}
        style={{
          color: '#2563EB',
          textDecoration: 'underline',
          fontWeight: 'normal',
        }}
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children, ...props }: ComponentProps) => (
    <blockquote
      style={{
        borderLeft: '4px solid #3B82F6',
        backgroundColor: '#EFF6FF',
        padding: '1rem',
        margin: '1.5rem 0',
        fontStyle: 'italic',
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: ComponentProps) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          style={{
            backgroundColor: '#F3F4F6',
            color: '#1F2937',
            padding: '0.125rem 0.25rem',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        style={{
          display: 'block',
          backgroundColor: '#111827',
          color: '#F9FAFB',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflowX: 'auto',
          fontFamily: 'monospace',
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: ComponentProps) => (
    <pre
      style={{
        backgroundColor: '#111827',
        color: '#F9FAFB',
        padding: '1rem',
        borderRadius: '0.5rem',
        overflowX: 'auto',
        margin: '1rem 0',
        fontFamily: 'monospace',
        fontSize: '0.875rem',
      }}
      {...props}
    >
      {children}
    </pre>
  ),
  del: ({ children, ...props }: ComponentProps) => (
    <del
      style={{ color: '#6B7280', textDecoration: 'line-through' }}
      {...props}
    >
      {children}
    </del>
  ),
  u: ({ children, ...props }: ComponentProps) => (
    <u
      style={{
        textDecoration: 'underline',
        textDecorationThickness: '2px',
        textDecorationColor: '#3B82F6',
      }}
      {...props}
    >
      {children}
    </u>
  ),
  strong: ({ children, ...props }: ComponentProps) => (
    <strong style={{ fontWeight: '600', color: '#111827' }} {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: ComponentProps) => (
    <em style={{ fontStyle: 'italic', color: '#1F2937' }} {...props}>
      {children}
    </em>
  ),
  mark: ({ children, ...props }: ComponentProps) => (
    <mark
      style={{
        backgroundColor: '#FEF3C7',
        padding: '0.125rem 0.25rem',
        borderRadius: '0.25rem',
      }}
      {...props}
    >
      {children}
    </mark>
  ),
  hr: ({ ...props }: ComponentProps) => (
    <hr
      style={{ margin: '2rem 0', borderTop: '1px solid #E5E7EB' }}
      {...props}
    />
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

  // Preprocess content to remove bold markdown around links
  // This converts **[text](url)** to just [text](url)
  const preprocessedContent = content
    .replace(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g, '[$1]($2)')
    // Also handle cases where bold tags wrap HTML anchors
    .replace(/\*\*<a([^>]*)>([^<]*)<\/a>\*\*/g, '<a$1>$2</a>');

  const mergedComponents: Components = {
    ...defaultMarkdownComponents,
    ...components,
    h2:
      components?.h2 ||
      (({ children, ...props }: ComponentProps) => {
        const H2Component =
          defaultMarkdownComponents.h2 as React.FC<ComponentProps>;
        return (
          <H2Component {...props} blockIndex={blockIndex}>
            {children}
          </H2Component>
        );
      }),
  };

  return (
    <div className={className}>
      <ReactMarkdown
        components={mergedComponents}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {preprocessedContent}
      </ReactMarkdown>
    </div>
  );
};

export default DynamicContentRenderer;

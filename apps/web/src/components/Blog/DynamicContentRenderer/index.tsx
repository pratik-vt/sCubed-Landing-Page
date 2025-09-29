import React from 'react';

import { ContentBlock } from '../../../lib/strapi';

import TextModule from './TextModule';
import ModuleImage from './ModuleImage';
import ModuleQuote from './ModuleQuote';
import ModuleYoutube from './ModuleYoutube';
import ModuleAudio from './ModuleAudio';

interface DynamicContentRendererProps {
  content_blocks: ContentBlock[];
}

const DynamicContentRenderer: React.FC<DynamicContentRendererProps> = ({
  content_blocks
}) => {
  const renderContentBlock = (block: ContentBlock, index: number) => {
    const key = `${block.__component}-${block.id || index}`;
    // Add section ID for TOC scrolling
    const sectionId = `section-${index}`;
    
    switch (block.__component) {
      case 'blog.text-module':
        return (
          <div key={key} id={sectionId}>
            <TextModule data={block} blockIndex={index} />
          </div>
        );
      case 'blog.module-image':
        return (
          <div key={key} id={sectionId}>
            <ModuleImage data={block} />
          </div>
        );
      case 'blog.module-quote':
        return (
          <div key={key} id={sectionId}>
            <ModuleQuote data={block} />
          </div>
        );
      case 'blog.module-youtube':
        return (
          <div key={key} id={sectionId}>
            <ModuleYoutube data={block} />
          </div>
        );
      case 'blog.module-audio':
        return (
          <div key={key} id={sectionId}>
            <ModuleAudio data={block} />
          </div>
        );
      default:
        console.warn(`Unknown component type: ${block.__component}`);
        return (
          <div key={key} id={sectionId} className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-red-600 text-sm">
              Unknown content block type: {block.__component}
            </p>
          </div>
        );
    }
  };

  if (!content_blocks || content_blocks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No content blocks available.
      </div>
    );
  }

  return (
    <div className="dynamic-content space-y-8" style={{ overflowAnchor: 'auto' }}>
      {content_blocks.map(renderContentBlock)}
    </div>
  );
};

export default DynamicContentRenderer; 
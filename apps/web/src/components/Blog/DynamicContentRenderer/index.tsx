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
    
    switch (block.__component) {
      case 'blog.text-module':
        return <TextModule key={key} data={block} />;
      case 'blog.module-image':
        return <ModuleImage key={key} data={block} />;
      case 'blog.module-quote':
        return <ModuleQuote key={key} data={block} />;
      case 'blog.module-youtube':
        return <ModuleYoutube key={key} data={block} />;
      case 'blog.module-audio':
        return <ModuleAudio key={key} data={block} />;
      default:
        console.warn(`Unknown component type: ${block.__component}`);
        return (
          <div key={key} className="p-4 border border-red-200 bg-red-50 rounded-lg">
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
    <div className="dynamic-content space-y-8">
      {content_blocks.map(renderContentBlock)}
    </div>
  );
};

export default DynamicContentRenderer; 
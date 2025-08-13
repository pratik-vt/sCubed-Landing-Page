import React from 'react';
import Image from 'next/image';

import { getStrapiImageUrl, StrapiImage } from '../../../lib/strapi';

interface ModuleYoutubeData {
  video_id?: string;
  video_title?: string;
  video_description?: string;
  custom_thumbnail?: StrapiImage;
  player_size?: 'small' | 'medium' | 'large' | 'full-width';
  aspect_ratio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  show_controls?: boolean;
  start_time?: number;
  privacy_mode?: boolean;
  [key: string]: any; // Allow additional properties from Strapi
}

interface ModuleYoutubeProps {
  data: ModuleYoutubeData;
}

const ModuleYoutube: React.FC<ModuleYoutubeProps> = ({ data }) => {
  const {
    video_id = '',
    video_title,
    video_description,
    custom_thumbnail,
    player_size = 'large',
    aspect_ratio = '16:9',
    autoplay = false,
    show_controls = true,
    start_time,
    privacy_mode = true
  } = data;

  // If no video ID, don't render anything
  if (!video_id) {
    return null;
  }

  // Size classes for the container
  const sizeClasses = {
    small: 'max-w-md mx-auto',
    medium: 'max-w-2xl mx-auto',
    large: 'max-w-4xl mx-auto',
    'full-width': 'w-full'
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  };

  // Build the embed URL
  const buildEmbedUrl = () => {
    const baseUrl = privacy_mode 
      ? 'https://www.youtube-nocookie.com/embed/'
      : 'https://www.youtube.com/embed/';
    
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      controls: show_controls ? '1' : '0',
      rel: '0', // Don't show related videos
      modestbranding: '1', // Reduce YouTube branding
      ...(start_time && { start: start_time.toString() })
    });

    return `${baseUrl}${video_id}?${params}`;
  };

  // Get YouTube thumbnail URL
  const getYoutubeThumbnail = () => {
    if (custom_thumbnail) {
      return getStrapiImageUrl(custom_thumbnail);
    }
    return `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`;
  };

  const containerClasses = [
    'module-youtube my-8',
    sizeClasses[player_size]
  ].join(' ');

  return (
    <div className={containerClasses}>
      {/* Title */}
      {video_title && (
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">
          {video_title}
        </h3>
      )}

      {/* Video Player */}
      <div className={`${aspectRatioClasses[aspect_ratio]} rounded-lg overflow-hidden shadow-lg bg-gray-100`}>
        <iframe
          src={buildEmbedUrl()}
          title={video_title || `YouTube video ${video_id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Description */}
      {video_description && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            {video_description}
          </p>
        </div>
      )}

      {/* Video Info Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            YouTube Video
          </span>
          
          {start_time && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Starts at {Math.floor(start_time / 60)}:{(start_time % 60).toString().padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {privacy_mode && (
            <span className="flex items-center text-green-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Privacy Mode
            </span>
          )}
          
          <a
            href={`https://www.youtube.com/watch?v=${video_id}${start_time ? `&t=${start_time}` : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModuleYoutube; 
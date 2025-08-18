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

  // Size styles for the container - using CSS instead of Tailwind
  const getSizeStyles = (size: string) => {
    const sizeMap = {
      small: { maxWidth: '384px', margin: '0 auto' },     
      medium: { maxWidth: '576px', margin: '0 auto' },    
      large: { maxWidth: '768px', margin: '0 auto' },     
      'full-width': { maxWidth: '896px', margin: '0 auto', width: '100%' }
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.large;
  };

  // Container styles without Tailwind
  const containerStyles = {
    marginTop: '2rem',
    marginBottom: '2rem',
    ...getSizeStyles(player_size)
  };

  // If no video ID, show an error state instead of rendering nothing
  if (!video_id) {
    return (
      <div style={containerStyles}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingBottom: '56.25%',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fef2f2',
          border: '2px solid #fecaca',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem', position: 'absolute' }}>
            <div style={{ color: '#dc2626', marginBottom: '1rem' }}>
              <svg style={{ width: '4rem', height: '4rem', margin: '0 auto' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#7f1d1d', marginBottom: '0.5rem' }}>YouTube Video Unavailable</h3>
            <p style={{ color: '#b91c1c' }}>No video ID provided for this YouTube module.</p>
            {video_title && (
              <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.5rem' }}>Expected video: {video_title}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Aspect ratio styles with proper responsive video container
  const getAspectRatioStyles = (ratio: string) => {
    const ratioMap = {
      '16:9': { position: 'relative' as const, width: '100%', height: '0', paddingBottom: '56.25%' },
      '4:3': { position: 'relative' as const, width: '100%', height: '0', paddingBottom: '75%' },
      '1:1': { position: 'relative' as const, width: '100%', height: '0', paddingBottom: '100%' }
    };
    return ratioMap[ratio as keyof typeof ratioMap] || ratioMap['16:9'];
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



  return (
    <div style={containerStyles}>
      {/* Title */}
      {video_title && (
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#111827'
        }}>
          {video_title}
        </h3>
      )}

      {/* Video Player */}
      <div style={{
        ...getAspectRatioStyles(aspect_ratio),
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f3f4f6'
      }}>
        <iframe
          src={buildEmbedUrl()}
          title={video_title || `YouTube video ${video_id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '0px'
          }}
        />
      </div>

      {/* Description */}
      {video_description && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem',
          backgroundColor: '#f9fafb',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          <p style={{
            color: '#374151',
            lineHeight: '1.625'
          }}>
            {video_description}
          </p>
        </div>
      )}

      {/* Minimal footer - only show if there's start time */}
      {start_time && (
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>
          Video starts at {Math.floor(start_time / 60)}:{(start_time % 60).toString().padStart(2, '0')}
        </div>
      )}
    </div>
  );
};

export default ModuleYoutube; 
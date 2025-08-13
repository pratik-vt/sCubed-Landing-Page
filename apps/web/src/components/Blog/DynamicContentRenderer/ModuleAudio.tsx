import React from 'react';
import Image from 'next/image';

import { getStrapiImageUrl, StrapiImage } from '../../../lib/strapi';

interface ModuleAudioData {
  audio_file?: StrapiImage;
  audio_title?: string;
  audio_description?: string;
  podcast_episode?: string;
  duration?: string;
  cover_artwork?: StrapiImage;
  transcript?: string;
  player_style?: 'minimal' | 'standard' | 'featured';
  autoplay?: boolean;
  show_download?: boolean;
  loop?: boolean;
  [key: string]: any; // Allow additional properties from Strapi
}

interface ModuleAudioProps {
  data: ModuleAudioData;
}

const ModuleAudio: React.FC<ModuleAudioProps> = ({ data }) => {
  const {
    audio_file,
    audio_title = 'Audio Player',
    audio_description,
    podcast_episode,
    duration,
    cover_artwork,
    transcript,
    player_style = 'standard',
    autoplay = false,
    show_download = false,
    loop = false
  } = data;

  const audioUrl = audio_file ? getStrapiImageUrl(audio_file) : '';
  const coverUrl = cover_artwork ? getStrapiImageUrl(cover_artwork) : null;

  if (!audioUrl) {
    return (
      <div className="module-audio py-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600">
          Audio file not available
        </div>
      </div>
    );
  }

  const getPlayerStyleClasses = () => {
    switch (player_style) {
      case 'minimal':
        return 'bg-white border border-gray-200 rounded-lg p-4';
      case 'featured':
        return 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 shadow-lg';
      default:
        return 'bg-gray-50 border border-gray-200 rounded-lg p-5';
    }
  };

  return (
    <div className="module-audio my-8">
      <div className={getPlayerStyleClasses()}>
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          {/* Cover Artwork */}
          {coverUrl && (
            <div className="flex-shrink-0">
              <Image
                src={coverUrl}
                alt={audio_title}
                width={player_style === 'featured' ? 80 : 64}
                height={player_style === 'featured' ? 80 : 64}
                className="rounded-lg shadow-sm object-cover"
              />
            </div>
          )}

          {/* Title and Metadata */}
          <div className="flex-grow min-w-0">
            <h3 className={`font-semibold text-gray-900 mb-1 ${
              player_style === 'featured' ? 'text-xl' : 'text-lg'
            }`}>
              {audio_title}
            </h3>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              {podcast_episode && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 01-1.415-1.415A3.987 3.987 0 0013 12a3.987 3.987 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                  Episode {podcast_episode}
                </span>
              )}
              
              {duration && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {duration}
                </span>
              )}
            </div>
          </div>

          {/* Download Button */}
          {show_download && (
            <div className="flex-shrink-0">
              <a
                href={audioUrl}
                download
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
              </a>
            </div>
          )}
        </div>

        {/* Description */}
        {audio_description && (
          <p className="text-gray-700 mb-4 leading-relaxed">
            {audio_description}
          </p>
        )}

        {/* Audio Player */}
        <div className="mb-4">
          <audio
            controls
            className="w-full"
            autoPlay={autoplay}
            loop={loop}
            preload="metadata"
          >
            <source src={audioUrl} type="audio/mpeg" />
            <source src={audioUrl} type="audio/wav" />
            <source src={audioUrl} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Audio Controls Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
              </svg>
              Audio Player
            </span>
            
            {loop && (
              <span className="flex items-center text-blue-600">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Loop
              </span>
            )}
          </div>

          <div className="text-right">
            <span>Use controls to play, pause, and adjust volume</span>
          </div>
        </div>
      </div>

      {/* Transcript */}
      {transcript && (
        <details className="mt-6">
          <summary className="cursor-pointer font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Transcript
          </summary>
          
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
            <div className="prose prose-sm max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: transcript }} />
            </div>
          </div>
        </details>
      )}
    </div>
  );
};

export default ModuleAudio; 
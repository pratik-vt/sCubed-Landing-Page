import React from 'react';
import Image from 'next/image';

import { getStrapiImageUrl, StrapiImage } from '../../../lib/strapi';

import { 
  moduleContainer,
  playerContainer,
  minimalStyle,
  standardStyle,
  featuredStyle,
  headerContainer,
  coverArtwork,
  titleContainer,
  moduleTitle,
  featuredTitle,
  metadataContainer,
  metadataItem,
  metadataIcon,
  downloadButton,
  description,
  audioPlayerWrapper,
  audioPlayer,
  controlsInfo,
  controlsLeft,
  controlsRight,
  transcriptContainer,
  transcriptSummary,
  transcriptIcon,
  transcriptContent,
  errorState,
  loadingState,
  loopIndicator
} from './styles.css';

// Import global styles for transcript content
import './global.css';

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
      <div className={moduleContainer} role="alert" aria-live="polite">
        <div className={errorState}>
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Audio file not available
        </div>
      </div>
    );
  }

  const getPlayerStyleClass = () => {
    switch (player_style) {
      case 'minimal':
        return minimalStyle;
      case 'featured':
        return featuredStyle;
      default:
        return standardStyle;
    }
  };

  return (
    <article className={moduleContainer} role="region" aria-labelledby="audio-title">
      <div className={`${playerContainer} ${getPlayerStyleClass()}`}>
        {/* Header */}
        <header className={headerContainer}>
          {/* Cover Artwork */}
          {coverUrl && (
            <div className={coverArtwork}>
              <Image
                src={coverUrl}
                alt={`Cover artwork for ${audio_title}`}
                width={player_style === 'featured' ? 80 : 64}
                height={player_style === 'featured' ? 80 : 64}
                style={{ 
                  borderRadius: '12px',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          )}

          {/* Title and Metadata */}
          <div className={titleContainer}>
            <h3 
              id="audio-title"
              className={player_style === 'featured' ? featuredTitle : moduleTitle}
            >
              {audio_title}
            </h3>
            
            <div className={metadataContainer} role="list" aria-label="Audio metadata">
              {podcast_episode && (
                <span className={metadataItem} role="listitem">
                  <svg 
                    className={metadataIcon} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 01-1.415-1.415A3.987 3.987 0 0013 12a3.987 3.987 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                  <span aria-label={`Episode ${podcast_episode}`}>
                    Episode {podcast_episode}
                  </span>
                </span>
              )}
              
              {duration && (
                <span className={metadataItem} role="listitem">
                  <svg 
                    className={metadataIcon} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <time dateTime={duration} aria-label={`Duration: ${duration}`}>
                    {duration}
                  </time>
                </span>
              )}
            </div>
          </div>

          {/* Download Button */}
          {show_download && (
            <div>
              <a
                href={audioUrl}
                download
                className={downloadButton}
                aria-label={`Download ${audio_title} audio file`}
              >
                <svg 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
              </a>
            </div>
          )}
        </header>

        {/* Description */}
        {audio_description && (
          <p className={description}>
            {audio_description}
          </p>
        )}

        {/* Audio Player */}
        <div className={audioPlayerWrapper}>
          <audio
            controls
            className={audioPlayer}
            autoPlay={autoplay}
            loop={loop}
            preload="metadata"
            aria-label={`Audio player for ${audio_title}`}
            aria-describedby={audio_description ? "audio-description" : undefined}
          >
            <source src={audioUrl} type="audio/mpeg" />
            <source src={audioUrl} type="audio/wav" />
            <source src={audioUrl} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Audio Controls Info */}
        <footer className={controlsInfo} aria-label="Audio player information">
          <div className={controlsLeft}>
            <span className={metadataItem}>
              <svg 
                width="12" 
                height="12" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
              </svg>
              Audio Player
            </span>
            
            {loop && (
              <span className={loopIndicator} aria-label="Loop enabled">
                <svg 
                  width="12" 
                  height="12" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Loop
              </span>
            )}
          </div>

          <div className={controlsRight}>
            <span>Use controls to play, pause, and adjust volume</span>
          </div>
        </footer>
      </div>

      {/* Transcript */}
      {transcript && (
        <details className={transcriptContainer}>
          <summary 
            className={transcriptSummary}
            aria-expanded="false"
            aria-controls="transcript-content"
          >
            <svg 
              className={transcriptIcon} 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Transcript
          </summary>
          
          <div 
            id="transcript-content"
            className={transcriptContent}
            role="document"
            aria-label="Audio transcript"
          >
            <div dangerouslySetInnerHTML={{ __html: transcript }} />
          </div>
        </details>
      )}
    </article>
  );
};

export default ModuleAudio; 
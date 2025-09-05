'use client';

import React from 'react';
import { Play, Pause } from 'lucide-react';

import { StrapiImage, getStrapiImageUrl } from '../../../lib/strapi';
import { useIOSAudio } from '../../../hooks/useIOSAudio';

import {
  audioButton,
  audioButtonContent,
  audioIcon,
  audioText,
} from './styles.css';

interface AudioButtonProps {
  audioFile?: StrapiImage;
  title: string;
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ audioFile, title, className }) => {
  const audioUrl = audioFile ? getStrapiImageUrl(audioFile) : null;
  
  const { audioRef, isPlaying, error, togglePlay } = useIOSAudio({
    onError: (errorMessage) => {
      console.error('AudioButton error:', errorMessage);
    },
  });

  if (!audioUrl) {
    return null;
  }

  return (
    <>
      <button
        onClick={togglePlay}
        className={`${audioButton} ${className || ''}`}
        type="button"
        aria-label={`${isPlaying ? 'Pause' : 'Play'} audio version of ${title}`}
        disabled={!!error}
      >
        <div className={audioButtonContent}>
          <div className={audioIcon}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </div>
          <span className={audioText}>
            {error ? 'Audio Unavailable' : 'Listen to Audio Version'}
          </span>
        </div>
      </button>

      <audio
        ref={audioRef as React.RefObject<HTMLAudioElement>}
        src={audioUrl}
        preload="metadata"
        style={{ display: 'none' }}
      >
        <source src={audioUrl} type="audio/mpeg" />
        <source src={audioUrl} type="audio/mp4" />
        <source src={audioUrl} type="audio/wav" />
        <track kind="captions" srcLang="en" label="English" />
      </audio>
    </>
  );
};

export default AudioButton;

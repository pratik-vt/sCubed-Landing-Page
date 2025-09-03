'use client';

import React, { useState, useRef, useEffect } from 'react';

import { Play, Pause } from 'lucide-react';

import { StrapiImage, getStrapiImageUrl } from '../../../lib/strapi';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = audioFile ? getStrapiImageUrl(audioFile) : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

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
      >
        <div className={audioButtonContent}>
          <div className={audioIcon}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </div>
          <span className={audioText}>Listen to Audio Version</span>
        </div>
      </button>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      >
        <track kind="captions" srcLang="en" label="English" />
      </audio>
    </>
  );
};

export default AudioButton;

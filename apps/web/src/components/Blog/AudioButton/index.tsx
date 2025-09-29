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
  audioContainer,
  progressBar,
  timeDisplay,
  progressWrapper,
  currentTimeSpan,
  durationSpan,
} from './styles.css';

interface AudioButtonProps {
  audioFile?: StrapiImage;
  title: string;
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ audioFile, title, className }) => {
  const audioUrl = audioFile ? getStrapiImageUrl(audioFile) : null;
  const [isMounted, setIsMounted] = React.useState(false);

  const { audioRef, isPlaying, error, currentTime, duration, togglePlay, seek } = useIOSAudio({
    onError: (errorMessage) => {
      console.error('AudioButton error:', errorMessage);
    },
  });

  // Set mounted state to true after component mounts (client-side only)
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force audio to load metadata only once after mounting (client-side only)
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioUrl && isMounted) {
      // Only load if the audio doesn't already have a valid duration
      if (!audio.duration || !isFinite(audio.duration) || audio.duration === 0) {
        // Load the audio metadata
        audio.load();
      }
    }
  }, [audioUrl, audioRef, isMounted]);

  const formatTime = (time: number): string => {
    if (!isFinite(time) || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  if (!audioUrl) {
    return null;
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={audioContainer}>
      <button
        onClick={togglePlay}
        className={`${audioButton} ${className || ''}`}
        type="button"
        aria-label={`${isPlaying ? 'Pause' : 'Play'} audio version of ${title}`}
        disabled={!!error}
      >
        <div className={audioButtonContent}>
          <div className={audioIcon}>
            {isPlaying ? <Pause size={18} strokeWidth={2} /> : <Play size={18} strokeWidth={2} />}
          </div>
          <span className={audioText}>
            {error ? 'Audio Unavailable' : 'Listen to Audio Version'}
          </span>
        </div>
      </button>

      {isMounted && duration > 0 && !error && (
        <div className={progressWrapper}>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleRangeChange}
            className={progressBar}
            style={{ '--progress': `${progressPercentage}%` } as React.CSSProperties}
            aria-label="Audio progress"
          />
          <div className={timeDisplay}>
            <span className={currentTimeSpan}>{formatTime(currentTime)}</span>
            <span className={durationSpan}>{formatTime(duration)}</span>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default AudioButton;

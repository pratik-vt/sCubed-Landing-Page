'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface UseIOSAudioOptions {
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
}

interface UseIOSAudioReturn {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  isInitialized: boolean;
  error: string | null;
  currentTime: number;
  duration: number;
  togglePlay: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
}

/**
 * Custom hook for handling iOS-compatible audio playback
 * Addresses iOS Safari audio policy restrictions and silent mode issues
 */
export const useIOSAudio = (options: UseIOSAudioOptions = {}): UseIOSAudioReturn => {
  const { onPlay, onPause, onEnded, onError } = options;
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Detect iOS devices (including iPad with touch)
  const isIOS = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    // Check for iPhone, iPad, iPod
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return true;
    }
    
    // Check for iPad Pro with Magic Keyboard (appears as Mac with touch)
    if (navigator.userAgent.includes('Mac') && 'ontouchend' in document) {
      return true;
    }
    
    return false;
  }, []);

  // Initialize audio context for iOS
  const initializeAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || isInitialized) return;

    try {
      if (isIOS()) {
        // Set volume to maximum for iOS
        audio.volume = 1.0;

        // For iOS, we need to play briefly to unlock the audio context
        // This must happen in response to a user gesture
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          audio.pause();
          audio.currentTime = 0;
        }
      }

      setIsInitialized(true);
      setError(null);
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      const errorMessage = error instanceof Error ? error.message : 'Audio initialization failed';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [isInitialized, isIOS, onError]);

  // Play audio
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      // Initialize audio on first play (especially important for iOS)
      if (!isInitialized) {
        await initializeAudio();
      }

      // Ensure volume is set for iOS
      if (isIOS()) {
        audio.volume = 1.0;
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        setError(null);
        onPlay?.();
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Playback failed';
      setError(errorMessage);
      setIsPlaying(false);
      onError?.(errorMessage);
    }
  }, [isInitialized, initializeAudio, isIOS, onPlay, onError]);

  // Pause audio
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  // Stop audio (pause and reset to beginning)
  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  // Toggle play/pause
  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, pause, play]);

  // Seek to a specific time
  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Clamp the time between 0 and duration
    const clampedTime = Math.max(0, Math.min(time, audio.duration || 0));
    audio.currentTime = clampedTime;
    setCurrentTime(clampedTime);
  }, []);

  // Set up event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      const errorMessage = 'Failed to load audio';
      setError(errorMessage);
      setIsPlaying(false);
      onError?.(errorMessage);
    };

    const handleCanPlay = () => {
      setError(null);
      // Check duration when can play
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleCanPlayThrough = () => {
      // Check duration when can play through
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadStart = () => {
      setError(null);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Also check duration during time updates
      if (!duration && audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleDurationChange = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedData = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    // Add event listeners
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadeddata', handleLoadedData);

    // Force load metadata only if needed
    if (audio.src && (!audio.duration || !isFinite(audio.duration) || audio.duration === 0)) {
      audio.load();
    }

    // Check duration with a small delay to ensure metadata is loaded
    const checkDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    // Check immediately
    checkDuration();

    // Check multiple times with increasing delays to catch duration when available
    const timeout1 = setTimeout(checkDuration, 50);
    const timeout2 = setTimeout(checkDuration, 100);
    const timeout3 = setTimeout(checkDuration, 200);
    const timeout4 = setTimeout(checkDuration, 500);
    const timeout5 = setTimeout(checkDuration, 1000);
    const timeout6 = setTimeout(checkDuration, 2000);

    // Cleanup
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      clearTimeout(timeout5);
      clearTimeout(timeout6);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onEnded, onError]);

  return {
    audioRef,
    isPlaying,
    isInitialized,
    error,
    currentTime,
    duration,
    togglePlay,
    play,
    pause,
    stop,
    seek,
  };
};

export default useIOSAudio;

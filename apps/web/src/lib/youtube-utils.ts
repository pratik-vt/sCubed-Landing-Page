/**
 * YouTube URL Detection and Utilities
 * Supports various YouTube URL formats and extracts video IDs
 */

/**
 * YouTube URL patterns:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - http://youtube.com/watch?v=VIDEO_ID (and variations)
 */
const YOUTUBE_REGEX = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

/**
 * Checks if a URL is a YouTube video URL
 * @param url - The URL to check
 * @returns true if the URL is a YouTube video URL
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    // Handle both absolute and relative URLs
    const urlString = url.toLowerCase();
    return (
      urlString.includes('youtube.com/watch') ||
      urlString.includes('youtu.be/') ||
      urlString.includes('youtube.com/embed/')
    );
  } catch {
    return false;
  }
}

/**
 * Extracts the video ID from a YouTube URL
 * @param url - The YouTube URL
 * @returns The video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  try {
    const match = url.match(YOUTUBE_REGEX);
    if (match && match[1]) {
      return match[1];
    }

    // Fallback: try to extract from query parameter
    const urlObj = new URL(url);
    if (urlObj.searchParams.has('v')) {
      return urlObj.searchParams.get('v');
    }
  } catch {
    // If URL parsing fails, try regex only
    const match = url.match(YOUTUBE_REGEX);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Generates a YouTube embed URL from a video ID
 * @param videoId - The YouTube video ID
 * @param options - Optional embed parameters
 * @returns The embed URL
 */
export function getYouTubeEmbedUrl(
  videoId: string,
  options: {
    autoplay?: boolean;
    privacyMode?: boolean;
    startTime?: number;
    showControls?: boolean;
  } = {}
): string {
  const {
    autoplay = false,
    privacyMode = true,
    startTime,
    showControls = true,
  } = options;

  const domain = privacyMode
    ? 'https://www.youtube-nocookie.com'
    : 'https://www.youtube.com';
  
  const params = new URLSearchParams();
  
  if (autoplay) {
    params.append('autoplay', '1');
  }
  
  if (startTime) {
    params.append('start', startTime.toString());
  }
  
  if (!showControls) {
    params.append('controls', '0');
  }

  const queryString = params.toString();
  return `${domain}/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Generates a YouTube thumbnail URL from a video ID
 * @param videoId - The YouTube video ID
 * @param quality - Thumbnail quality (default, medium, high, maxres)
 * @returns The thumbnail URL
 */
export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'
): string {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}


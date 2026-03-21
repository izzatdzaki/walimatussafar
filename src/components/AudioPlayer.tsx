'use client';

import { useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export default function AudioPlayer() {
  const { isPlaying, toggle, play } = useAudioPlayer();

  useEffect(() => {
    play();
  }, [play]);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white text-gold-dark
                 shadow-lg shadow-black/10 flex items-center justify-center
                 hover:bg-cream transition-all duration-300 cursor-pointer
                 border border-gold/30"
      aria-label={isPlaying ? 'Pause musik' : 'Putar musik'}
      title={isPlaying ? 'Pause musik' : 'Putar musik'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}

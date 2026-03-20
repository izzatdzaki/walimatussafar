'use client';

import { useState } from 'react';
import { BISMILLAH_TEXT } from '@/lib/constants';
import IslamicOrnament from './IslamicOrnament';

const COVER_STAR_COUNT = 20;
const LANTERN_COUNT = 5;

interface CoverOverlayProps {
  guestName: string;
  onOpen: () => void;
}

export default function CoverOverlay({ guestName, onOpen }: CoverOverlayProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleOpen = () => {
    setIsClosing(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center cover-gradient text-white transition-all duration-700 ${
        isClosing ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Decorative stars — positions defined in globals.css */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: COVER_STAR_COUNT }, (_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gold rounded-full cover-star-${i}`}
          />
        ))}
      </div>

      {/* Hanging lanterns — positions defined in globals.css */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '120px' }}>
        {Array.from({ length: LANTERN_COUNT }, (_, i) => (
          <div
            key={`lantern-${i}`}
            className={`absolute cover-lantern-${i}`}
            style={{ transformOrigin: 'top center' }}
          >
            <IslamicOrnament variant="lantern" color="var(--gold)" className="animate-glow-pulse" />
          </div>
        ))}
      </div>

      {/* Crescent + star — top right with glow & float */}
      <div className="absolute top-12 right-6 md:right-12 animate-float" style={{ animation: 'float 4s ease-in-out infinite, glow-pulse 3s ease-in-out infinite' }}>
        <IslamicOrnament variant="crescent-star" color="var(--gold)" className="w-16 h-16 md:w-20 md:h-20" />
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-4 left-4 opacity-40">
        <IslamicOrnament variant="corner" color="var(--gold)" />
      </div>
      <div className="absolute top-4 right-4 opacity-40 -scale-x-100">
        <IslamicOrnament variant="corner" color="var(--gold)" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-40 -scale-y-100">
        <IslamicOrnament variant="corner" color="var(--gold)" />
      </div>
      <div className="absolute bottom-4 right-4 opacity-40 -scale-x-100 -scale-y-100">
        <IslamicOrnament variant="corner" color="var(--gold)" />
      </div>

      {/* Mosque silhouette at bottom */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none opacity-20">
        <IslamicOrnament variant="mosque-silhouette" color="var(--gold)" className="w-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-md animate-fade-in">
        {/* Bismillah */}
        <p className="font-arabic text-2xl md:text-3xl text-gold mb-6 leading-relaxed">
          {BISMILLAH_TEXT}
        </p>

        <IslamicOrnament variant="divider" color="var(--gold)" />

        {/* Title */}
        <h1 className="font-heading text-2xl md:text-3xl mt-6 mb-2 animate-shimmer tracking-wider">
          Walimatussafar
        </h1>
        <p className="text-sm md:text-base text-gold-light/80 font-heading mb-8">
          Syukuran Keberangkatan Ibadah Haji
        </p>

        {/* Guest name */}
        <p className="text-sm text-white/60 mb-1">Kepada Yth.</p>
        <p className="font-heading text-2xl md:text-3xl text-white mb-8">
          {guestName}
        </p>

        <IslamicOrnament variant="divider" color="var(--gold)" />

        {/* Open button — btn-elegant */}
        <button
          onClick={handleOpen}
          className="btn-elegant mt-8 animate-pulse-gold"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

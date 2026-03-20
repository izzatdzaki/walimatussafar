'use client';

import { DOA_TEXT, EVENT_INFO } from '@/lib/constants';
import IslamicOrnament from './IslamicOrnament';
import ScrollAnimator from './ScrollAnimator';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 bg-navy-dark text-white text-center overflow-hidden">
      {/* Mosque skyline at top */}
      <div className="absolute top-0 inset-x-0 pointer-events-none opacity-15">
        <IslamicOrnament variant="mosque-silhouette" color="var(--gold)" className="w-full" />
      </div>

      {/* Floating Kaaba ornament */}
      <div className="absolute top-20 right-6 opacity-10 animate-float pointer-events-none">
        <IslamicOrnament variant="kaaba" color="white" className="w-14 h-14" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        <ScrollAnimator>
          <p className="font-arabic text-lg md:text-xl text-gold leading-relaxed mb-4 mt-10">
            {DOA_TEXT}
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={100}>
          <IslamicOrnament variant="divider" color="var(--gold)" />
        </ScrollAnimator>

        <ScrollAnimator delay={200} variant="left">
          <p className="text-white/70 text-sm mt-6 leading-relaxed max-w-sm mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={300} variant="right">
          <div className="mt-8">
            <p className="text-gold font-heading text-lg">Wassalamu&apos;alaikum Wr. Wb.</p>
            <div className="mt-4 space-y-1">
              {EVENT_INFO.hostNames.map((name) => (
                <p key={name} className="text-white/80 text-sm">{name}</p>
              ))}
            </div>
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={400} variant="scale">
          <IslamicOrnament variant="kaaba" color="white" className="mx-auto mt-10 w-12 h-12" />
          <p className="text-white/30 text-xs mt-6">
            Undangan Digital Walimatussafar
          </p>
        </ScrollAnimator>
      </div>

      {/* Bottom arch pattern */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg className="w-full h-6" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path
            d="M0 24 Q50 0 100 24 Q150 0 200 24 Q250 0 300 24 Q350 0 400 24"
            stroke="var(--gold)"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
        </svg>
      </div>
    </footer>
  );
}

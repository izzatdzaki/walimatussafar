'use client';

import { DOA_TEXT, EVENT_INFO } from '@/lib/constants';
import IslamicOrnament from './IslamicOrnament';
import ScrollAnimator from './ScrollAnimator';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 bg-white text-text-dark text-center overflow-hidden">
      {/* Mosque skyline at top */}
      <div className="absolute top-0 inset-x-0 pointer-events-none opacity-15">
        <IslamicOrnament variant="mosque-silhouette" color="var(--gold)" className="w-full" />
      </div>

      {/* Floating Kaaba ornament */}
      <div className="absolute top-20 right-6 opacity-10 animate-float pointer-events-none">
        <IslamicOrnament variant="kaaba" className="w-14 h-14" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        <ScrollAnimator>
          <p className="font-arabic text-lg md:text-xl text-gold-dark leading-relaxed mb-4 mt-10">
            {DOA_TEXT}
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={100}>
          <IslamicOrnament variant="divider" color="var(--gold)" />
        </ScrollAnimator>

        <ScrollAnimator delay={200} variant="left">
          <p className="text-text-medium text-sm mt-6 leading-relaxed max-w-sm mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={300} variant="right">
          <div className="mt-8">
            <p className="text-gold-dark font-heading text-lg">Wassalamu&apos;alaikum Wr. Wb.</p>
            <div className="mt-4 space-y-1">
              {EVENT_INFO.hostNames.map((name) => (
                <p key={name} className="text-text-medium text-sm">{name}</p>
              ))}
            </div>
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={400} variant="scale">
          <IslamicOrnament variant="kaaba" className="mx-auto mt-10 w-12 h-12" />
            <a 
            href="https://www.instagram.com/inviteya.dig/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-light text-xs mt-6 hover:text-gold transition-colors inline-block"
            >
            @inviteya.dig
            </a>
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

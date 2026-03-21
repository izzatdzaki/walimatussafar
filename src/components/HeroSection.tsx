'use client';

import { BISMILLAH_TEXT, EVENT_INFO } from '@/lib/constants';
import IslamicOrnament from './IslamicOrnament';
import ScrollAnimator from './ScrollAnimator';

const HERO_STAR_COUNT = 12;

interface HeroSectionProps {
  guestName: string;
}

export default function HeroSection({ guestName }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-navy text-text-dark py-20 px-6 overflow-hidden geometric-overlay">
      {/* Decorative arch frame (thin gold) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          className="w-[90%] max-w-lg h-[85%] opacity-[0.07]"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M30 400 L30 140 Q30 30 150 30 Q270 30 270 140 L270 400"
            stroke="var(--gold)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M50 400 L50 155 Q50 55 150 55 Q250 55 250 155 L250 400"
            stroke="var(--gold)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Background decoration — positions defined in globals.css */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: HERO_STAR_COUNT }, (_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gold/30 rounded-full hero-star-${i}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <ScrollAnimator>
          {/* Bismillah */}
          <p className="font-arabic text-xl md:text-2xl text-gold-dark mb-6 leading-relaxed">
            {BISMILLAH_TEXT}
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={100}>
          <IslamicOrnament variant="divider" color="var(--gold)" />
        </ScrollAnimator>

        <ScrollAnimator delay={200}>
          <p className="text-text-medium text-sm mt-6 mb-3">
            Dengan memohon Rahmat dan Ridho Allah SWT
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={300}>
          {/* Nama Tuan Rumah */}
          <div className="my-6">
            {EVENT_INFO.hostNames.map((name, i) => (
              <div key={i}>
                <h2 className="font-heading text-2xl md:text-3xl text-gold-dark">
                  {name}
                </h2>
                {i < EVENT_INFO.hostNames.length - 1 && (
                  <p className="text-text-light text-sm my-2">&</p>
                )}
              </div>
            ))}
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={400} variant="scale">
          {/* Kaaba SVG centerpiece */}
          <div className="flex justify-center my-6">
            <IslamicOrnament variant="kaaba" className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={500}>
          {/* Judul Acara */}
          <h1 className="font-heading text-3xl md:text-5xl animate-shimmer mb-3">
            {EVENT_INFO.eventTitle}
          </h1>
          <p className="text-gold-dark/80 text-base md:text-lg font-heading">
            {EVENT_INFO.eventSubtitle}
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={600}>
          <IslamicOrnament variant="divider" color="var(--gold)" />

          <p className="text-text-medium text-sm mt-6">
            Mengundang kehadiran Bapak/Ibu/Saudara/i
          </p>
          <p className="font-heading text-xl md:text-2xl text-text-dark mt-2">
            {guestName}
          </p>
          <p className="text-text-light text-sm mt-2">
            untuk menghadiri acara syukuran kami
          </p>
        </ScrollAnimator>
      </div>
    </section>
  );
}

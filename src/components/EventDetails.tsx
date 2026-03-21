'use client';

import { EVENT_INFO } from '@/lib/constants';
import IslamicOrnament from './IslamicOrnament';
import ScrollAnimator from './ScrollAnimator';

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-12 h-12 mx-auto mb-3">
      {/* Rotating dashed gold border */}
      <div
        className="absolute inset-0 rounded-full border border-dashed border-gold/50"
        style={{ animation: 'spin-slow 12s linear infinite' }}
      />
      <div className="absolute inset-1 rounded-full bg-gold/10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function CardArch({ children, delay, variant }: { children: React.ReactNode; delay?: number; variant?: 'left' | 'right' | 'up' }) {
  return (
    <ScrollAnimator delay={delay} variant={variant}>
      <div className="relative bg-white rounded-xl overflow-hidden border border-gold/20 shadow-sm">
        {/* Arch SVG header (dome) */}
        <div className="w-full h-3 relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0 12 Q100 0 200 12 L200 0 L0 0 Z" fill="rgba(212,175,55,0.15)" />
          </svg>
        </div>
        <div className="p-6 text-center">
          {children}
        </div>
      </div>
    </ScrollAnimator>
  );
}

export default function EventDetails() {
  return (
    <section className="py-16 px-6 bg-gradient-navy text-text-dark geometric-overlay">
      <div className="relative z-10 max-w-lg mx-auto text-center">
        <ScrollAnimator>
          <IslamicOrnament variant="border-top" color="var(--gold)" />
          <h2 className="font-heading text-2xl md:text-3xl text-gold-dark mt-4 mb-2">
            Detail Acara
          </h2>
          <p className="text-text-light text-sm mb-10">
            Insya Allah akan dilaksanakan pada
          </p>
        </ScrollAnimator>

        <div className="space-y-6">
          {/* Tanggal */}
          <CardArch delay={100} variant="left">
            <IconCircle>
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </IconCircle>
            <h3 className="font-heading text-lg text-gold-dark mb-2">Tanggal</h3>
            <p className="text-text-dark text-lg font-heading">{EVENT_INFO.dateFormatted}</p>
            <p className="text-gold-dark/70 text-sm mt-1 font-arabic">{EVENT_INFO.dateHijri}</p>
          </CardArch>

          {/* Waktu */}
          <CardArch delay={200} variant="right">
            <IconCircle>
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </IconCircle>
            <h3 className="font-heading text-lg text-gold-dark mb-2">Waktu</h3>
            <p className="text-text-dark text-lg">{EVENT_INFO.time}</p>
          </CardArch>

          {/* Tempat */}
          <CardArch delay={300} variant="left">
            <IconCircle>
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </IconCircle>
            <h3 className="font-heading text-lg text-gold-dark mb-2">Tempat</h3>
            <p className="text-text-dark text-lg font-heading">{EVENT_INFO.venue}</p>
            <p className="text-text-medium text-sm mt-2 leading-relaxed">{EVENT_INFO.address}</p>
          </CardArch>
        </div>
      </div>
    </section>
  );
}

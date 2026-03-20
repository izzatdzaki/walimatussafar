'use client';

import { EVENT_INFO } from '@/lib/constants';
import ScrollAnimator from './ScrollAnimator';

export default function GoogleMap() {
  return (
    <section className="py-16 px-6 bg-cream">
      <div className="max-w-lg mx-auto">
        <ScrollAnimator>
          <h2 className="font-heading text-2xl md:text-3xl text-navy text-center mb-2">
            Lokasi Acara
          </h2>
          <p className="text-navy/60 text-sm text-center mb-8">
            Petunjuk arah menuju lokasi
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={200}>
          <div className="card-ornate overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                src={EVENT_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Acara"
                className="w-full h-full"
              />
            </div>
            <div className="p-4 text-center">
              <a
                href={EVENT_INFO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-navy text-gold font-heading
                           rounded-full hover:bg-navy-light transition-colors duration-300 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Buka di Google Maps
              </a>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}

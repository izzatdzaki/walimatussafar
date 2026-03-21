'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { EVENT_INFO } from '@/lib/constants';
import IslamicOrnament from './IslamicOrnament';
import ScrollAnimator from './ScrollAnimator';

export default function CountdownTimer() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(EVENT_INFO.date);

  const items = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ];

  return (
    <section className="py-16 px-6 bg-cream">
      <div className="max-w-lg mx-auto text-center">
        <ScrollAnimator>
          {/* Crescent-star ornament above title */}
          <div className="flex justify-center mb-4">
            <IslamicOrnament variant="crescent-star" color="var(--gold)" className="w-10 h-10" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-text-dark mb-2">
            Hitung Mundur
          </h2>
        </ScrollAnimator>

        {isExpired ? (
          <ScrollAnimator delay={200}>
            <div className="card-ornate-islamic p-8">
              <p className="font-heading text-xl text-gold">
                Acara Telah Berlangsung
              </p>
              <p className="text-text-light text-sm mt-2">
                Jazakumullahu khairan atas doa dan kehadirannya
              </p>
            </div>
          </ScrollAnimator>
        ) : (
          <ScrollAnimator delay={200} variant="scale">
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {items.map((item, i) => (
                <div
                  key={item.label}
                  className="countdown-box p-4 md:p-6 flex flex-col items-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="font-heading text-3xl md:text-5xl text-gold-dark font-bold tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs md:text-sm text-text-light mt-1 font-body">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        )}
      </div>
    </section>
  );
}

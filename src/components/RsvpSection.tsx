'use client';

import { useState } from 'react';
import clsx from 'clsx';
import IslamicOrnament from './IslamicOrnament';
import ScrollAnimator from './ScrollAnimator';

type AttendanceType = 'hadir' | 'tidak_hadir' | 'belum_pasti' | null;

export default function RsvpSection() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<AttendanceType>(null);
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;

    // In production, this would send to an API
    console.log('RSVP:', { name: name.trim(), attendance, guests });
    setSubmitted(true);
  };

  const attendanceOptions = [
    { value: 'hadir' as const, label: 'Hadir', icon: '✓' },
    { value: 'tidak_hadir' as const, label: 'Tidak Hadir', icon: '✕' },
    { value: 'belum_pasti' as const, label: 'Belum Pasti', icon: '?' },
  ];

  if (submitted) {
    return (
      <section className="py-16 px-6 bg-gradient-navy text-white geometric-overlay">
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <ScrollAnimator>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-gold/20">
              <div className="text-4xl mb-4">✦</div>
              <h3 className="font-heading text-xl text-gold mb-2">
                Jazakumullahu Khairan
              </h3>
              <p className="text-white/70 text-sm">
                Konfirmasi kehadiran Anda telah kami terima.
                {attendance === 'hadir' && ' Kami menantikan kehadiran Anda.'}
                {attendance === 'tidak_hadir' && ' Semoga lain waktu bisa bertemu.'}
                {attendance === 'belum_pasti' && ' Kami tetap mendoakan kehadiran Anda.'}
              </p>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-navy text-white geometric-overlay">
      <div className="relative z-10 max-w-lg mx-auto">
        <ScrollAnimator>
          <div className="flex justify-center mb-3">
            <IslamicOrnament variant="lantern" color="var(--gold)" className="w-6 h-12 opacity-50" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-gold text-center mb-2">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-white/60 text-sm text-center mb-8">
            Mohon konfirmasi kehadiran Anda
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={200}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20"
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="rsvp-name" className="block text-sm text-gold mb-1.5">
                  Nama
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-gold/30
                             text-white placeholder:text-white/30 focus:outline-none
                             focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors"
                  required
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-sm text-gold mb-2">Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  {attendanceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAttendance(opt.value)}
                      className={clsx(
                        'py-2.5 px-3 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer',
                        attendance === opt.value
                          ? 'bg-gold text-navy-dark border-gold'
                          : 'bg-transparent text-white/70 border-gold/30 hover:border-gold/60'
                      )}
                    >
                      <span className="block text-lg mb-0.5">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of guests */}
              {attendance === 'hadir' && (
                <div className="animate-fade-in">
                  <label htmlFor="rsvp-guests" className="block text-sm text-gold mb-1.5">
                    Jumlah Tamu
                  </label>
                  <select
                    id="rsvp-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-gold/30
                               text-white focus:outline-none focus:border-gold focus:ring-1
                               focus:ring-gold/50 transition-colors"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} className="bg-navy text-white">
                        {n} Orang
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!name.trim() || !attendance}
                className={clsx(
                  'w-full py-2.5 rounded-lg font-heading transition-all duration-300 cursor-pointer',
                  name.trim() && attendance
                    ? 'bg-gold text-navy-dark hover:bg-gold-light'
                    : 'bg-gold/30 text-white/30 cursor-not-allowed'
                )}
              >
                Kirim Konfirmasi
              </button>
            </div>
          </form>
        </ScrollAnimator>
      </div>
    </section>
  );
}

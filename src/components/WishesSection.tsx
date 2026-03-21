'use client';

import { useState, useEffect, useCallback } from 'react';
import { WishItem } from '@/lib/types';
import IslamicOrnament from './IslamicOrnament';
import ScrollAnimator from './ScrollAnimator';

const STORAGE_KEY = 'walimatussafar-wishes';

function loadWishes(): WishItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as WishItem[];
    }
  } catch {
    // localStorage not available or corrupted
  }
  return [];
}

function saveWishes(wishes: WishItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch {
    // localStorage full or not available
  }
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    setWishes(loadWishes());
    setMounted(true);
  }, []);

  const updateWishes = useCallback((updater: (prev: WishItem[]) => WishItem[]) => {
    setWishes((prev) => {
      const next = updater(prev);
      saveWishes(next);
      return next;
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishItem = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    updateWishes((prev) => [newWish, ...prev]);
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const formatTime = (ts: number) => {
    if (!mounted) return '';
    const diff = Date.now() - ts;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  return (
    <section className="py-16 px-6 bg-cream">
      <div className="max-w-lg mx-auto">
        <ScrollAnimator>
          <div className="flex justify-center mb-3">
            <IslamicOrnament variant="crescent-star" color="var(--gold)" className="w-8 h-8 opacity-60" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-text-dark text-center mb-2">
            Doa & Ucapan
          </h2>
          <p className="text-text-light text-sm text-center mb-8">
            Kirimkan doa terbaik untuk calon jamaah haji
          </p>
        </ScrollAnimator>

        {/* Form */}
        <ScrollAnimator delay={100}>
          <form onSubmit={handleSubmit} className="card-ornate-islamic p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="wish-name" className="block text-sm font-medium text-text-medium mb-1">
                  Nama
                </label>
                <input
                  id="wish-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-2.5 rounded-lg border border-gold/30 bg-cream/50
                             text-text-dark placeholder:text-text-light focus:outline-none focus:border-gold
                             focus:ring-1 focus:ring-gold/50 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="wish-message" className="block text-sm font-medium text-text-medium mb-1">
                  Doa & Ucapan
                </label>
                <textarea
                  id="wish-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan doa dan ucapan Anda..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gold/30 bg-cream/50
                             text-text-dark placeholder:text-text-light focus:outline-none focus:border-gold
                             focus:ring-1 focus:ring-gold/50 transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gold text-white font-heading rounded-lg
                           hover:bg-gold-dark transition-colors duration-300 cursor-pointer"
              >
                Kirim Doa
              </button>
            </div>

            {submitted && (
              <p className="text-center text-green-700 text-sm mt-3 animate-fade-in">
                Jazakallahu khairan, doa Anda telah terkirim!
              </p>
            )}
          </form>
        </ScrollAnimator>

        {/* Wishes list */}
        <div className="space-y-4">
          {wishes.map((wish, i) => (
            <ScrollAnimator key={wish.id} delay={200 + i * 100}>
              <div className="card-ornate-islamic p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                      <span className="text-white text-sm font-heading">
                        {wish.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-heading text-text-dark text-sm">{wish.name}</span>
                  </div>
                  <span className="text-text-light text-xs">{formatTime(wish.timestamp)}</span>
                </div>
                <p className="text-text-medium text-sm leading-relaxed pl-10">
                  {wish.message}
                </p>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        <ScrollAnimator delay={400}>
          <IslamicOrnament variant="divider" color="var(--gold)" className="mt-8" />
        </ScrollAnimator>
      </div>
    </section>
  );
}

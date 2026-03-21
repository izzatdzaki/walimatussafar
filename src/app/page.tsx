'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_GUEST_NAME } from '@/lib/constants';
import CoverOverlay from '@/components/CoverOverlay';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import EventDetails from '@/components/EventDetails';
import GoogleMap from '@/components/GoogleMap';
import WishesSection from '@/components/WishesSection';

import AudioPlayer from '@/components/AudioPlayer';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || DEFAULT_GUEST_NAME;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <CoverOverlay guestName={guestName} onOpen={() => setIsOpen(true)} />
      )}

      <main
        className={`flex-1 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <HeroSection guestName={guestName} />
        <SectionDivider topColor="#ffffff" bottomColor="var(--cream)" />
        <CountdownTimer />
        <SectionDivider topColor="var(--cream)" bottomColor="#ffffff" />
        <EventDetails />
        <SectionDivider topColor="#ffffff" bottomColor="var(--cream)" />
        <GoogleMap />
        <SectionDivider topColor="var(--cream)" bottomColor="var(--cream)" />
        <WishesSection />
        <SectionDivider topColor="var(--cream)" bottomColor="#ffffff" />
        <Footer />
      </main>

      {isOpen && <AudioPlayer />}
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-gold-dark text-sm font-heading">Memuat undangan...</p>
          </div>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}

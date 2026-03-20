'use client';

import { useScrollAnimation, ScrollVariant } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface ScrollAnimatorProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollVariant;
}

export default function ScrollAnimator({ children, className = '', delay, variant = 'up' }: ScrollAnimatorProps) {
  const ref = useScrollAnimation<HTMLDivElement>(variant);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

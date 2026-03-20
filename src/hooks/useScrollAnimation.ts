'use client';

import { useEffect, useRef } from 'react';

export type ScrollVariant = 'up' | 'left' | 'right' | 'scale';

const variantClassMap: Record<ScrollVariant, string> = {
  up: 'scroll-hidden',
  left: 'scroll-hidden-left',
  right: 'scroll-hidden-right',
  scale: 'scroll-hidden-scale',
};

export function useScrollAnimation<T extends HTMLElement>(variant: ScrollVariant = 'up') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const hiddenClass = variantClassMap[variant];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            entry.target.classList.remove(hiddenClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    element.classList.add(hiddenClass);
    observer.observe(element);

    return () => observer.disconnect();
  }, [variant]);

  return ref;
}

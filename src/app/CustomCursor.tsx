'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function CustomCursor() {
  const pathname = usePathname();
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Toggle cursor:none on <html> so the Studio is never affected
  useEffect(() => {
    const isStudio = pathname.startsWith('/studio');
    if (isStudio) {
      document.documentElement.classList.remove('custom-cursor-active');
    } else {
      document.documentElement.classList.add('custom-cursor-active');
    }
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [pathname]);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0, overwrite: true });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out', overwrite: true });
    };

    const onEnterLink = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: 0.25, ease: 'power2.out' });

      const onMagnet = (ev: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        const dx = ev.clientX - (rect.left + rect.width / 2);
        const dy = ev.clientY - (rect.top  + rect.height / 2);
        gsap.to(target, { x: dx * 0.35, y: dy * 0.35, duration: 0.3, ease: 'power2.out' });
      };

      const onLeaveLink = () => {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
        gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        target.removeEventListener('mousemove', onMagnet);
        target.removeEventListener('mouseleave', onLeaveLink);
      };

      target.addEventListener('mousemove', onMagnet);
      target.addEventListener('mouseleave', onLeaveLink);
    };

    const attachMagnetics = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink as EventListener);
      });
    };

    window.addEventListener('mousemove', onMove);
    attachMagnetics();

    const observer = new MutationObserver(attachMagnetics);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  // Don't render on the Studio route
  if (pathname.startsWith('/studio')) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ backgroundColor: 'white' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}

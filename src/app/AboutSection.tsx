'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portraitImage =
  'https://www.figma.com/api/mcp/asset/f1221c93-0ddb-4789-9b32-ba541d2d65d1';

const bioText =
  'Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.';

const CornerTL = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" />
  </svg>
);
const CornerTR = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" />
  </svg>
);
const CornerBL = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" />
  </svg>
);
const CornerBR = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" />
  </svg>
);

function BracketedText() {
  return (
    <div className="flex gap-1">
      <div className="flex flex-col justify-between w-4 shrink-0">
        <CornerTL />
        <CornerBL />
      </div>
      <div className="flex items-center py-3 flex-1">
        <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          {bioText}
        </p>
      </div>
      <div className="flex flex-col justify-between w-4 shrink-0">
        <CornerTR />
        <CornerBR />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const desktopPortraitRef = useRef<HTMLDivElement>(null);
  const desktopOverlayRef = useRef<HTMLDivElement>(null);
  const mobilePortraitRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pairs = [
      { trigger: desktopPortraitRef.current, overlay: desktopOverlayRef.current },
      { trigger: mobilePortraitRef.current,  overlay: mobileOverlayRef.current  },
    ];

    pairs.forEach(({ trigger, overlay }) => {
      if (!trigger || !overlay) return;
      gsap.fromTo(
        overlay,
        { x: '0%' },
        {
          x: '101%',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger,
            start: 'top 75%',
            once: true,
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[80px]">

      {/* Desktop */}
      <div className="hidden md:flex items-start justify-between w-full">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
          [ About ]
        </p>

        <div className="flex gap-8 items-end flex-1 min-w-0 max-w-[983px]">
          <div className="flex-1 min-w-0">
            <BracketedText />
          </div>
          <div className="flex gap-4 items-start shrink-0">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              002
            </p>
            <div
              ref={desktopPortraitRef}
              className="md:w-[260px] md:h-[366px] lg:w-[436px] lg:h-[614px] overflow-hidden shrink-0 relative"
            >
              <img src={portraitImage} alt="Portrait" className="w-full h-full object-cover" />
              <div ref={desktopOverlayRef} className="absolute inset-0 bg-black z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>
        <BracketedText />
        <div ref={mobilePortraitRef} className="w-full aspect-[422/594] overflow-hidden relative">
          <img src={portraitImage} alt="Portrait" className="w-full h-full object-cover" />
          <div ref={mobileOverlayRef} className="absolute inset-0 bg-black z-10" />
        </div>
      </div>

    </section>
  );
}

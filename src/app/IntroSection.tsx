'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textCls =
  'font-light uppercase tracking-[-0.08em] leading-[0.84] ' +
  'text-[8.5vw] md:text-[6.67vw]';

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const lines = section.querySelectorAll('[data-line]');

    gsap.fromTo(
      lines,
      { color: '#c0c0c0' },
      {
        color: '#111111',
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center 40%',
          scrub: 0.8,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-6 w-full">

        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 10+ years in industry ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        <div className="flex flex-col items-center gap-2 md:items-start">

          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 md:w-full">
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] md:order-last md:pt-1 shrink-0">
              001
            </p>
            <p data-line className={`${textCls} whitespace-pre`}>
              {`A creative director   /`}
            </p>
          </div>

          <p data-line className={`${textCls} md:w-full md:px-[15.55%]`}>
            Photographer
          </p>

          <p data-line className={`${textCls} md:w-full md:pl-[44.3%]`}>
            {'Born '}
            <span
              className="italic"
              style={{ fontFamily: 'var(--font-playfair)', fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
            >
              &amp;
            </span>
            {' raised'}
          </p>

          <p data-line className={`${textCls} md:w-full`}>
            on the south side
          </p>

          <div className="flex flex-col items-center gap-3 md:flex-row md:items-baseline md:gap-4 md:w-full md:pl-[44%]">
            <p data-line className={textCls}>of chicago.</p>
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
              [ creative freelancer ]
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

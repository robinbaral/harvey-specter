'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';

const articles = [
  {
    img: 'https://www.figma.com/api/mcp/asset/71fe2fbe-6291-427f-be96-7242a487b578',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: 'https://www.figma.com/api/mcp/asset/971f218b-6f7e-4f42-8363-94fa0819c9b3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: 'https://www.figma.com/api/mcp/asset/9204c4ea-de20-4ddb-89e5-3f4a474ac2aa',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

function ReadMoreLink() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2 border-b border-black pb-1 text-[14px] font-medium text-black tracking-[-0.04em] self-start hover:opacity-60 transition-opacity"
    >
      Read more
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="14" x2="14" y2="4" />
        <polyline points="8,4 14,4 14,10" />
      </svg>
    </a>
  );
}

function SliderControls({
  current,
  total,
  onPrev,
  onNext,
  onDot,
  dark = false,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  dark?: boolean;
}) {
  const base = dark ? 'border-white/40 hover:border-white text-white' : 'border-black/30 hover:border-black text-black';
  const dotActive = dark ? 'bg-white' : 'bg-black';
  const dotInactive = dark ? 'bg-white/30' : 'bg-black/30';

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex gap-2 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            className={`h-[2px] transition-all duration-300 cursor-pointer rounded-full ${i === current ? `w-6 ${dotActive}` : `w-3 ${dotInactive}`}`}
          />
        ))}
        <span className={`ml-3 font-mono text-[12px] tracking-wider opacity-40 ${dark ? 'text-white' : 'text-black'}`}>
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${base}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10,3 5,8 10,13" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${base}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,3 11,8 6,13" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function useSlider(total: number) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    if (animating.current || clamped === current || !trackRef.current) return;
    animating.current = true;
    const containerWidth = trackRef.current.parentElement?.offsetWidth ?? 0;
    gsap.to(trackRef.current, {
      x: -(clamped * containerWidth),
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        animating.current = false;
        setCurrent(clamped);
      },
    });
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  return { current, trackRef, goTo, prev, next };
}

export default function NewsSection() {
  const mobile = useSlider(articles.length);
  const desktop = useSlider(articles.length);

  return (
    <section className="bg-[#f3f3f3]">

      {/* ── Mobile ─────────────────────────────────────────── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <h2 className="font-light text-black uppercase text-[32px] tracking-[-0.08em] leading-[0.86]">
          Keep up with my latest news &amp; achievements
        </h2>

        <div className="overflow-hidden">
          {/* Track: all cards in a row, each 100% wide */}
          <div
            ref={mobile.trackRef}
            className="flex"
            style={{ width: `${articles.length * 100}%` }}
          >
            {articles.map((a, i) => (
              <div
                key={i}
                className="flex flex-col gap-4"
                style={{ width: `${100 / articles.length}%` }}
              >
                <div className="relative w-full overflow-hidden aspect-[300/398]">
                  <img src={a.img} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                </div>
                <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{a.text}</p>
                <ReadMoreLink />
              </div>
            ))}
          </div>
        </div>

        <SliderControls
          current={mobile.current}
          total={articles.length}
          onPrev={mobile.prev}
          onNext={mobile.next}
          onDot={mobile.goTo}
        />
      </div>

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex items-start justify-between px-8 py-[120px]">

        {/* Rotated title */}
        <div className="flex items-center justify-center w-[110px] h-[706px] shrink-0 overflow-hidden">
          <div className="-rotate-90 whitespace-nowrap">
            <p className="font-light text-black uppercase text-[64px] tracking-[-0.08em] leading-[0.86]">
              Keep up with my latest
            </p>
            <p className="font-light text-black uppercase text-[64px] tracking-[-0.08em] leading-[0.86]">
              news &amp; achievements
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="flex flex-col flex-1 ml-12 min-w-0">

          <div className="overflow-hidden">
            {/* Each "slide" shows current article large + next article as faded preview */}
            <div
              ref={desktop.trackRef}
              className="flex"
              style={{ width: `${articles.length * 100}%` }}
            >
              {articles.map((a, i) => (
                <div
                  key={i}
                  className="flex gap-6 pr-6"
                  style={{ width: `${100 / articles.length}%` }}
                >
                  {/* Main card */}
                  <div className="flex flex-col gap-4 flex-[2]">
                    <div className="relative w-full overflow-hidden aspect-[353/469]">
                      <img src={a.img} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                    </div>
                    <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{a.text}</p>
                    <ReadMoreLink />
                  </div>

                  {/* Preview of next */}
                  <div className="flex flex-col gap-4 flex-1 pt-[120px] opacity-35 pointer-events-none">
                    <div className="relative w-full overflow-hidden aspect-[353/469]">
                      <img
                        src={articles[(i + 1) % articles.length].img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                    <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                      {articles[(i + 1) % articles.length].text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SliderControls
            current={desktop.current}
            total={articles.length}
            onPrev={desktop.prev}
            onNext={desktop.next}
            onDot={desktop.goTo}
          />
        </div>
      </div>

    </section>
  );
}

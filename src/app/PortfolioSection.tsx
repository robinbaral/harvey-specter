'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Surfers Paradise',   tags: ['Social Media', 'Photography'], img: 'https://www.figma.com/api/mcp/asset/e373f8fb-f3ff-4de2-a3b5-a9dfee66c7a9' },
  { title: 'Cyberpunk Caffe',    tags: ['Social Media', 'Photography'], img: 'https://www.figma.com/api/mcp/asset/17401e18-08c2-458f-be91-91c0169570d4' },
  { title: 'Agency 976',         tags: ['Social Media', 'Photography'], img: 'https://www.figma.com/api/mcp/asset/55e5c3af-8aa6-4434-825b-12fe9bc65cc6' },
  { title: 'Minimal Playground', tags: ['Social Media', 'Photography'], img: 'https://www.figma.com/api/mcp/asset/9c45316d-d95b-457e-a737-e9fc134083d5' },
];

const ctaText =
  'Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.';

const Arrow = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="23" x2="23" y2="9" />
    <polyline points="14,9 23,9 23,18" />
  </svg>
);

const CornerTL = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" /></svg>);
const CornerTR = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" /></svg>);
const CornerBL = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" /></svg>);
const CornerBR = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.25" strokeLinecap="square" /></svg>);

function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[#111] text-[14px] font-medium tracking-[-0.04em] whitespace-nowrap">
      {label}
    </span>
  );
}

function Card({ title, tags, img, imgH }: { title: string; tags: string[]; img: string; imgH: string }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    gsap.to(cardRef.current,  { y: -6, scale: 1.02, duration: 0.4, ease: 'power2.out' });
    gsap.to(imgRef.current,   { scale: 1.08, duration: 0.6, ease: 'power2.out' });
    gsap.to(arrowRef.current, { x: 4, y: -4, duration: 0.3, ease: 'power2.out' });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current,  { y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    gsap.to(imgRef.current,   { scale: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-[10px] w-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={`relative overflow-hidden flex flex-col justify-end pb-4 pl-4 ${imgH}`}>
        <img
          ref={imgRef}
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ transformOrigin: 'center' }}
        />
        <div className="relative flex gap-3 flex-wrap">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-black text-black uppercase tracking-[-0.04em] leading-[1.1] text-[24px] md:text-[36px]">
          {title}
        </p>
        <span ref={arrowRef} className="shrink-0 text-black"><Arrow /></span>
      </div>
    </div>
  );
}

function CTABlock() {
  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col justify-between w-6 shrink-0"><CornerTL /><CornerBL /></div>
      <div className="flex flex-col gap-[10px] flex-1 py-3">
        <p className="text-[14px] text-[#1f1f1f] italic leading-[1.3] tracking-[-0.04em]">{ctaText}</p>
        <button className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
          Let&apos;s talk
        </button>
      </div>
      <div className="flex flex-col justify-between w-6 shrink-0"><CornerTR /><CornerBR /></div>
    </div>
  );
}

export default function PortfolioSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [p1, p2, p3, p4] = projects;

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const lines = heading.querySelectorAll('[data-work-line]');

    gsap.fromTo(
      lines,
      { color: '#c0c0c0' },
      {
        color: '#111111',
        stagger: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.8,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[80px]">

      {/* Mobile header */}
      <div className="flex flex-col gap-4 mb-8 md:hidden">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ portfolio ]</p>
        <div className="flex items-start justify-between uppercase">
          <div ref={headingRef} className="font-light text-black tracking-[-0.08em]">
            <p data-work-line className="text-[32px] leading-[0.86]">Selected</p>
            <p data-work-line className="text-[32px] leading-[0.86]">Work</p>
          </div>
          <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">004</p>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between mb-[61px]">
        <div className="flex gap-[10px] items-start uppercase whitespace-nowrap">
          <div ref={headingRef} className="font-light text-black tracking-[-0.08em]">
            <p data-work-line className="text-[6.67vw] leading-[0.86]">Selected</p>
            <p data-work-line className="text-[6.67vw] leading-[0.86]">Work</p>
          </div>
          <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] mt-1">004</p>
        </div>
        <div className="flex items-center justify-center w-[15px] h-[110px] shrink-0">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap -rotate-90">[ portfolio ]</p>
        </div>
      </div>

      {/* Mobile grid */}
      <div className="flex flex-col gap-6 md:hidden">
        <Card title={p1.title} tags={p1.tags} img={p1.img} imgH="h-[390px]" />
        <Card title={p2.title} tags={p2.tags} img={p2.img} imgH="h-[390px]" />
        <Card title={p3.title} tags={p3.tags} img={p3.img} imgH="h-[390px]" />
        <Card title={p4.title} tags={p4.tags} img={p4.img} imgH="h-[390px]" />
        <CTABlock />
      </div>

      {/* Desktop grid */}
      <div className="hidden md:flex gap-6 items-end">
        <div className="flex flex-col gap-6 flex-1">
          <Card title={p1.title} tags={p1.tags} img={p1.img} imgH="h-[744px]" />
          <Card title={p2.title} tags={p2.tags} img={p2.img} imgH="h-[699px]" />
          <CTABlock />
        </div>
        <div className="flex flex-col gap-6 flex-1 pt-[240px]">
          <Card title={p3.title} tags={p3.tags} img={p3.img} imgH="h-[699px]" />
          <Card title={p4.title} tags={p4.tags} img={p4.img} imgH="h-[744px]" />
        </div>
      </div>

    </section>
  );
}

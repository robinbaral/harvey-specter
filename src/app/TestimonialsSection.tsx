'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logoUrls = {
  lukas: 'https://www.figma.com/api/mcp/asset/f0f4fe1a-dcfc-4dc6-b95c-56db3a2bcaaf',
  marko: 'https://www.figma.com/api/mcp/asset/ec90afec-e096-488c-8f94-72184d6e5142',
  sarah: 'https://www.figma.com/api/mcp/asset/dd8a19df-76ee-4080-8a81-039be1d605f8',
  sofia: 'https://www.figma.com/api/mcp/asset/f1957009-0af3-4d16-b3af-a5b3113a78da',
};

const cards = [
  {
    logo: logoUrls.lukas, logoW: 137.7, logoH: 19.3,
    quote: 'Professional, precise, and incredibly fast at handling complex product visualizations and templates.',
    author: 'Lukas Weber',
    rotation: 2.9,
    desktopLeft: '47vw', desktopTop: '272px',
  },
  {
    logo: logoUrls.marko, logoW: 142.7, logoH: 19,
    quote: 'A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.',
    author: 'Marko Stojković',
    rotation: -6.85,
    desktopLeft: '7.1vw', desktopTop: '142px',
  },
  {
    logo: logoUrls.sarah, logoW: 108.5, logoH: 30.7,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: 'Sarah Jenkins',
    rotation: 2.23,
    desktopLeft: '21.2vw', desktopTop: '553px',
  },
  {
    logo: logoUrls.sofia, logoW: 81.1, logoH: 36.2,
    quote: 'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.',
    author: 'Sofia Martínez',
    rotation: -4.15,
    desktopLeft: '68.5vw', desktopTop: '546px',
  },
];

function Card({
  logo, logoW, logoH, quote, author, rotation, className = '',
}: {
  logo: string; logoW: number; logoH: number;
  quote: string; author: string; rotation: number; className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) gsap.set(cardRef.current, { rotation });
  }, [rotation]);

  const handleEnter = () => {
    const extra = rotation >= 0 ? 2.5 : -2.5;
    gsap.to(cardRef.current, {
      rotation: rotation + extra,
      scale: 1.04,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotation,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(cardRef.current, {
      x: dx * 0.1,
      y: dy * 0.1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`flex-none ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <div className="bg-[#f1f1f1] border border-[#ddd] flex flex-col gap-4 items-start p-6 rounded-[4px] w-[260px] md:w-[353px]">
        <img src={logo} alt="" style={{ width: logoW, height: logoH }} className="shrink-0 block" />
        <p className="text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{quote}</p>
        <p className="text-[16px] font-black text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">{author}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [c1, c2, c3, c4] = cards;

  return (
    <section className="bg-[#fafafa]">

      {/* Mobile */}
      <div className="md:hidden py-16 flex flex-col gap-8">
        <h2 className="px-4 font-medium text-black capitalize tracking-[-0.07em] leading-[0.8] text-[17vw] text-center w-full">
          Testimonials
        </h2>
        <div className="flex overflow-x-auto gap-4 px-4 pb-2 snap-x snap-mandatory no-scrollbar">
          {cards.map((c, i) => (
            <div key={i} className="shrink-0 snap-center flex items-center justify-center">
              <Card {...c} />
            </div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative h-[987px] overflow-hidden px-8 py-[120px]">
        <div className="absolute" style={{ left: c1.desktopLeft, top: c1.desktopTop }}>
          <Card {...c1} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="font-medium text-black capitalize tracking-[-0.07em] leading-[1.1] text-[13.75vw] text-center w-full">
            Testimonials
          </h2>
        </div>
        <div className="absolute" style={{ left: c2.desktopLeft, top: c2.desktopTop }}>
          <Card {...c2} />
        </div>
        <div className="absolute" style={{ left: c3.desktopLeft, top: c3.desktopTop }}>
          <Card {...c3} />
        </div>
        <div className="absolute" style={{ left: c4.desktopLeft, top: c4.desktopTop }}>
          <Card {...c4} />
        </div>
      </div>

    </section>
  );
}

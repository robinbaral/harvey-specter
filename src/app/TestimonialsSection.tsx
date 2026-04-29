// Desktop: 4 cards absolutely scattered around a large centered "Testimonials" heading.
// Card 1 is behind the heading (earlier in DOM); cards 2-4 are in front (later in DOM).
// Mobile: heading above, all 4 cards stacked with their rotations preserved.

const logoUrls = {
  lukas: 'https://www.figma.com/api/mcp/asset/f0f4fe1a-dcfc-4dc6-b95c-56db3a2bcaaf',
  marko: 'https://www.figma.com/api/mcp/asset/ec90afec-e096-488c-8f94-72184d6e5142',
  sarah: 'https://www.figma.com/api/mcp/asset/dd8a19df-76ee-4080-8a81-039be1d605f8',
  sofia: 'https://www.figma.com/api/mcp/asset/f1957009-0af3-4d16-b3af-a5b3113a78da',
};

const cards = [
  {
    logo: logoUrls.lukas,
    logoW: 137.7, logoH: 19.3,
    quote: 'Professional, precise, and incredibly fast at handling complex product visualizations and templates.',
    author: 'Lukas Weber',
    rotation: 'rotate-[2.9deg]',
    // Desktop: behind the heading (first in DOM)
    desktopLeft: '47vw', desktopTop: '272px',
  },
  {
    logo: logoUrls.marko,
    logoW: 142.7, logoH: 19,
    quote: 'A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.',
    author: 'Marko Stojković',
    rotation: 'rotate-[-6.85deg]',
    desktopLeft: '7.1vw', desktopTop: '142px',
  },
  {
    logo: logoUrls.sarah,
    logoW: 108.5, logoH: 30.7,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: 'Sarah Jenkins',
    rotation: 'rotate-[2.23deg]',
    desktopLeft: '21.2vw', desktopTop: '553px',
  },
  {
    logo: logoUrls.sofia,
    logoW: 81.1, logoH: 36.2,
    quote: 'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.',
    author: 'Sofia Martínez',
    rotation: 'rotate-[-4.15deg]',
    desktopLeft: '68.5vw', desktopTop: '546px',
  },
];

function Card({ logo, logoW, logoH, quote, author, rotation, className = '' }: {
  logo: string; logoW: number; logoH: number;
  quote: string; author: string; rotation: string; className?: string;
}) {
  return (
    <div className={`flex-none ${rotation} ${className}`}>
      <div className="bg-[#f1f1f1] border border-[#ddd] flex flex-col gap-4 items-start p-6 rounded-[4px] w-[260px] md:w-[353px]">
        <img
          src={logo}
          alt=""
          style={{ width: logoW, height: logoH }}
          className="shrink-0 block"
        />
        <p className="text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          {quote}
        </p>
        <p className="text-[16px] font-black text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
          {author}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [c1, c2, c3, c4] = cards;

  return (
    <section className="bg-[#fafafa]">

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden py-16 flex flex-col gap-8">
        <h2 className="px-4 font-medium text-black capitalize tracking-[-0.07em] leading-[0.8] text-[17vw] text-center w-full">
          Testimonials
        </h2>
        {/* Horizontal scroll — peek next card on the right */}
        <div className="flex overflow-x-auto gap-4 px-4 pb-2 snap-x snap-mandatory no-scrollbar">
          {cards.map((c, i) => (
            <div key={i} className="shrink-0 snap-center flex items-center justify-center">
              <Card {...c} />
            </div>
          ))}
          {/* Trailing spacer so last card doesn't sit flush at the edge */}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* ── Desktop ─────────────────────────────────────────── */}
      {/* Fixed height matches Figma. Cards use DOM order for z-stacking:
          card 1 first (behind heading), heading next, cards 2-4 last (in front). */}
      <div className="hidden md:block relative h-[987px] overflow-hidden px-8 py-[120px]">

        {/* Card 1 — behind heading */}
        <div className="absolute" style={{ left: c1.desktopLeft, top: c1.desktopTop }}>
          <Card {...c1} />
        </div>

        {/* Heading — in front of card 1, behind cards 2-4 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="font-medium text-black capitalize tracking-[-0.07em] leading-[1.1] text-[13.75vw] text-center w-full">
            Testimonials
          </h2>
        </div>

        {/* Cards 2-4 — in front of heading */}
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

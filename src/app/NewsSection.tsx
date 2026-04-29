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

// inline-flex + text-black so the link is always visible regardless of inherited color
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

function ArticleCard({ img, text, offset = false }: { img: string; text: string; offset?: boolean }) {
  return (
    <div className={`flex flex-col gap-4 ${offset ? 'pt-[120px]' : ''}`}>
      {/* aspect-[353/469] keeps portrait ratio at any flex card width */}
      <div className="relative w-full overflow-hidden aspect-[353/469]">
        <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </div>
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{text}</p>
      <ReadMoreLink />
    </div>
  );
}

export default function NewsSection() {
  const [a1, a2, a3] = articles;

  return (
    <section className="bg-[#f3f3f3]">

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <h2 className="font-light text-black uppercase text-[32px] tracking-[-0.08em] leading-[0.86]">
          Keep up with my latest news &amp; achievements
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory no-scrollbar -mx-4 px-4">
          {articles.map((a, i) => (
            <div key={i} className="shrink-0 w-[300px] snap-start flex flex-col gap-4">
              <div className="relative w-full overflow-hidden aspect-[300/398]">
                <img src={a.img} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              </div>
              <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{a.text}</p>
              <ReadMoreLink />
            </div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex items-end justify-between px-8 py-[120px]">

        {/* Rotated title — fixed 64px matches Figma exactly.
            overflow-hidden clips the rotated text to the 110×706px box. */}
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

        {/* Three articles with vertical dividers */}
        <div className="flex items-start flex-1 ml-12 min-w-0">

          <div className="flex-1 min-w-0">
            <ArticleCard img={a1.img} text={a1.text} />
          </div>

          <div className="w-px bg-black/20 self-stretch mx-6 shrink-0" />

          <div className="flex-1 min-w-0">
            <ArticleCard img={a2.img} text={a2.text} offset />
          </div>

          <div className="w-px bg-black/20 self-stretch mx-6 shrink-0" />

          <div className="flex-1 min-w-0">
            <ArticleCard img={a3.img} text={a3.text} />
          </div>

        </div>
      </div>

    </section>
  );
}

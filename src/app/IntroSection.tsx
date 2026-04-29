// Desktop: staggered staircase layout with 96px Inter Light, specific per-line left indents.
// Mobile: centered, 32px, all lines stacked vertically.
// Indents expressed as % of container so they scale with viewport width.

const textCls =
  'font-light uppercase tracking-[-0.08em] leading-[0.84] text-black ' +
  'text-[8.5vw] md:text-[6.67vw]';

export default function IntroSection() {
  return (
    <section className="bg-[#fafafa] overflow-hidden px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-6 w-full">

        {/* Top bar */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Text staircase */}
        <div className="flex flex-col items-center gap-2 md:items-start">

          {/* Line 1 — "A creative director / " + "001" */}
          {/* Mobile: 001 on top (DOM order), text below. Desktop: text left, 001 right. */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 md:w-full">
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] md:order-last md:pt-1 shrink-0">
              001
            </p>
            <p className={`${textCls} whitespace-pre`}>
              {`A creative director   /`}
            </p>
          </div>

          {/* Line 2 — "Photographer" — desktop: equal left/right indent (~15.5%) */}
          <p className={`${textCls} md:w-full md:px-[15.55%]`}>
            Photographer
          </p>

          {/* Line 3 — "Born & raised" — desktop: ~44% left indent */}
          <p className={`${textCls} md:w-full md:pl-[44.3%]`}>
            {'Born '}
            <span
              className="italic"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontVariationSettings: "'opsz' 12, 'wdth' 100",
              }}
            >
              &amp;
            </span>
            {' raised'}
          </p>

          {/* Line 4 — "on the south side" — no indent */}
          <p className={`${textCls} md:w-full`}>
            on the south side
          </p>

          {/* Line 5 — "of chicago." + label — desktop: ~44% left indent, inline label */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-baseline md:gap-4 md:w-full md:pl-[44%]">
            <p className={textCls}>of chicago.</p>
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
              [ creative freelancer ]
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

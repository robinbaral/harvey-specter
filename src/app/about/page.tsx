'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../PageLayout';

gsap.registerPlugin(ScrollTrigger);

const portrait    = 'https://www.figma.com/api/mcp/asset/f1221c93-0ddb-4789-9b32-ba541d2d65d1';
const fullBleed   = 'https://www.figma.com/api/mcp/asset/09b65b35-a764-4f14-b044-3deda445b2d3';

const stats = [
  { value: '10+',  label: 'Years in industry' },
  { value: '200+', label: 'Projects delivered' },
  { value: '80+',  label: 'Happy clients' },
  { value: '6',    label: 'Industry awards' },
];

const skills = [
  { category: 'Design',     items: ['Brand Identity', 'UI / UX Design', 'Art Direction', 'Typography', 'Motion Graphics'] },
  { category: 'Strategy',   items: ['Brand Discovery', 'Creative Direction', 'Campaign Strategy', 'Visual Storytelling'] },
  { category: 'Production', items: ['Photography', 'Photo Editing', 'Web Development', 'Print & Packaging'] },
];

const timeline = [
  { year: '2023 – Now', role: 'Creative Director', company: 'H.Studio — Chicago, IL', desc: 'Running a full-service independent creative studio serving global brands across branding, web, and photography.' },
  { year: '2019 – 2023', role: 'Senior Art Director', company: 'Wieden+Kennedy — Portland, OR', desc: 'Led visual identity and campaign design for Nike, KFC, and AB InBev, managing cross-functional teams of 8–12.' },
  { year: '2015 – 2019', role: 'Graphic Designer', company: 'Pentagram — New York, NY', desc: 'Worked across identity, wayfinding, and editorial design under the mentorship of partners Michael Bierut and Paula Scher.' },
  { year: '2011 – 2015', role: 'BFA Graphic Design', company: 'RISD — Providence, RI', desc: 'Graduated with distinction. Thesis focused on the intersection of vernacular typography and contemporary brand language.' },
];

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } },
    );
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

export default function AboutPage() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text staircase color reveal
    const lines = heroTextRef.current?.querySelectorAll('[data-line]');
    if (lines) {
      gsap.fromTo(lines,
        { color: '#c0c0c0' },
        { color: '#111111', stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: heroTextRef.current, start: 'top 80%', end: 'bottom 40%', scrub: 0.8 } },
      );
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <PageLayout>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-[#fafafa] px-4 pt-16 pb-0 md:px-8 md:pt-[80px]">
        <div className="flex items-end justify-between mb-0">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ 002 ]</p>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">Chicago, IL</p>
        </div>

        {/* Staircase heading */}
        <div ref={heroTextRef} className="flex flex-col gap-0 mt-6 md:mt-10">
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw]">
            Creative
          </p>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw] md:pl-[15%]">
            Director
          </p>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw] md:pl-[30%]">
            &amp;{' '}
            <span
              className="italic"
              style={{ fontFamily: 'var(--font-playfair)', fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
            >
              Photographer
            </span>
          </p>
        </div>

        {/* Full-bleed image below heading */}
        <div className="relative mt-10 -mx-4 md:-mx-8 overflow-hidden aspect-[4/3] md:aspect-[16/7]">
          <img src={fullBleed} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/20" />
          {/* Floating label */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <p className="font-mono text-[12px] text-white uppercase leading-[1.1] tracking-widest">
              [ Harvey Specter — H.Studio ]
            </p>
          </div>
        </div>
      </section>

      {/* ── Bio ──────────────────────────────────────────────── */}
      <section className="bg-[#fafafa] px-4 py-16 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-12 md:flex-row md:gap-20 md:items-start">

          {/* Portrait */}
          <div className="w-full md:w-[340px] shrink-0">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img src={portrait} alt="Harvey Specter" className="w-full h-full object-cover" />
              <div ref={overlayRef} className="absolute inset-0 bg-black" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8 flex-1">
            <RevealSection>
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-4">[ Who I am ]</p>
              <p className="text-[18px] md:text-[22px] text-[#1f1f1f] leading-[1.4] tracking-[-0.04em] max-w-[600px]">
                I'm Harvey Specter — a creative director and photographer born and raised on the south side of Chicago. For over a decade I've been building brands that cut through noise and imagery that stops you mid-scroll.
              </p>
            </RevealSection>

            <RevealSection>
              <p className="text-[16px] text-[#555] leading-[1.6] tracking-[-0.02em] max-w-[560px]">
                My work lives at the intersection of high craft and commercial impact. Whether that's a full brand identity for a startup, editorial photography for a major label, or art direction for a global campaign — I bring the same obsessive attention to detail and strategic clarity.
              </p>
              <p className="text-[16px] text-[#555] leading-[1.6] tracking-[-0.02em] max-w-[560px] mt-4">
                I believe great design isn't decoration — it's decision-making. Every colour, every typeface, every frame is a choice that either serves the work or doesn't.
              </p>
            </RevealSection>

            {/* Stats */}
            <RevealSection className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-black/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-light text-black tracking-[-0.08em] leading-[0.9] text-[40px] md:text-[52px]">{s.value}</p>
                  <p className="font-mono text-[12px] text-[#777] uppercase leading-[1.3] mt-2">{s.label}</p>
                </div>
              ))}
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="bg-black px-4 py-16 md:px-8 md:py-[80px]">
        <RevealSection className="mb-10">
          <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1] mb-4">[ Expertise ]</p>
          <div className="h-px w-full bg-white/20" />
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {skills.map((group) => (
            <RevealSection key={group.category}>
              <p className="font-mono text-[12px] text-white/40 uppercase leading-[1.1] mb-6 tracking-widest">{group.category}</p>
              <div className="flex flex-col gap-3">
                {group.items.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 group cursor-default">
                    <div className="h-px flex-1 bg-white/15 transition-colors duration-300 group-hover:bg-white/50" />
                    <p className="font-light text-white text-[15px] tracking-[-0.03em] whitespace-nowrap transition-opacity duration-300 group-hover:opacity-80">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="bg-[#fafafa] px-4 py-16 md:px-8 md:py-[80px]">
        <RevealSection className="mb-12">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-4">[ Experience ]</p>
          <div className="h-px w-full bg-black/15" />
        </RevealSection>

        <div className="flex flex-col gap-0">
          {timeline.map((item, i) => (
            <RevealSection key={i}>
              <div className="flex flex-col md:flex-row md:gap-16 py-8 border-b border-black/10 group">
                <p className="font-mono text-[13px] text-[#999] uppercase leading-[1.1] whitespace-nowrap md:w-[160px] shrink-0 mb-3 md:mb-0 md:pt-1">
                  {item.year}
                </p>
                <div className="flex-1">
                  <p className="text-[22px] md:text-[28px] font-light text-black tracking-[-0.06em] leading-[1.1] mb-1 transition-transform duration-300 group-hover:translate-x-1">
                    {item.role}
                  </p>
                  <p className="font-mono text-[12px] text-[#888] uppercase leading-[1.1] mb-4 tracking-wide">{item.company}</p>
                  <p className="text-[14px] text-[#666] leading-[1.6] max-w-[540px]">{item.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────────── */}
      <section className="bg-[#f3f3f3] px-4 py-20 md:px-8 md:py-[120px]">
        <RevealSection className="max-w-[900px] mx-auto text-center">
          <p className="font-light text-black tracking-[-0.06em] leading-[1.1] text-[7vw] md:text-[4vw]">
            "Design is not just what it looks like and feels like. Design is how it{' '}
            <span
              className="italic"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              works.
            </span>"
          </p>
          <p className="font-mono text-[13px] text-[#999] uppercase tracking-widest mt-8">— Steve Jobs</p>
        </RevealSection>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-black px-4 py-16 md:px-8 md:py-[80px]">
        <RevealSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-light text-white uppercase tracking-[-0.08em] leading-[0.86] text-[10vw] md:text-[6vw]">
              Let's build
            </p>
            <p className="font-light text-white uppercase tracking-[-0.08em] leading-[0.86] text-[10vw] md:text-[6vw] md:pl-[10%]">
              something
              {' '}
              <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>great.</span>
            </p>
          </div>
          <a
            href="/contact"
            className="self-start md:self-auto border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-6 py-4 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Start a project →
          </a>
        </RevealSection>
      </section>

    </PageLayout>
  );
}

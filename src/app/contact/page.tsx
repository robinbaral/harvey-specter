'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../PageLayout';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'Instagram', handle: '@h.studio', href: '#' },
  { label: 'X.com',     handle: '@harveyspecter', href: '#' },
  { label: 'LinkedIn',  handle: 'Harvey Specter', href: '#' },
  { label: 'Dribbble',  handle: 'h-studio', href: '#' },
];

const faq = [
  { q: 'What does a typical project cost?',      a: "Brand projects start from $8k. Web design + development from $15k. Photography day rates from $2,500. Every project is scoped individually — reach out and we'll find a structure that works." },
  { q: 'How far out are you booked?',             a: 'Usually 4–8 weeks. If you have an urgent deadline, mention it in your message — we sometimes have capacity for fast-turnaround projects.' },
  { q: 'Do you work with international clients?', a: "Yes. About 60% of our work is international. We're comfortable working across time zones and have robust async workflows." },
  { q: 'Do you offer payment plans?',             a: 'Yes. All projects are structured with a 50% deposit upfront, remainder on delivery. For larger engagements we can split into three milestones.' },
];

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } },
    );
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' },
      );
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
    }
  }, [open]);

  return (
    <div className="border-b border-black/10 py-5 cursor-pointer" onClick={() => setOpen((o) => !o)}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[15px] md:text-[17px] font-medium text-black tracking-[-0.04em] leading-[1.3]">{q}</p>
        <span className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="10" y1="4" x2="10" y2="16" />
            <line x1="4" y1="10" x2="16" y2="10" />
          </svg>
        </span>
      </div>
      <div ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="text-[14px] text-[#666] leading-[1.6] pt-3 max-w-[580px]">{a}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const headingRef   = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const lines = headingRef.current?.querySelectorAll('[data-line]');
    if (lines) {
      gsap.fromTo(lines,
        { color: '#c0c0c0' },
        { color: '#111111', stagger: 0.15, ease: 'none',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', end: 'bottom 40%', scrub: 0.8 } },
      );
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#fafafa] px-4 pt-16 pb-0 md:px-8 md:pt-[80px]">
        <div className="flex items-end justify-between mb-8">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ 006 ]</p>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">Chicago, IL — GMT–5</p>
        </div>
        <div className="h-px w-full bg-black/15 mb-10" />

        <div ref={headingRef}>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw]">
            Let's
          </p>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw] md:pl-[20%]">
            <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>talk.</span>
          </p>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────── */}
      <section className="bg-[#fafafa] px-4 py-16 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-16 md:flex-row md:gap-20 md:items-start">

          {/* Form */}
          <RevealSection className="flex-[3]">
            {submitted ? (
              <div className="flex flex-col gap-4 py-20 items-center text-center">
                <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4,10 8,14 16,6" />
                  </svg>
                </div>
                <p className="text-[20px] font-light text-black tracking-[-0.04em]">Message received.</p>
                <p className="text-[14px] text-[#666]">I'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] text-[#999] uppercase tracking-widest">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Harvey Specter"
                      className="border-b border-black/20 bg-transparent text-black text-[15px] tracking-[-0.03em] py-3 outline-none focus:border-black transition-colors placeholder-black/30"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] text-[#999] uppercase tracking-widest">Company</label>
                    <input
                      type="text"
                      placeholder="Pearson Specter Litt"
                      className="border-b border-black/20 bg-transparent text-black text-[15px] tracking-[-0.03em] py-3 outline-none focus:border-black transition-colors placeholder-black/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] text-[#999] uppercase tracking-widest">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="harvey@pearsonlitt.com"
                    className="border-b border-black/20 bg-transparent text-black text-[15px] tracking-[-0.03em] py-3 outline-none focus:border-black transition-colors placeholder-black/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] text-[#999] uppercase tracking-widest">Project type</label>
                  <select
                    className="border-b border-black/20 bg-transparent text-black text-[15px] tracking-[-0.03em] py-3 outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select one…</option>
                    <option>Brand Discovery</option>
                    <option>Web Design & Development</option>
                    <option>Photography</option>
                    <option>Marketing Campaign</option>
                    <option>Something else</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] text-[#999] uppercase tracking-widest">Budget</label>
                    <select
                      className="border-b border-black/20 bg-transparent text-black text-[15px] tracking-[-0.03em] py-3 outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select range…</option>
                      <option>Under $5k</option>
                      <option>$5k – $15k</option>
                      <option>$15k – $40k</option>
                      <option>$40k+</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] text-[#999] uppercase tracking-widest">Timeline</label>
                    <select
                      className="border-b border-black/20 bg-transparent text-black text-[15px] tracking-[-0.03em] py-3 outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>When do you need it?</option>
                      <option>ASAP</option>
                      <option>Within 1 month</option>
                      <option>1 – 3 months</option>
                      <option>3+ months</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] text-[#999] uppercase tracking-widest">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project…"
                    className="border-b border-black/20 bg-transparent text-black text-[15px] tracking-[-0.03em] py-3 outline-none focus:border-black transition-colors resize-none placeholder-black/30"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-6 py-4 rounded-full hover:opacity-80 transition-opacity cursor-pointer mt-2"
                >
                  Send message →
                </button>
              </form>
            )}
          </RevealSection>

          {/* Info sidebar */}
          <RevealSection className="flex-[2] flex flex-col gap-10">
            <div>
              <p className="font-mono text-[11px] text-[#999] uppercase tracking-widest mb-4">Direct contact</p>
              <a href="mailto:hello@hstudio.co" className="text-[18px] font-light text-black tracking-[-0.04em] hover:opacity-60 transition-opacity block mb-2">
                hello@hstudio.co
              </a>
              <a href="tel:+13125550100" className="text-[15px] text-[#666] tracking-[-0.03em] hover:opacity-60 transition-opacity block">
                +1 (312) 555-0100
              </a>
            </div>

            <div>
              <p className="font-mono text-[11px] text-[#999] uppercase tracking-widest mb-4">Follow the work</p>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-[15px] text-black tracking-[-0.03em] group-hover:opacity-60 transition-opacity">{s.label}</span>
                    <span className="font-mono text-[12px] text-[#999] group-hover:text-black transition-colors">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] text-[#999] uppercase tracking-widest mb-4">Studio hours</p>
              <p className="text-[14px] text-[#555] leading-[1.6]">
                Monday – Friday<br />
                9am – 6pm CST<br />
                <span className="text-[#999]">(Chicago, IL)</span>
              </p>
            </div>

            <div className="p-5 border border-black/10 rounded-[4px]">
              <p className="font-mono text-[11px] text-[#999] uppercase tracking-widest mb-3">Average response time</p>
              <p className="text-[28px] font-light text-black tracking-[-0.06em] leading-[1.0]">&lt; 24h</p>
            </div>
          </RevealSection>

        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[80px]">
        <RevealSection>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-8">[ Before you reach out ]</p>
          <div className="max-w-[720px]">
            {faq.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </RevealSection>
      </section>

    </PageLayout>
  );
}

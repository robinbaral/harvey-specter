'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../PageLayout';
import type { SanityService } from './page';

gsap.registerPlugin(ScrollTrigger);

const process = [
  { num: '01', title: 'Discover', desc: 'We start by listening. Deep-dive calls, briefs, competitor research — everything we need to fully understand your world and your goals.' },
  { num: '02', title: 'Strategy', desc: "Before any design, we define the \"why\". Positioning, messaging, and creative direction are locked in so that everything that follows has purpose." },
  { num: '03', title: 'Create',   desc: "Iterative design sprints with regular check-ins — you're involved throughout, never surprised at the end." },
  { num: '04', title: 'Deliver',  desc: 'Handover is thorough. Final files, guidelines, and a walkthrough session so your team can hit the ground running from day one.' },
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

export default function ServicesContent({ services }: { services: SanityService[] }) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = headingRef.current?.querySelectorAll('[data-line]');
    if (lines) {
      gsap.fromTo(lines,
        { color: '#c0c0c0' },
        { color: '#111111', stagger: 0.12, ease: 'none',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', end: 'bottom 40%', scrub: 0.8 } },
      );
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-[#fafafa] px-4 pt-16 pb-16 md:px-8 md:pt-[80px] md:pb-[80px]">
        <div className="flex items-end justify-between mb-8">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ 003 ]</p>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">{services.length} deliverables</p>
        </div>
        <div className="h-px w-full bg-black/15 mb-10" />
        <div ref={headingRef}>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw]">What we</p>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw] md:pl-[15%]">
            do <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>best</span>
          </p>
        </div>
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <p className="text-[16px] text-[#555] leading-[1.6] max-w-[480px]">
            H.Studio is a full-service creative studio. We partner with ambitious brands at every stage — from initial strategy through to launch and beyond.
          </p>
          <a href="/contact" className="self-start border border-black text-black text-[14px] font-medium tracking-[-0.04em] px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
            Work with us →
          </a>
        </div>
      </section>

      {/* Service sections */}
      {services.length === 0 ? (
        <section className="bg-[#fafafa] px-4 py-20 md:px-8 text-center">
          <p className="font-mono text-[14px] text-[#999] uppercase">No services yet — add some in the Studio at /studio</p>
        </section>
      ) : (
        services.map((s, i) => (
          <section key={s._id} className={`px-4 py-16 md:px-8 md:py-[80px] ${i % 2 === 0 ? 'bg-[#fafafa]' : 'bg-[#f3f3f3]'}`}>
            <RevealSection className="flex flex-col md:flex-row md:gap-12 md:items-start">

              {/* Image */}
              <div className={`w-full md:w-[480px] shrink-0 overflow-hidden aspect-[4/3] mb-8 md:mb-0 bg-[#eee] ${i % 2 !== 0 ? 'md:order-last' : ''}`}>
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.title} className={`w-full h-full object-cover ${s.imagePosition ?? 'object-center'} transition-transform duration-700 hover:scale-105`} />
                ) : (
                  <div className="w-full h-full bg-[#ddd]" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex items-start gap-4">
                  <p className="font-mono text-[13px] text-[#999] uppercase mt-1">{s.num}</p>
                  <h2 className="text-[32px] md:text-[44px] font-bold italic text-black uppercase tracking-[-0.04em] leading-[1.0]">{s.title}</h2>
                </div>
                <div className="h-px bg-black/15" />
                <p className="text-[15px] text-[#555] leading-[1.6] max-w-[420px]">{s.description}</p>

                {s.deliverables?.length > 0 && (
                  <div>
                    <p className="font-mono text-[12px] text-[#999] uppercase tracking-widest mb-3">Deliverables</p>
                    <div className="flex flex-col gap-2">
                      {s.deliverables.map((d) => (
                        <div key={d} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-black/40 shrink-0" />
                          <p className="text-[14px] text-[#333] tracking-[-0.02em]">{d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {s.duration && (
                  <div className="flex items-center gap-3 pt-2">
                    <p className="font-mono text-[12px] text-[#999] uppercase tracking-widest">Timeline</p>
                    <div className="h-px flex-1 bg-black/10" />
                    <p className="font-mono text-[12px] text-black uppercase tracking-wide">{s.duration}</p>
                  </div>
                )}
              </div>
            </RevealSection>
          </section>
        ))
      )}

      {/* Process */}
      <section className="bg-black px-4 py-16 md:px-8 md:py-[80px]">
        <RevealSection className="mb-12">
          <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1] mb-4">[ How I work ]</p>
          <div className="h-px bg-white/20" />
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {process.map((step) => (
            <RevealSection key={step.num}>
              <div className="flex flex-col gap-4 py-8 md:py-0 md:pr-8 border-b border-white/10 md:border-b-0 md:border-r last:border-0">
                <p className="font-mono text-[12px] text-white/30 uppercase tracking-widest">{step.num}</p>
                <p className="text-[22px] font-bold italic text-white uppercase tracking-[-0.04em] leading-[1.0]">{step.title}</p>
                <p className="text-[14px] text-white/60 leading-[1.6]">{step.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[80px]">
        <RevealSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-mono text-[14px] text-[#999] uppercase leading-[1.1] mb-6">[ Ready to start? ]</p>
            <p className="font-light text-black uppercase tracking-[-0.08em] leading-[0.86] text-[8vw] md:text-[5vw]">Let's build your</p>
            <p className="font-light text-black uppercase tracking-[-0.08em] leading-[0.86] text-[8vw] md:text-[5vw]">
              next <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>big thing.</span>
            </p>
          </div>
          <a href="/contact" className="self-start border border-black text-black text-[14px] font-medium tracking-[-0.04em] px-6 py-4 rounded-full hover:bg-black hover:text-white transition-colors">
            Get in touch →
          </a>
        </RevealSection>
      </section>

    </PageLayout>
  );
}

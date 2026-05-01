'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../PageLayout';
import type { SanityProject } from './page';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['All', 'Photography', 'Branding', 'Web'];

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="15" x2="15" y2="5" />
    <polyline points="9,5 15,5 15,11" />
  </svg>
);

function ProjectCard({ project }: { project: SanityProject }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(wrapRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 85%', once: true } },
    );
  }, []);

  const enter = () => {
    gsap.to(cardRef.current,  { y: -6, scale: 1.02, duration: 0.4, ease: 'power2.out' });
    gsap.to(imgRef.current,   { scale: 1.08,         duration: 0.6, ease: 'power2.out' });
    gsap.to(arrowRef.current, { x: 3, y: -3,         duration: 0.3, ease: 'power2.out' });
  };
  const leave = () => {
    gsap.to(cardRef.current,  { y: 0, scale: 1,  duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    gsap.to(imgRef.current,   { scale: 1,         duration: 0.5, ease: 'power2.out' });
    gsap.to(arrowRef.current, { x: 0, y: 0,       duration: 0.4, ease: 'power2.out' });
  };

  return (
    <div ref={wrapRef}>
      <div ref={cardRef} className="flex flex-col gap-3 cursor-pointer" onMouseEnter={enter} onMouseLeave={leave}>
        <div className="relative overflow-hidden aspect-[4/5] bg-[#eee]">
          {project.imageUrl ? (
            <img
              ref={imgRef}
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transformOrigin: 'center' }}
            />
          ) : (
            <div ref={imgRef} className="absolute inset-0 bg-[#ddd]" />
          )}
          {project.tags?.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              {project.tags.map((t) => (
                <span key={t} className="backdrop-blur-[8px] bg-white/30 px-2 py-1 rounded-full text-[#111] text-[12px] font-medium tracking-[-0.03em]">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-black uppercase tracking-[-0.04em] leading-[1.1] text-[18px] md:text-[22px]">
              {project.title}
            </p>
            {project.year && (
              <p className="font-mono text-[12px] text-[#999] uppercase tracking-wide mt-1">{project.year}</p>
            )}
          </div>
          <span ref={arrowRef} className="text-black shrink-0"><Arrow /></span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsContent({ projects }: { projects: SanityProject[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const headingRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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

  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-[#fafafa] px-4 pt-16 pb-12 md:px-8 md:pt-[80px] md:pb-[60px]">
        <div className="flex items-end justify-between mb-8">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ 004 ]</p>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">{projects.length} projects</p>
        </div>
        <div className="h-px w-full bg-black/15 mb-10" />
        <div ref={headingRef}>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw]">Selected</p>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw] md:pl-[15%]">
            <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>Work</span>
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#fafafa] px-4 pb-10 md:px-8">
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-[14px] font-medium tracking-[-0.03em] transition-colors cursor-pointer border ${
                activeFilter === f
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black border-black/30 hover:border-black'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#fafafa] px-4 pb-20 md:px-8 md:pb-[120px]">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-mono text-[14px] text-[#999] uppercase">
              {projects.length === 0
                ? 'No projects yet — add some in the Studio at /studio'
                : 'No projects in this category.'}
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-black px-4 py-16 md:px-8 md:py-[80px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1] mb-4">[ Have a project? ]</p>
            <p className="font-light text-white uppercase tracking-[-0.08em] leading-[0.86] text-[7vw] md:text-[4vw]">
              Let's add yours to the list.
            </p>
          </div>
          <a href="/contact" className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-6 py-4 rounded-full hover:bg-white hover:text-black transition-colors">
            Start a project →
          </a>
        </div>
      </section>

    </PageLayout>
  );
}

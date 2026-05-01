'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { client } from '@/sanity/lib/client';
import { ARTICLES_QUERY } from '@/sanity/lib/queries';

type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  imageUrl: string | null;
  excerpt: string;
};

// Non-featured articles sorted newest-first, capped at 3 for the homepage slider
const HOME_ARTICLES_QUERY = `
  *[_type == "article" && featured != true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    "imageUrl": coalesce(image.asset->url, externalImageUrl),
    excerpt
  }
`;

function ReadMoreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
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
  current, total, onPrev, onNext, onDot,
}: { current: number; total: number; onPrev: () => void; onNext: () => void; onDot: (i: number) => void; }) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex gap-2 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            className={`h-[2px] transition-all duration-300 cursor-pointer rounded-full ${i === current ? 'w-6 bg-black' : 'w-3 bg-black/30'}`}
          />
        ))}
        <span className="ml-3 font-mono text-[12px] tracking-wider opacity-40 text-black">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <div className="flex gap-3">
        <button onClick={onPrev} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/30 flex items-center justify-center hover:border-black transition-colors cursor-pointer text-black">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10,3 5,8 10,13" />
          </svg>
        </button>
        <button onClick={onNext} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/30 flex items-center justify-center hover:border-black transition-colors cursor-pointer text-black">
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
      onComplete: () => { animating.current = false; setCurrent(clamped); },
    });
  };

  return { current, trackRef, goTo, prev: () => goTo(current - 1), next: () => goTo(current + 1) };
}

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const mobile  = useSlider(articles.length);
  const desktop = useSlider(articles.length);

  useEffect(() => {
    client.fetch<Article[]>(HOME_ARTICLES_QUERY).then((data) => {
      if (data?.length) setArticles(data);
    });
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="bg-[#f3f3f3]">

      {/* ── Mobile ─────────────────────────────────────────── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <h2 className="font-light text-black uppercase text-[32px] tracking-[-0.08em] leading-[0.86]">
          Keep up with my latest news &amp; achievements
        </h2>
        <div className="overflow-hidden">
          <div ref={mobile.trackRef} className="flex" style={{ width: `${articles.length * 100}%` }}>
            {articles.map((a) => (
              <div key={a._id} className="flex flex-col gap-4" style={{ width: `${100 / articles.length}%` }}>
                <div className="relative w-full overflow-hidden aspect-[300/398]">
                  {a.imageUrl && <img src={a.imageUrl} alt={a.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />}
                </div>
                <p className="text-[16px] font-bold text-[#1f1f1f] leading-[1.2] tracking-[-0.03em]">{a.title}</p>
                <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{a.excerpt}</p>
                <ReadMoreLink href={`/news/${a.slug?.current}`} />
              </div>
            ))}
          </div>
        </div>
        <SliderControls current={mobile.current} total={articles.length} onPrev={mobile.prev} onNext={mobile.next} onDot={mobile.goTo} />
      </div>

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex items-start justify-between px-8 py-[120px]">
        <div className="flex items-center justify-center w-[110px] h-[706px] shrink-0 overflow-hidden">
          <div className="-rotate-90 whitespace-nowrap">
            <p className="font-light text-black uppercase text-[64px] tracking-[-0.08em] leading-[0.86]">Keep up with my latest</p>
            <p className="font-light text-black uppercase text-[64px] tracking-[-0.08em] leading-[0.86]">news &amp; achievements</p>
          </div>
        </div>

        <div className="flex flex-col flex-1 ml-12 min-w-0">
          <div className="overflow-hidden">
            <div ref={desktop.trackRef} className="flex" style={{ width: `${articles.length * 100}%` }}>
              {articles.map((a, i) => (
                <div key={a._id} className="flex gap-6 pr-6" style={{ width: `${100 / articles.length}%` }}>
                  {/* Main card */}
                  <div className="flex flex-col gap-4 flex-[2]">
                    <div className="relative w-full overflow-hidden aspect-[353/469]">
                      {a.imageUrl && <img src={a.imageUrl} alt={a.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />}
                    </div>
                    <p className="text-[18px] font-bold text-[#1f1f1f] leading-[1.2] tracking-[-0.04em]">{a.title}</p>
                    <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{a.excerpt}</p>
                    <ReadMoreLink href={`/news/${a.slug?.current}`} />
                  </div>
                  {/* Faded preview of next */}
                  <div className="flex flex-col gap-4 flex-1 pt-[120px] opacity-35 pointer-events-none">
                    <div className="relative w-full overflow-hidden aspect-[353/469]">
                      {articles[(i + 1) % articles.length].imageUrl && (
                        <img src={articles[(i + 1) % articles.length].imageUrl!} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      )}
                    </div>
                    <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                      {articles[(i + 1) % articles.length].excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SliderControls current={desktop.current} total={articles.length} onPrev={desktop.prev} onNext={desktop.next} onDot={desktop.goTo} />
        </div>
      </div>

    </section>
  );
}

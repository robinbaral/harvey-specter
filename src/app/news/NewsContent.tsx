'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../PageLayout';
import type { SanityArticle } from './page';

gsap.registerPlugin(ScrollTrigger);

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

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function ArticleCard({ article }: { article: SanityArticle }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement | HTMLDivElement>(null);

  const enter = () => {
    gsap.to(cardRef.current, { y: -4, duration: 0.3, ease: 'power2.out' });
    gsap.to(imgRef.current,  { scale: 1.06, duration: 0.5, ease: 'power2.out' });
  };
  const leave = () => {
    gsap.to(cardRef.current, { y: 0,  duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    gsap.to(imgRef.current,  { scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <RevealSection>
      <div ref={cardRef} className="flex flex-col gap-4 cursor-pointer group" onMouseEnter={enter} onMouseLeave={leave}>
        <div className="relative overflow-hidden aspect-[3/2] bg-[#eee]">
          {article.imageUrl ? (
            <img
              ref={imgRef as React.RefObject<HTMLImageElement>}
              src={article.imageUrl}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transformOrigin: 'center' }}
            />
          ) : (
            <div ref={imgRef as React.RefObject<HTMLDivElement>} className="absolute inset-0 bg-[#ddd]" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[#999] uppercase tracking-widest">{article.category}</span>
          <div className="h-px flex-1 bg-black/10" />
          <span className="font-mono text-[11px] text-[#999] uppercase tracking-widest">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="text-[18px] md:text-[20px] font-bold text-black tracking-[-0.04em] leading-[1.2] group-hover:opacity-70 transition-opacity">
          {article.title}
        </h3>
        <p className="text-[14px] text-[#666] leading-[1.6]">{article.excerpt}</p>
        <a href={`/news/${article.slug?.current ?? '#'}`} className="inline-flex items-center gap-2 self-start border-b border-black/30 pb-1 text-[13px] font-medium text-black tracking-[-0.03em] hover:border-black transition-colors">
          Read more
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="10" x2="10" y2="2" /><polyline points="5,2 10,2 10,7" />
          </svg>
        </a>
      </div>
    </RevealSection>
  );
}

export default function NewsContent({
  featured,
  articles,
  total,
}: {
  featured: SanityArticle | null;
  articles: SanityArticle[];
  total: number;
}) {
  const headingRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
      <section className="bg-[#fafafa] px-4 pt-16 pb-12 md:px-8 md:pt-[80px] md:pb-[60px]">
        <div className="flex items-end justify-between mb-8">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ 005 ]</p>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">{total} articles</p>
        </div>
        <div className="h-px w-full bg-black/15 mb-10" />
        <div ref={headingRef}>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw]">News &amp;</p>
          <p data-line className="font-light uppercase tracking-[-0.08em] leading-[0.84] text-[8.5vw] md:text-[6.67vw] md:pl-[15%]">
            <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>Insights</span>
          </p>
        </div>
      </section>

      {/* No content state */}
      {total === 0 && (
        <section className="bg-[#fafafa] px-4 py-20 md:px-8 text-center">
          <p className="font-mono text-[14px] text-[#999] uppercase">No articles yet — add some in the Studio at /studio</p>
        </section>
      )}

      {/* Featured article */}
      {featured && (
        <section className="bg-[#fafafa] px-4 pb-16 md:px-8 md:pb-[80px]">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:gap-12 md:items-start group cursor-pointer">
              <div className="w-full md:flex-[3] overflow-hidden aspect-[16/9] md:aspect-auto md:h-[500px] mb-6 md:mb-0 relative bg-[#eee]">
                {featured.imageUrl ? (
                  <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                ) : (
                  <div className="w-full h-full bg-[#ddd]" />
                )}
              </div>
              <div className="md:flex-[2] flex flex-col justify-end gap-5 md:py-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#999] uppercase tracking-widest">{featured.category}</span>
                  <div className="h-px flex-1 bg-black/10" />
                  <span className="font-mono text-[11px] text-[#999] uppercase tracking-widest">{formatDate(featured.publishedAt)}</span>
                </div>
                <h2 className="text-[24px] md:text-[32px] font-bold text-black tracking-[-0.05em] leading-[1.15] group-hover:opacity-70 transition-opacity">
                  {featured.title}
                </h2>
                <p className="text-[15px] text-[#666] leading-[1.6]">{featured.excerpt}</p>
                <a href={`/news/${featured.slug?.current ?? '#'}`} className="inline-flex items-center gap-2 self-start border-b border-black pb-1 text-[13px] font-medium text-black tracking-[-0.03em]">
                  Read the full article
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="10" x2="10" y2="2" /><polyline points="5,2 10,2 10,7" />
                  </svg>
                </a>
              </div>
            </div>
          </RevealSection>
        </section>
      )}

      {/* Divider */}
      {articles.length > 0 && <div className="px-4 md:px-8"><div className="h-px bg-black/10" /></div>}

      {/* Article grid */}
      {articles.length > 0 && (
        <section className="bg-[#fafafa] px-4 py-16 md:px-8 md:py-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-black px-4 py-16 md:px-8 md:py-[80px]">
        <RevealSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1] mb-5">[ Stay in the loop ]</p>
            <p className="font-light text-white uppercase tracking-[-0.08em] leading-[0.86] text-[7vw] md:text-[4.5vw]">Get the latest</p>
            <p className="font-light text-white uppercase tracking-[-0.08em] leading-[0.86] text-[7vw] md:text-[4.5vw]">
              straight to <span className="italic" style={{ fontFamily: 'var(--font-playfair)' }}>your inbox.</span>
            </p>
          </div>
          {submitted ? (
            <p className="font-mono text-[14px] text-white/60 uppercase tracking-widest">Thanks — you're in!</p>
          ) : (
            <form
              className="flex flex-col gap-3 w-full md:w-[380px]"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-[14px] tracking-[-0.03em] px-4 py-3 rounded-full outline-none focus:border-white/60 transition-colors"
              />
              <button type="submit" className="w-full bg-white text-black text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
                Subscribe
              </button>
            </form>
          )}
        </RevealSection>
      </section>

    </PageLayout>
  );
}

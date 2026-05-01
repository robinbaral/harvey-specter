'use client';

import { useEffect, useRef, useState } from 'react';
import HeroSection from './HeroSection';
import IntroSection from './IntroSection';
import AboutSection from './AboutSection';
import FullBleedPhoto from './FullBleedPhoto';
import ServicesSection from './ServicesSection';
import PortfolioSection from './PortfolioSection';
import TestimonialsSection from './TestimonialsSection';
import NewsSection from './NewsSection';
import Footer from './Footer';

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    const update = () => {
      if (footerRef.current) setFooterH(footerRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    if (footerRef.current) ro.observe(footerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Main content sits above the fixed footer */}
      <main className="relative z-10 bg-[#fafafa]">
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <FullBleedPhoto />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <NewsSection />
      </main>
      {/* Transparent spacer — fixed footer shows through at scroll bottom */}
      <div style={{ height: footerH }} />
      {/* Footer fixed at viewport bottom, revealed as main content scrolls past */}
      <div ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>
    </>
  );
}

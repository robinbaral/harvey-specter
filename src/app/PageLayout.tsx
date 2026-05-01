'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
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
      <main className="relative z-10 bg-[#fafafa]">
        <Navbar />
        {children}
      </main>
      <div style={{ height: footerH }} />
      <div ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>
    </>
  );
}

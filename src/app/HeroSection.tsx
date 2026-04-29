'use client';

import { useState } from 'react';

const heroImage =
  'https://www.figma.com/api/mcp/asset/a1ce2959-d33f-419a-bb0a-b77d5fa30cf6';

const navLinks = ['About', 'Services', 'Projects', 'News', 'Contact'];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      className="relative h-[847px] overflow-hidden flex flex-col items-center justify-between pb-6 px-4 md:justify-start md:gap-[240px] md:pb-0 md:px-8"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 15%',
      }}
    >

      {/* Blur overlay — fades in from transparent at top to full blur at bottom */}
      <div
        className="absolute bottom-0 h-[349px] w-full backdrop-blur-[10px]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 55%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 55%)',
        }}
      />

      {/* Navbar — no z-index so it doesn't isolate mix-blend-mode on children */}
      <nav className="relative w-full flex items-center justify-between py-6">
        <span className="capitalize font-semibold text-base text-black tracking-[-0.04em]">
          H.Studio
        </span>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden cursor-pointer"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Desktop: nav links */}
        <div className="hidden md:flex items-center gap-14 capitalize font-semibold text-base text-black tracking-[-0.04em]">
          {navLinks.map((item) => (
            <a key={item} href="#" className="hover:opacity-60 transition-opacity">
              {item}
            </a>
          ))}
        </div>

        {/* Desktop: CTA */}
        <button className="hidden md:flex bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
          Let&apos;s talk
        </button>
      </nav>

      {/* Mobile menu — fullscreen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col px-6 pt-6 pb-10">
          <div className="flex items-center justify-between">
            <span className="capitalize font-semibold text-base text-white tracking-[-0.04em]">
              H.Studio
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-8 mt-16 flex-1">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white text-[36px] font-semibold uppercase tracking-[-0.04em] hover:opacity-60 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <button className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
            Let&apos;s talk
          </button>
        </div>
      )}

      {/* Hero content — relative (no z-index) keeps it above blur in DOM order without isolating mix-blend-overlay */}
      <div className="relative w-full flex flex-col items-center gap-10 md:gap-0 md:justify-start">

        {/* Name block */}
        <div className="w-full flex flex-col items-center md:items-start md:pb-[15px]">
          <div className="px-[18px] w-full flex justify-center md:justify-start md:mb-[-15px]">
            <p className="font-mono text-[14px] text-white uppercase leading-[1.1] mix-blend-overlay">
              [ Hello i&apos;m ]
            </p>
          </div>
          {/* Font scales fluidly with viewport. Desktop: one line. Mobile: wraps between words. */}
          <h1 className="w-full text-center text-white font-medium capitalize mix-blend-overlay whitespace-pre-wrap text-[25.6vw] leading-[0.85] tracking-[-0.07em] md:text-[13.75vw] md:leading-[1.1] md:whitespace-nowrap md:mb-[-15px]">
            {`Harvey   Specter`}
          </h1>
        </div>

        {/* Subtitle + CTA */}
        <div className="w-full flex flex-col items-center md:items-end">
          <div className="flex flex-col gap-[17px] items-center md:items-start">
            <p className="text-[#1f1f1f] text-[14px] italic leading-[1.1] tracking-[-0.04em] uppercase w-[294px] text-center md:text-left">
              <span className="font-bold">H.Studio is a </span>
              <span className="font-normal">full-service</span>
              <span className="font-bold"> creative studio creating beautiful digital experiences and products. We are an </span>
              <span className="font-normal">award winning</span>
              <span className="font-bold"> design and art group specializing in branding, web design and engineering.</span>
            </p>
            <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
              Let&apos;s talk
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

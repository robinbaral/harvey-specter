'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroImage =
  'https://www.figma.com/api/mcp/asset/a1ce2959-d33f-419a-bb0a-b77d5fa30cf6';

const navLinks = [
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'News',     href: '/news' },
  { label: 'Contact',  href: '/contact' },
];

// Button that fills from the right on hover
function FillButton({
  children,
  className = '',
  dark = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  onClick?: () => void;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    gsap.fromTo(
      fillRef.current,
      { scaleX: 0, transformOrigin: 'right center' },
      { scaleX: 1, transformOrigin: 'right center', duration: 0.35, ease: 'power3.out' },
    );
  };
  const handleLeave = () => {
    gsap.to(fillRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.3,
      ease: 'power3.in',
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      <span
        ref={fillRef}
        className={`absolute inset-0 rounded-full ${dark ? 'bg-white' : 'bg-white/20'}`}
        style={{ transform: 'scaleX(0)' }}
      />
      <span className="relative">{children}</span>
    </button>
  );
}

// Nav link with underline slide-in
function NavLink({ label, href }: { label: string; href: string }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  return (
    <Link
      href={href}
      className="relative capitalize font-semibold text-base text-black tracking-[-0.04em]"
      onMouseEnter={() =>
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, transformOrigin: 'left center', duration: 0.3, ease: 'power3.out' },
        )
      }
      onMouseLeave={() =>
        gsap.to(lineRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.25, ease: 'power3.in' })
      }
    >
      {label}
      <span
        ref={lineRef}
        className="absolute left-0 bottom-[-2px] h-[1.5px] w-full bg-black"
        style={{ transform: 'scaleX(0)' }}
      />
    </Link>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const harveyRef = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);
  const helloRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLAnchorElement[]>([]);

  // Scroll-driven parallax + zoom
  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const harvey = harveyRef.current;
    const specter = specterRef.current;
    const hello = helloRef.current;
    if (!section || !img || !harvey || !specter || !hello) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Image zooms in as you scroll
    tl.to(img, { scale: 1.12, ease: 'none' }, 0);

    // Harvey goes left, hello follows Harvey
    tl.to(harvey, { x: '-30vw', ease: 'none' }, 0);
    tl.to(hello, { x: '-30vw', ease: 'none' }, 0);

    // Specter goes right
    tl.to(specter, { x: '30vw', ease: 'none' }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Mobile menu open/close animation
  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    const panel = menuPanelRef.current;
    if (!panel) { setMenuOpen(false); return; }
    gsap.to(panel, {
      x: '100%',
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => setMenuOpen(false),
    });
  };

  // Animate panel in when it mounts
  useEffect(() => {
    if (!menuOpen) return;
    const panel = menuPanelRef.current;
    const links = menuLinksRef.current;
    if (!panel) return;

    gsap.fromTo(panel, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    gsap.fromTo(
      links,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.07, delay: 0.2 },
    );
  }, [menuOpen]);

  return (
    <section
      ref={sectionRef}
      className="isolate relative h-[847px] overflow-hidden flex flex-col items-center justify-between pb-6 px-4 md:justify-start md:gap-[240px] md:pb-0 md:px-8"
    >
      {/* Background image */}
      <img
        ref={imgRef}
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[center_15%] origin-center pointer-events-none select-none"
      />

      {/* Blur overlay */}
      <div
        ref={overlayRef}
        className="absolute bottom-0 h-[349px] w-full backdrop-blur-[10px]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 55%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 55%)',
        }}
      />

      {/* Navbar */}
      <nav className="relative w-full flex items-center justify-between py-6">
        <span className="capitalize font-semibold text-base text-black tracking-[-0.04em]">
          H.Studio
        </span>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer"
          aria-label="Open menu"
          onClick={openMenu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-14">
          {navLinks.map((item) => (
            <NavLink key={item.href} label={item.label} href={item.href} />
          ))}
        </div>

        {/* Desktop CTA */}
        <FillButton className="hidden md:flex bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full">
          Let&apos;s talk
        </FillButton>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuPanelRef}
          className="fixed inset-0 z-50 bg-black flex flex-col px-6 pt-6 pb-10"
          style={{ transform: 'translateX(100%)' }}
        >
          <div className="flex items-center justify-between">
            <span className="capitalize font-semibold text-base text-white tracking-[-0.04em]">
              H.Studio
            </span>
            <button onClick={closeMenu} aria-label="Close menu" className="cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-8 mt-16 flex-1">
            {navLinks.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => { if (el) menuLinksRef.current[i] = el as unknown as HTMLAnchorElement; }}
                className="text-white text-[36px] font-semibold uppercase tracking-[-0.04em] opacity-0"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <FillButton
            dark
            className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full"
          >
            Let&apos;s talk
          </FillButton>
        </div>
      )}

      {/* Hero content */}
      <div className="relative w-full flex flex-col items-center gap-10 md:gap-0 md:justify-start">

        {/* Name block */}
        <div className="w-full flex flex-col items-center md:items-start md:pb-[15px]">
          <div className="px-[18px] w-full flex justify-center md:justify-start md:mb-[-15px]">
            <p
              ref={helloRef}
              className="font-mono text-[14px] text-white uppercase leading-[1.1] mix-blend-overlay"
            >
              [ Hello i&apos;m ]
            </p>
          </div>

          <h1 className="w-full text-center text-white font-medium capitalize mix-blend-overlay whitespace-pre-wrap text-[25.6vw] leading-[0.85] tracking-[-0.07em] md:text-[13.75vw] md:leading-[1.1] md:whitespace-nowrap md:mb-[-15px]">
            <span ref={harveyRef} className="inline-block">Harvey</span>
            {'   '}
            <span ref={specterRef} className="inline-block">Specter</span>
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
            <FillButton className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full">
              Let&apos;s talk
            </FillButton>
          </div>
        </div>

      </div>
    </section>
  );
}

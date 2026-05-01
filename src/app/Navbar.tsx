'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const navItems = [
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'News',     href: '/news' },
  { label: 'Contact',  href: '/contact' },
];

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (active) gsap.set(lineRef.current, { scaleX: 1 });
  }, [active]);

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
      onMouseLeave={() => {
        if (active) return;
        gsap.to(lineRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.25, ease: 'power3.in' });
      }}
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

function FillButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);
  return (
    <button
      onMouseEnter={() =>
        gsap.fromTo(fillRef.current,
          { scaleX: 0, transformOrigin: 'right center' },
          { scaleX: 1, transformOrigin: 'right center', duration: 0.35, ease: 'power3.out' },
        )
      }
      onMouseLeave={() =>
        gsap.to(fillRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: 'power3.in' })
      }
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      <span ref={fillRef} className="absolute inset-0 rounded-full bg-white/20" style={{ transform: 'scaleX(0)' }} />
      <span className="relative">{children}</span>
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLAnchorElement[]>([]);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => {
    const panel = menuPanelRef.current;
    if (!panel) { setMenuOpen(false); return; }
    gsap.to(panel, { x: '100%', duration: 0.45, ease: 'power3.in', onComplete: () => setMenuOpen(false) });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const panel = menuPanelRef.current;
    if (!panel) return;
    gsap.fromTo(panel, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    gsap.fromTo(menuLinksRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.07, delay: 0.2 },
    );
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa] border-b border-black/10">
      <nav className="flex items-center justify-between px-4 md:px-8 py-5">
        <Link href="/" className="capitalize font-semibold text-base text-black tracking-[-0.04em]">
          H.Studio
        </Link>

        <button className="md:hidden cursor-pointer" aria-label="Open menu" onClick={openMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-14">
          {navItems.map((item) => (
            <NavLink key={item.href} label={item.label} href={item.href} active={pathname === item.href} />
          ))}
        </div>

        <FillButton className="hidden md:block bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full">
          Let&apos;s talk
        </FillButton>
      </nav>

      {menuOpen && (
        <div
          ref={menuPanelRef}
          className="fixed inset-0 z-50 bg-black flex flex-col px-6 pt-6 pb-10"
          style={{ transform: 'translateX(100%)' }}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="capitalize font-semibold text-base text-white tracking-[-0.04em]" onClick={closeMenu}>
              H.Studio
            </Link>
            <button onClick={closeMenu} aria-label="Close menu" className="cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-8 mt-16 flex-1">
            {navItems.map((item, i) => (
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
          <button
            className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer"
            onClick={closeMenu}
          >
            Let&apos;s talk
          </button>
        </div>
      )}
    </header>
  );
}

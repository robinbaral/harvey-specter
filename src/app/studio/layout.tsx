// The Studio must fill the full viewport and be isolated from the site layout.
// Rendering children directly bypasses PageLayout / Navbar / Footer.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

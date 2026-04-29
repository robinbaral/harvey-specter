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
  return (
    <>
      <main className="bg-[#fafafa]">
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <FullBleedPhoto />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}

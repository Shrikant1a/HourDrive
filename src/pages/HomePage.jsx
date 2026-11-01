import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedCars from '../components/home/FeaturedCars';
import ExplodedViewSection from '../components/explodedView/ExplodedViewSection';
import ExperienceSection from '../components/home/ExperienceSection';
import HowItWorks from '../components/home/HowItWorks';
import BecomeOwner from '../components/home/BecomeOwner';
import Testimonials from '../components/home/Testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050A14]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCars />
        <ExplodedViewSection />
        <ExperienceSection />
        <HowItWorks />
        <BecomeOwner />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

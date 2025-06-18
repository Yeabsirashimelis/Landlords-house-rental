import Footer from "@/ui/Footer";
import AboutSection from "../features/home/about-section";
import CompanyStory from "../features/home/company-story";
import HeroSection from "../features/home/hero-section";
import PropertyManagement from "../features/home/property-management";
import RecentProperties from "../features/home/recent-properties";
import TipsSection from "../features/home/tips-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <HeroSection />
      <RecentProperties />
      <AboutSection />
      <PropertyManagement />
      <CompanyStory />
      <TipsSection />
      <Footer />
    </div>
  );
}

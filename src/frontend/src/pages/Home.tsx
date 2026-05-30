import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <div className="relative z-[1]" data-ocid="home.page">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}

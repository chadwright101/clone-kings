import AboutComponent from "@/_components/home-page/about-component";
import ContactComponent from "@/_components/home-page/contact/contact-component";
import HeroComponent from "@/_components/home-page/hero/hero-component";
import LatestStrainsSection from "@/_components/home-page/latest-strains/latest-strains-section";

export default function Home() {
  return (
    <div className="space-y-10 desktop:space-y-15 desktop:mb-15">
      <HeroComponent />
      <div className="-translate-y-16" id="about" />
      <AboutComponent />
      <LatestStrainsSection />
      <div className="-translate-y-24 desktop:-translate-y-32" id="contact" />
      <ContactComponent />
    </div>
  );
}

import AboutComponent from "@/_components/home-page/about-component";
import HeroComponent from "@/_components/home-page/hero/hero-component";
import LatestStrainsSection from "@/_components/home-page/latest-strains/latest-strains-section";

export default function Home() {
  return (
    <div className="space-y-10 desktop:space-y-15">
      <HeroComponent />
      <AboutComponent />
      <LatestStrainsSection />
    </div>
  );
}

import StrainSlider from "@/_components/home-page/latest-strains/strain-slider";
import ButtonLink from "@/_components/ui/buttons/button-link";

import strainData from "@/_data/general-data.json";

const { strains } = strainData;

const LatestStrainsSection = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-5 desktop:px-10">
      <div className=" py-10 border-y-4 border-yellow grid gap-10">
        <h3 className="text-heading">Latest Strains</h3>
        <StrainSlider data={strains} cssClasses="overflow-hidden" />
        <ButtonLink href="/strains" cssClasses="desktop:place-self-center">
          View More
        </ButtonLink>
      </div>
    </section>
  );
};

export default LatestStrainsSection;

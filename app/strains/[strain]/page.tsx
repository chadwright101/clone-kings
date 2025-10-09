import { Metadata } from "next";
import { notFound } from "next/navigation";

import StrainSlider from "@/_components/strain-page/strain-slider";
import StrainCartComponent from "@/_lib/utils/strain-cart-component";
import StockAvailabilityBadges from "@/_components/ui/badges/stock-availability-badges";
import ButtonLink from "@/_components/ui/buttons/button-link";
import { createStrainMetadata } from "@/_lib/metadata";

import strainData from "@/_data/strains-data.json";

interface StrainPageProps {
  params: Promise<{ strain: string }>;
}

export async function generateStaticParams() {
  return strainData.map((strain) => ({
    strain: strain.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: StrainPageProps): Promise<Metadata> {
  const { strain: strainSlug } = await params;
  const strain = strainData.find(
    (strain) => strain.title.toLowerCase().replace(/\s+/g, "-") === strainSlug
  );

  if (!strain) {
    return {
      title: "Strain Not Found | Clone Kings",
      description: "The requested cannabis strain could not be found.",
    };
  }

  return createStrainMetadata(strain);
}

const StrainPage = async ({ params }: StrainPageProps) => {
  const { strain: strainSlug } = await params;

  const strain = strainData.find(
    (strain) => strain.title.toLowerCase().replace(/\s+/g, "-") === strainSlug
  );

  if (!strain) {
    notFound();
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 desktop:px-10 py-15">
      <div className="mb-10">
        <ButtonLink href="/strains" cssClasses="place-self-start">
          Back to Strains
        </ButtonLink>
      </div>
      <div className="space-y-5 desktop:grid grid-cols-[480px_1fr] desktop:gap-x-10 desktop:gap-y-5">
        <div className="flex w-full flex-col pb-5 border-b-4 border-yellow desktop:place-self-start">
          <h2 className="text-heading">{strain.title}</h2>
          <p
            className="text-subheading font-light"
            style={{ fontVariant: "small-caps" }}
          >
            {strain.supplier}
          </p>
        </div>
        <div className="desktop:overflow-hidden desktop:order-first desktop:row-span-2">
          <StrainSlider data={strain.images} />
        </div>
        <div className="flex flex-col gap-10 text-white">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5 desktop:justify-start desktop:gap-10">
              <p className="text-heading">R{strain.price}</p>
              <StockAvailabilityBadges inStock={strain.inStock} />
            </div>

            <div className="text-paragraph">
              {strain.description.map((desc, index) => (
                <p key={index} className="mb-5 last:mb-0">
                  {desc}
                </p>
              ))}
            </div>
          </div>
          <StrainCartComponent
            strainId={strainSlug}
            strainName={strain.title}
            strainPrice={strain.price}
            strainImage={strain.images[0]}
            inStock={strain.inStock}
            cssClasses="desktop:justify-start"
          />
        </div>
        <div className="grid gap-5 text-paragraph pt-10 mt-10 border-t-4 border-yellow desktop:col-span-2 desktop:gap-x-10 desktop:gap-y-5 desktop:grid-cols-[480px_1fr] desktop:mt-0 desktop:pt-0 desktop:border-t-0">
          {strain.type && (
            <div className="desktop:flex gap-2">
              <h3 className="text-subheading mb-2 shrink-0 leading-[20px] desktop:mb-0">
                Strain Type:
              </h3>
              <p className="leading-[140%]">{strain.type}</p>
            </div>
          )}

          {strain.tac && (
            <div className="desktop:flex gap-2">
              <h3 className="text-subheading mb-2 shrink-0 leading-[20px] desktop:mb-0">
                TAC:
              </h3>
              <p className="leading-[140%]">{strain.tac}</p>
            </div>
          )}

          {strain.length && (
            <div className="desktop:flex gap-2">
              <h3 className="text-subheading mb-2 shrink-0 leading-[20px] desktop:mb-0">
                Height:
              </h3>
              <p className="leading-[140%]">{strain.length}</p>
            </div>
          )}

          {strain.effects && (
            <div className="desktop:flex gap-2">
              <h3 className="text-subheading mb-2 shrink-0 leading-[20px] desktop:mb-0">
                Effects & Benefits:
              </h3>
              <p className="leading-[140%]">{strain.effects}</p>
            </div>
          )}

          {strain.yield && (
            <div className="desktop:flex gap-2">
              <h3 className="text-subheading mb-2 shrink-0 leading-[20px] desktop:mb-0">
                Yield:
              </h3>
              <p className="leading-[140%]">{strain.yield}</p>
            </div>
          )}

          {strain.floweringTime && (
            <div className="desktop:flex gap-2">
              <h3 className="text-subheading mb-2 shrink-0 leading-[20px] desktop:mb-0">
                Flowering Time:
              </h3>
              <p className="leading-[140%]">{strain.floweringTime}</p>
            </div>
          )}

          {strain.terpeneProfile && (
            <div className="desktop:flex gap-2">
              <h3 className="text-subheading mb-2 shrink-0 leading-[20px] desktop:mb-0">
                Terpene Profile:
              </h3>
              <p className="leading-[140%]">{strain.terpeneProfile}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrainPage;

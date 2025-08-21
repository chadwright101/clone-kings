import Image from "next/image";

import { StrainProps } from "@/_types/general-types";
import Link from "next/link";
import StrainCartComponent from "@/_lib/utils/strain-cart-component";

interface StrainComponentProps {
  strainData: StrainProps;
}

const StrainComponent = ({ strainData }: StrainComponentProps) => {
  return (
    <li className="flex flex-col gap-5 items-start justify-center relative w-full border-b border-yellow/25 pb-10 min-[550px]:border-b-0 min-[550px]:pb-0">
      <Link
        href={`/${strainData.title.toLowerCase().replace(/\s+/g, "-")}`}
        className="relative overflow-hidden w-full aspect-square"
      >
        <Image
          src={strainData.image}
          alt={strainData.title}
          width={550}
          height={550}
          className="object-cover desktop:hover:scale-105 delay-75 ease-in-out duration-300 h-full w-full"
          sizes="(max-width: 800px) 100vw, (min-width: 800px) 50vw, (min-width: 1000px) 400px"
        />
      </Link>
      <div className="min-[1000px]:absolute top-3 right-3">
        {strainData.inStock ? (
          <div className="bg-yellow flex items-center justify-center px-2 border-4 border-yellow  rounded-md">
            <p className="text-black text-[14px] text-subheading">In Stock</p>
          </div>
        ) : (
          <div className="bg-white border-4 border-yellow flex items-center justify-center px-1 rounded-md">
            <p className="text-black text-[14px] text-subheading">
              Out of Stock
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col text-white w-full">
        <h3 className="text-subheading">{strainData.title}</h3>
        <p className="text-paragraph">{strainData.supplier}</p>
        <p className="text-paragraph">R{strainData.price}</p>
      </div>

      <StrainCartComponent inStock={strainData.inStock} />
    </li>
  );
};

export default StrainComponent;

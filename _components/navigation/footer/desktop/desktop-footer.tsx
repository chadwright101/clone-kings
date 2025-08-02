import Link from "next/link";
import Image from "next/image";

import navData from "@/_data/nav-data.json";

export function DesktopFooter() {
  return (
    <div className="hidden min-[1000px]:block bg-dark-brown pt-7 pb-5">
      <div className="flex justify-between px-[52px]">
        <nav>
          <ul className="flex flex-col">
            {navData.map(({ title, url }) => {
              return (
                <li key={title}>
                  <Link
                    href={url}
                    className=" text-[14px] font-light text-beige hover:text-opacity-80 ease-in-out duration-200 hover:text-light-brown"
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 items-end justify-around">
          <Image
            src="/logo/heather-hensley-interiors-logo.png"
            alt="Heather Hensley Interiors"
            width={150}
            height={150}
            className="w-[150px] h-auto"
          />
          <div className="text-right mr-[36px]">
            <p className="text-[14px] text-beige">Designed & developed by</p>
            <Link
              href="https://thewrightdesigns.co.za"
              aria-label="The Wright Designs"
              className="text-[14px] text-beige font-light underline underline-offset-4 hover:text-light-brown"
              target="_blank"
            >
              The Wright Designs
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center col-span-2 place-self-center w-full mt-6">
        <h4 className="font-light pt-5 text-[14px] normal-case text-beige">
          © Heather Hensley Interiors |{" "}
          <Link
            href="https://www.hensleyinteriors.co.za"
            className="text-[14px] text-beige font-light underline underline-offset-4 hover:text-light-brown"
          >
            www.hensleyinteriors.co.za
          </Link>
        </h4>
      </div>
    </div>
  );
}

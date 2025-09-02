"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import navData from "@/_data/nav-data.json";
import { CartButton } from "@/_components/ui/buttons/cart-button";

export function DesktopHeader() {
  const router = useRouter();
  
  return (
    <div className="hidden pt-7 px-10 items-center justify-between desktop:flex">
      <Link
        href="/"
        className="relative duration-300 ease-in-out hover:opacity-90"
      >
        <Image
          src="/graphics/crown.png"
          alt="Crown"
          width={36}
          height={30}
          priority
          className="absolute -top-[12.25px] -z-10 -left-1.5"
        />
        <span className="text-white text-[40px] font-normal uppercase">
          Clone Kings
        </span>
      </Link>
      <nav className="translate-y-[7px]">
        <ul className="flex gap-5 items-center">
          {navData.map(({ title, url }, id) => {
            return (
              <li key={id}>
                <Link
                  href={url}
                  className="text-white text-paragraph ease-in-out duration-300 hover:text-yellow"
                >
                  {title}
                </Link>
              </li>
            );
          })}
          <li>
            <CartButton onClick={() => router.push("/cart")} />
          </li>
        </ul>
      </nav>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import classNames from "classnames";

import navData from "@/_data/nav-data.json";
import { CartButton } from "@/_components/ui/buttons/cart-button";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="relative px-7 pb-3 pt-6 desktop:hidden">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="relative">
          <Image
            src="/graphics/crown.png"
            alt="Crown"
            width={23}
            height={18}
            priority
            className="absolute -z-10 -left-1 -top-2"
          />
          <span className="text-white text-[24px] font-normal uppercase">
            Clone Kings
          </span>
        </Link>
        <div className="flex items-center gap-10">
          <CartButton large onClick={() => router.push("/cart")} />
          <button
            onClick={() => setIsOpen(true)}
            className="ease-in-out duration-300 -m-3 p-3"
            aria-label="Open menu"
          >
            <Image
              src="/icons/menu.svg"
              alt="Open menu"
              width={22}
              height={14}
            />
          </button>
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        className={classNames(
          "fixed inset-0 z-50 transform bg-black transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex w-full py-10 items-center justify-between px-7">
          <CartButton large cssClasses="-translate-y-0.5" onClick={() => { router.push("/cart"); setIsOpen(false); }} />
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <Image
              src="/icons/close.svg"
              alt="Close menu"
              width={16}
              height={16}
            />
          </button>
        </div>
        <nav className="px-7">
          <ul className="grid gap-5">
            {navData.map(({ title, url }, id) => {
              return (
                <li key={id}>
                  <Link
                    href={url}
                    onClick={() => setIsOpen(false)}
                    className="text-[18px] text-white font-normal p-3 -m-3"
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

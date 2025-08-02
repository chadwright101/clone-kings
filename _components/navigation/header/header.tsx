"use client";

import { useEffect, useState } from "react";

import classNames from "classnames";

import useScrollPosition from "@/_lib/hooks/scroll-position";

import { MobileHeader } from "./mobile/mobile-header";
import { DesktopHeader } from "./desktop/desktop-header";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [scrollPosition]);

  return (
    <header
      className={classNames(
        "sticky left-0 mx-auto bg-black z-50 ease-in-out duration-300 overflow-y-hidden border-b-4 border-yellow",
        {
          "-top-2 desktop:top-0": isScrolled,
          "top-0": !isScrolled,
        }
      )}
    >
      <div className="max-w-[1280px] mx-auto relative">
        <MobileHeader isScrolled={isScrolled} />
        <DesktopHeader />
      </div>
    </header>
  );
}

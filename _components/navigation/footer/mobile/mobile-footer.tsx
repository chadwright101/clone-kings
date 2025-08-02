import Image from "next/image";
import Link from "next/link";

export function MobileFooter() {
  return (
    <div className="flex flex-col gap-5 items-center px-7 py-10 min-[1000px]:hidden">
      <Image
        src="/logo/heather-hensley-interiors-logo.png"
        alt="SHeather Hensley Interiors"
        width={500}
        height={290}
        className="h-auto w-2/3 max-w-[400px]"
      />
      <div className="text-center mt-2 border-b border-white/25 pb-5">
        <h4 className="font-light text-[14px] text-beige normal-case">
          © Heather Hensley Interiors
        </h4>
        <Link
          href="https://www.hensleyinteriors.co.za"
          className="text-[14px] underline underline-offset-4 p-2 -m-2 text-beige font-light"
        >
          www.hensleyinteriors.co.za
        </Link>
      </div>
      <div className="text-center">
        <p className="text-[14px] text-beige">Designed & developed by</p>
        <Link
          href="https://thewrightdesigns.co.za"
          aria-label="The Wright Designs"
          className="text-[14px] text-beige underline underline-offset-4 p-2 -m-2 font-light"
          target="_blank"
        >
          The Wright Designs
        </Link>
      </div>
    </div>
  );
}

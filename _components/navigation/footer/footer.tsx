import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t-4 border-yellow pt-10 pb-5">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-3">
        <Image
          src="/logo/clone-kings-logo.png"
          alt="Clone Kings Logo"
          width={118}
          height={152}
          className="object-cover"
        />
        <div className="text-center">
          <p className="grid text-white text-paragraph tablet:hidden">
            © 2025 Clone Kings{" "}
            <Link className="text-white" href="/">
              www.clonekings.co.za
            </Link>
          </p>
          <p className="hidden text-white text-paragraph tablet:block">
            © 2025 Clone Kings |{" "}
            <Link className="text-white" href="/">
              www.clonekings.co.za
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

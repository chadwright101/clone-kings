"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";

interface SlideDataProps {
  data: { title: string; image: string }[];
  cssClasses?: string;
}

const StrainSlider = ({ cssClasses, data }: SlideDataProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`relative ${cssClasses}`}>
      <div className="desktop:w-[1056px] mx-auto overflow-hidden">
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          spaceBetween={40}
          speed={1000}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          loop
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            800: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
        >
          {data.map(({ title, image }, index) => (
            <SwiperSlide key={index} className="pb-8">
              <Link
                href={`/${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex flex-col gap-3 items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="aspect-square overflow-hidden desktop:aspect-auto desktop:h-[304px]">
                  <Image
                    src={image}
                    alt={`Clone Kings - ${title}`}
                    width={800}
                    height={600}
                    className={classNames(
                      "object-cover h-full w-full transition-transform duration-300 delay-150",
                      {
                        "desktop:scale-105": hoveredIndex === index,
                      }
                    )}
                  />
                </div>
                <p className="flex flex-col justify-center text-white text-paragraph text-center w-full">
                  {title}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button className="hidden swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-full z-10 w-8 h-8 desktop:flex items-center justify-center desktop:hover:cursor-pointer desktop:hover:scale-[110%] ease-in-out duration-300">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 29.3334C23.3638 29.3334 29.3333 23.3639 29.3333 16.0001C29.3334 8.63629 23.3638 2.66675 16 2.66675C8.63622 2.66675 2.66669 8.63629 2.66668 16.0001C2.66668 23.3639 8.63622 29.3334 16 29.3334Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 10.6667L10.6667 16.0001L16 21.3334"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.3334 16L10.6667 16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button className="hidden swiper-button-next-custom absolute right-0 top-1/2 -translate-y-full z-10 w-8 h-8 desktop:flex items-center justify-center desktop:hover:cursor-pointer desktop:hover:scale-[110%] ease-in-out duration-300">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 29.3334C23.3638 29.3334 29.3333 23.3639 29.3333 16.0001C29.3334 8.63629 23.3638 2.66675 16 2.66675C8.63622 2.66675 2.66669 8.63629 2.66668 16.0001C2.66668 23.3639 8.63622 29.3334 16 29.3334Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 10.6667L21.3333 16.0001L16 21.3334"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.6667 16L21.3334 16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default StrainSlider;

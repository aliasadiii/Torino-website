"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

import styles from "@/styles/homepage/Slider.module.css";
import LineArrowLeftIcon2 from "../../../public/icons/LineArrowLeftIcon2";
import LineArrowRightIcon from "../../../public/icons/LineArrowRightIcon";

function Slider() {
  // استفاده از State به جای useRef برای اطمینان از شناسایی المان‌ها بعد از ریلود
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [paginationEl, setPaginationEl] = useState(null);

  const images = [
    "/images/sliderImage1.png",
    "/images/sliderImage2.png",
    "/images/sliderImage3.png",
    "/images/sliderImage4.png",
  ];

  return (
    <div className={styles.slider}>
      <Swiper
        effect="cards"
        grabCursor
        cardsEffect={{
          slideShadows: false,
          rotate: false,
          perSlideRotate: 0,
          perSlideOffset: 12,
        }}
        navigation={{
          prevEl,
          nextEl,
        }}
        pagination={{
          el: paginationEl,
          type: "fraction",
          renderFraction: (currentClass, totalClass) =>
            `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`,
        }}
        modules={[EffectCards, Pagination, Navigation]}
        className={styles.swiper}
      >
        {images.map((src, index) => (
          <SwiperSlide key={src} className={styles.slide}>
            <div className={styles.imageWrap}>
              <Image
                src={src}
                // width={389}
                // height={479}
                fill
                sizes="(max-width: 768px) 80vw, 389px"
                alt={`slider-photo-${index + 1}`}
                className={styles.image}
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls}>
        <button
          ref={(node) => setPrevEl(node)}
          className={styles.navButton}
          type="button"
          aria-label="قبلی"
        >
          <span className={styles.arrow}>
            <LineArrowLeftIcon2 />
          </span>
        </button>

        <div
          ref={(node) => setPaginationEl(node)}
          className={styles.pagination}
        />

        <button
          ref={(node) => setNextEl(node)}
          className={styles.navButton}
          type="button"
          aria-label="بعدی"
        >
          <span className={styles.arrow}>
            <LineArrowRightIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Slider;

import React from "react";

import styles from "@/styles/homepage/tours/TourCard.module.css";
import Image from "next/image";
import { dateDetails, getTransportationType } from "@/utils/tour";
import Link from "next/link";

function TourCard({ tour }) {
  const { image, title, startDate, endDate, fleetVehicle, options, price, id } =
    tour;

  const { year, month, day, duration } = dateDetails(startDate, endDate);

  const transportation = getTransportationType(fleetVehicle);

  console.log(title);
  return (
    <div className={styles.tourContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          unoptimized
          className={styles.tourImage}
          fill
          sizes="(max-width: 800px) 100vw, 25vw"
        />
      </div>
      <p className={styles.tourTitle}>{title}</p>
      <p
        className={styles.tourDescription}
      >{`${month} . ${duration} روزه - ${transportation} - ${options}`}</p>
      <Link href={`/tours/${id}`} className={styles.tourPrice}>
        <button>رزرو</button>
        <p>
          <span>{`${price.toLocaleString("en-US")},000`} </span>
          <span>تومان</span>
        </p>
      </Link>
    </div>
  );
}

export default TourCard;

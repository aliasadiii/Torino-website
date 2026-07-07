import React from "react";

import styles from "@/styles/homepage/tours/TourCard.module.css";
import Image from "next/image";
import { dateDetails, getTransportationType } from "@/utils/tour";
import Link from "next/link";

function TourCard({ tour }) {
  const { image, title, startDate, endDate, fleetVehicle, options, price, id } =
    tour;

  const { month, duration } = dateDetails(startDate, endDate);

  const transportation = getTransportationType(fleetVehicle);

  return (
    <div className={styles.tourContainer}>
      <div className={styles.imageWrapper}>
        <Link href={`/tours/${id}`}>
          <Image
            src={image}
            alt={title}
            unoptimized
            className={styles.tourImage}
            fill
          />
        </Link>
      </div>
      <p className={styles.tourTitle}>{title}</p>
      <p
        className={styles.tourDescription}
      >{`${month} . ${duration} روزه - ${transportation} - ${options}`}</p>
      <div className={styles.tourPrice}>
        <Link href={`/tours/${id}`}>
          <button>رزرو</button>
        </Link>
        <p>
          <span>{`${price.toLocaleString("en-US")},000`} </span>
          <span>تومان</span>
        </p>
      </div>
    </div>
  );
}

export default TourCard;

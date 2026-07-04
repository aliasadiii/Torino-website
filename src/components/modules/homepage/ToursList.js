import React from "react";
import TourCard from "./TourCard";

import styles from "@/styles/homepage/tours/ToursList.module.css";

async function ToursList() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(`${BASE_URL}tour`, {
    next: { revalidate: 300 },
  });

  const tours = await response.json();

  console.log(tours);
  return (
    <div className={styles.container}>
      <h2>همه تور ها</h2>
      <div className={styles.toursContainer}>
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default ToursList;

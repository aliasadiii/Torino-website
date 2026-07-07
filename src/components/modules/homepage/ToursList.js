import React from "react";
import TourCard from "./TourCard";

import styles from "@/styles/homepage/tours/ToursList.module.css";
import ServerError from "../ServerError";

async function ToursList({ searchParams }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const query = new URLSearchParams();
  if (searchParams?.originId) query.set("originId", searchParams.originId);
  if (searchParams?.destinationId)
    query.set("destinationId", searchParams.destinationId);
  if (searchParams?.startDate) query.set("startDate", searchParams.startDate);
  if (searchParams?.endDate) query.set("endDate", searchParams.endDate);

  const queryString = query.toString();
  const url = `${BASE_URL}tour${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return (
      <div className={styles.container}>
        <h2>همه تور ها</h2>
        <ServerError />
      </div>
    );
  }

  const tours = await response.json();

  return (
    <div className={styles.container}>
      <h2>همه تور ها</h2>

      {tours.length ? (
        <div className={styles.toursContainer}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className={styles.notFound}>
          <p>توری با این مشخصات پیدا نشد !</p>
        </div>
      )}
    </div>
  );
}

export default ToursList;

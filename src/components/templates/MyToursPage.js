import TourCard from "../modules/TourCard";

import styles from "@/styles/MyToursPage.module.css";

function MyToursPage({ tours }) {
  console.log(tours);
  return (
    <div className={styles.container}>
      {tours.map((tour, index) => (
        <TourCard key={tour.id + index} tour={tour} />
      ))}
    </div>
  );
}

export default MyToursPage;

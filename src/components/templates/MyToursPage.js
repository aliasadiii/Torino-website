import Link from "next/link";
import TourCard from "../modules/TourCard";

import styles from "@/styles/MyToursPage.module.css";

function MyToursPage({ tours }) {
  return (
    <div className={styles.container}>
      {tours.length === 0 ? (
        <div className={styles.emptyState}>
          <p>هنوز هیچ توری خریداری نکرده‌اید.</p>
          <Link href="/" className={styles.toursLink}>
            مشاهده تورها
          </Link>
        </div>
      ) : (
        tours.map((tour, index) => (
          <TourCard key={tour.id + index} tour={tour} />
        ))
      )}
    </div>
  );
}

export default MyToursPage;

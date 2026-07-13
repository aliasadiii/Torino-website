import styles from "@/styles/skeletons/TourDetailLoading.module.css";

function DetailItemSkeleton() {
  return (
    <div className={styles.detailsItem}>
      <div className={`${styles.skeleton} ${styles.detailsLabel}`} />
      <div className={`${styles.skeleton} ${styles.detailsValue}`} />
    </div>
  );
}

function TourDetailLoading() {
  return (
    <div className={styles.outsideContainer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={`${styles.skeleton} ${styles.imageWrapper}`} />

          <div className={styles.tourInfo}>
            <div className={styles.tourTitle}>
              <div className={`${styles.skeleton} ${styles.title}`} />
              <div className={`${styles.skeleton} ${styles.duration}`} />
            </div>

            <div className={styles.tourFeature}>
              <div className={`${styles.skeleton} ${styles.feature}`} />
              <div className={`${styles.skeleton} ${styles.feature}`} />
              <div className={`${styles.skeleton} ${styles.feature}`} />
            </div>

            <div className={styles.tourReserve}>
              <div className={`${styles.skeleton} ${styles.button}`} />
              <div className={`${styles.skeleton} ${styles.price}`} />
            </div>
          </div>
        </div>

        <div className={styles.tourDetailsBox}>
          {Array.from({ length: 6 }).map((_, index) => (
            <DetailItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TourDetailLoading;

import styles from "@/styles/skeletons/ToursListSkeleton.module.css";

function TourCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.image}`} />

      <div className={styles.content}>
        <div className={`${styles.skeleton} ${styles.title}`} />
        <div className={`${styles.skeleton} ${styles.description}`} />

        <div className={styles.footer}>
          <div className={`${styles.skeleton} ${styles.price}`} />
          <div className={`${styles.skeleton} ${styles.button}`} />
        </div>
      </div>
    </div>
  );
}

function ToursListSkeleton() {
  return (
    <div className={styles.container}>
      <div className={`${styles.skeleton} ${styles.heading}`} />

      <div className={styles.toursContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
          <TourCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default ToursListSkeleton;

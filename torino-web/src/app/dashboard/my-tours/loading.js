import styles from "@/styles/skeletons/MyToursLoading.module.css";

function Skeleton({ className = "" }) {
  return (
    <span className={`${styles.skeleton} ${className}`} aria-hidden="true" />
  );
}

function TourCardSkeleton() {
  return (
    <article className={styles.card}>
      {/* وضعیت تور */}
      <Skeleton className={styles.status} />

      {/* اطلاعات اصلی تور */}
      <div className={styles.mainInfo}>
        <div className={styles.tourName}>
          <Skeleton className={styles.icon} />
          <Skeleton className={styles.title} />
        </div>

        <div className={styles.vehicle}>
          <Skeleton className={styles.icon} />
          <Skeleton className={styles.vehicleName} />
        </div>
      </div>

      {/* تاریخ رفت و برگشت */}
      <div className={styles.dateInfo}>
        <div className={styles.infoGroup}>
          <Skeleton className={styles.route} />
          <Skeleton className={styles.date} />
        </div>

        <div className={styles.infoGroup}>
          <Skeleton className={styles.label} />
          <Skeleton className={styles.date} />
        </div>
      </div>

      {/* شماره تور و مبلغ */}
      <div className={styles.footerInfo}>
        <div className={styles.infoGroup}>
          <Skeleton className={styles.smallLabel} />
          <Skeleton className={styles.tourNumber} />
        </div>

        <div className={styles.priceGroup}>
          <Skeleton className={styles.priceLabel} />
          <Skeleton className={styles.price} />
        </div>
      </div>
    </article>
  );
}

export default function MyToursLoading() {
  return (
    <section
      className={styles.container}
      role="status"
      aria-label="در حال بارگذاری تورهای من"
      aria-live="polite"
    >
      <span className={styles.srOnly}>در حال بارگذاری تورهای من...</span>

      {Array.from({ length: 3 }).map((_, index) => (
        <TourCardSkeleton key={index} />
      ))}
    </section>
  );
}

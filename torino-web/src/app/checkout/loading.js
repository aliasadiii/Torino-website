import styles from "@/styles/skeletons/CheckoutLoading.module.css";

function CheckoutLoading() {
  return (
    <main className={styles.outsideContainer}>
      <div className={styles.container}>
        <section className={styles.formBox}>
          <div className={styles.heading}>
            <span className={styles.icon} />
            <span className={styles.title} />
          </div>

          <div className={styles.fields}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div className={styles.input} key={index} />
            ))}
          </div>
        </section>

        <aside className={styles.tourBox}>
          <div className={styles.tourHeader}>
            <span className={styles.tourTitle} />
            <span className={styles.duration} />
          </div>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.priceLabel} />
            <span className={styles.price} />
          </div>

          <div className={styles.button} />
        </aside>
      </div>
    </main>
  );
}

export default CheckoutLoading;

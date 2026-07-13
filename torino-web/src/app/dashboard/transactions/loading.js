import styles from "@/styles/skeletons/TransactionLoading.module.css";

function TransactionLoading() {
  const rows = Array.from({ length: 5 });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <span className={`${styles.skeleton} ${styles.dateHeader}`} />
            </th>
            <th>
              <span className={`${styles.skeleton} ${styles.amountHeader}`} />
            </th>
            <th className={styles.smallDisplay}>
              <span className={`${styles.skeleton} ${styles.typeHeader}`} />
            </th>
            <th>
              <span className={`${styles.skeleton} ${styles.orderHeader}`} />
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              <td>
                <span className={`${styles.skeleton} ${styles.date}`} />
              </td>
              <td>
                <span className={`${styles.skeleton} ${styles.amount}`} />
              </td>
              <td className={styles.smallDisplay}>
                <span className={`${styles.skeleton} ${styles.type}`} />
              </td>
              <td>
                <span className={`${styles.skeleton} ${styles.order}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionLoading;

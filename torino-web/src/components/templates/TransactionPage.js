import { convertToPersianDateTime } from "@/utils/formatDate";

import styles from "@/styles/TransactionPage.module.css";

function TransactionPage({ transactions = [] }) {
  if (transactions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>هنوز هیچ تراکنشی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>تاریخ و ساعت</th>
            <th>مبلغ (تومان)</th>
            <th className={styles.smallDisplay}>نوع تراکنش</th>
            <th>شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{convertToPersianDateTime(item.createdAt, true)}</td>
              <td>{item.amount.toLocaleString("en-US")}</td>
              <td className={styles.smallDisplay}>
                {item.type === "Purchase" ? "ثبت نام در تور گردشگری" : "واریز"}
              </td>
              <td>
                <span className={styles.smallDisplay}>سفارش</span>{" "}
                {item?.id.split("-")[0].toUpperCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionPage;

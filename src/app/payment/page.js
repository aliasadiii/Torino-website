import Link from "next/link";
import styles from "@/styles/PaymentPage.module.css";

export const metadata = {
  title: "وضعیت پرداخت",
  description: "انتقال پس از درگاه پرداخت و تکمیل تراکنش",
};

async function PaymentPage({ searchParams }) {
  const params = await searchParams;
  const isSuccess = params?.status === "success";

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div
          className={`${styles.badge} ${
            isSuccess ? styles.badgeSuccess : styles.badgeFail
          }`}
          aria-hidden="true"
        >
          {isSuccess ? "✓" : "!"}
        </div>

        <h1 className={styles.title}>
          {isSuccess ? "پرداخت موفق" : "پرداخت ناموفق"}
        </h1>

        <p className={styles.desc}>
          {isSuccess
            ? "پرداخت شما با موفقیت انجام شد. می‌توانید از پروفایل وضعیت سفارش را پیگیری کنید."
            : "پرداخت شما با شکست مواجه شد. در صورت کسر وجه، مبلغ طبق قوانین در بازه زمانی مشخص برمی‌گردد."}
        </p>

        <div className={styles.actions}>
          <Link href="/dashboard/profile" className={styles.primaryBtn}>
            رفتن به پروفایل
          </Link>

          {isSuccess ? (
            <Link href="/" className={styles.secondaryBtn}>
              بازگشت به صفحه اصلی
            </Link>
          ) : (
            <Link href="/info#contact-us" className={styles.secondaryBtn}>
              ارتباط با پشتیبانی
            </Link>
          )}
        </div>

        <div className={styles.meta}>
          <span className={styles.metaLabel}>وضعیت:</span>
          <span className={isSuccess ? styles.metaOk : styles.metaBad}>
            {isSuccess ? "Success" : "Failed"}
          </span>
        </div>
      </section>
    </main>
  );
}

export default PaymentPage;

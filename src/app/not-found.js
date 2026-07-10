import styles from "@/styles/notFound.module.css";
import Image from "next/image";
import Link from "next/link";

function notFound() {
  return (
    <main className={styles.container}>
      <div className={styles.message}>
        <h2>صفحه مورد نظر یافت نشد!</h2>
        <Link href="/" className={styles.button}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <Image
        src="/images/ErrorTV.jpg"
        width={555}
        height={555}
        alt="404-not-found"
      />
    </main>
  );
}

export default notFound;

"use client";

import Button from "@/components/elements/Button";
import styles from "@/styles/notFound.module.css";
import Image from "next/image";

function notFound() {
  return (
    <main className={styles.container}>
      <div className={styles.message}>
        <h2>صفحه مورد نظر یافت نشد!</h2>
        <Button path="/">بازگشت به صفحه اصلی</Button>
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

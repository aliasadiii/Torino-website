import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.details}>
        <div className={styles.linkList}>
          <ul>
            <h2>تورینو</h2>
            <li>
              <Link href="/info#about-us">درباره ما</Link>
            </li>
            <li>
              <Link href="/info#contact-us">تماس با ما</Link>
            </li>
            <li>
              <Link href="/info#why-torino">چرا تورینو</Link>
            </li>
            <li>
              <Link href="/info#travel-insurance">بیمه مسافرتی</Link>
            </li>
          </ul>
          <ul>
            <h2>خدمات مشتریان</h2>
            <li>
              <Link href="/info#online-support">پشتیبانی آنلاین</Link>
            </li>
            <li>
              <Link href="/info#buy-guide">راهنمای خرید</Link>
            </li>
            <li>
              <Link href="/info#refund-guide">راهنمای استرداد</Link>
            </li>
            <li>
              <Link href="/info#faq">پرسش و پاسخ</Link>
            </li>
          </ul>
        </div>
        <div className={styles.misc}>
          <div className={styles.support}>
            <Link href="/">
              <Image
                src="/icons/Torino.svg"
                width={146}
                height={44}
                alt="torino-logo"
              />
            </Link>
            <p>
              تلفن پشتیبانی:
              <span> 8574-021</span>
            </p>
          </div>
          <div className={styles.logos}>
            <Link href="https://caa.gov.ir/" target="_blank">
              <Image
                src="/images/state-airline.jpg"
                width={78}
                height={74}
                alt="state-airline-logo"
              />
            </Link>
            <Link href="https://caa.gov.ir/complaints" target="_blank">
              <Image
                src="/images/passenger-rights.jpg"
                width={71}
                height={74}
                alt="passenger-rights-logo"
              />
            </Link>
            <Link href="https://ecunion.ir/" target="_blank">
              <Image
                src="/images/ecunion.jpg"
                width={68}
                height={74}
                alt="ecUnion-logo"
              />
            </Link>
            <Link href="https://samandehi.ir/" target="_blank">
              <Image
                src="/images/samandehi.jpg"
                width={68}
                height={74}
                alt="samandehi-logo"
              />
            </Link>
            <Link href="https://www.aira.ir" target="_blank">
              <Image
                src="/images/aira.jpg"
                width={68}
                height={74}
                alt="aira-logo"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
      </div>
    </footer>
  );
}

export default Footer;

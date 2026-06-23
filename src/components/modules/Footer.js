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
              <Link href="#">درباره ما</Link>
            </li>
            <li>
              <Link href="#">تماس با ما</Link>
            </li>
            <li>
              <Link href="#">چرا تورینو</Link>
            </li>
            <li>
              <Link href="#">بیمه مسافرتی</Link>
            </li>
          </ul>
          <ul>
            <h2>خدمات مشتریان</h2>
            <li>
              <Link href="#">پشتیبانی آنلاین</Link>
            </li>
            <li>
              <Link href="#">راهنمای خرید</Link>
            </li>
            <li>
              <Link href="#">راهنمای استرداد</Link>
            </li>
            <li>
              <Link href="#">پرسش و پاسخ</Link>
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
            <Link href="#">
              <Image
                src="/images/state-airline.jpg"
                width={78}
                height={74}
                alt="state-airline-logo"
              />
            </Link>
            <Link href="#">
              <Image
                src="/images/passenger-rights.jpg"
                width={71}
                height={74}
                alt="passenger-rights-logo"
              />
            </Link>
            <Link href="#">
              <Image
                src="/images/ecunion.jpg"
                width={68}
                height={74}
                alt="ecUnion-logo"
              />
            </Link>
            <Link href="#">
              <Image
                src="/images/samandehi.jpg"
                width={68}
                height={74}
                alt="samandehi-logo"
              />
            </Link>
            <Link href="#">
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

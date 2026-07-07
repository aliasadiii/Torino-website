import Image from "next/image";
import PhoneCallIcon from "../../../../public/icons/PhoneCallIcon";

import styles from "@/styles/homepage/Banner.module.css";

function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.info}>
          <p>
            خرید تلفنی از <span>تورینو</span>
          </p>
          <span>به هرکجا که میخواهید!</span>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/talking-phone-icon-illustration.png"
            width={308}
            height={225}
            alt="phone-order"
          />
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles.phone}>
          <p>021-1840</p>
          <PhoneCallIcon />
        </div>
        <p className={styles.moreInfo}>اطلاعات بیشتر</p>
      </div>
    </div>
  );
}

export default Banner;

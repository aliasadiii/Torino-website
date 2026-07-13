import { Suspense } from "react";
import Image from "next/image";

import SearchBox from "../modules/homepage/SearchBox";
import ToursList from "../modules/homepage/ToursList";
import Banner from "../modules/homepage/Banner";
import WhyTorino from "../modules/homepage/WhyTorino";
import ToursListSkeleton from "../modules/homepage/ToursListSkeleton";

import styles from "@/styles/homepage/HomePage.module.css";
import DiscountIcon from "../../../public/icons/DiscountIcon";
import SupportIcon from "../../../public/icons/SupportIcon";
import HeartIcon from "../../../public/icons/HeartIcon";

async function HomePage({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <div className={styles.heroCover}>
        <Image
          src="/images/heroCover.jpg"
          width={2000}
          height={1000}
          alt="cover-torino"
          priority
        />
      </div>
      <main className={styles.mainContainer}>
        <div className={styles.searchBox}>
          <h1>
            <span>تورینو </span>
            برگزار کننده بهترین تور های داخلی و خارجی
          </h1>
          <SearchBox searchParams={params} />
        </div>
        <Suspense fallback={<ToursListSkeleton />}>
          <ToursList searchParams={params} />
        </Suspense>
        <Banner />
        <WhyTorino />
      </main>
      <div className={styles.features}>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <DiscountIcon />
          </div>
          <div className={styles.featureInfo}>
            <h4>بصرفه ترین قیمت</h4>
            <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <SupportIcon />
          </div>
          <div className={styles.featureInfo}>
            <h4>پشتیبانی</h4>
            <p>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <HeartIcon />
          </div>
          <div className={styles.featureInfo}>
            <h4>رضایت کاربران</h4>
            <p>رضایت بیش از 10هزار کاربر از تور های ما. </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

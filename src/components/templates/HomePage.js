import Head from "next/head";
import Image from "next/image";

import ToursList from "../modules/homepage/ToursList";
import SearchBox from "../modules/homepage/SearchBox";

import styles from "@/styles/homepage/HomePage.module.css";

async function HomePage({ searchParams }) {
  return (
    <>
      <div className={styles.heroCover}>
        <Image
          src="/images/heroCover.jpg"
          width={2000}
          height={1000}
          alt="cover-torino"
        />
      </div>
      <main className={styles.mainContainer}>
        <div className={styles.searchBox}>
          <h1>
            <span>تورینو </span>
            برگزار کننده بهترین تور های داخلی و خارجی
          </h1>
          <SearchBox />
        </div>
        <ToursList searchParams={searchParams} />
      </main>
    </>
  );
}

export default HomePage;

import Head from "next/head";

import styles from "@/styles/HomePage.module.css";
import Image from "next/image";

function HomePage() {
  return (
    <div>
      <div className={styles.heroCover}>
        <Image
          src="/images/heroCover.jpg"
          width={2000}
          height={1000}
          alt="cover-torino"
        />
      </div>
      <h1>HomePage</h1>
    </div>
  );
}

export default HomePage;

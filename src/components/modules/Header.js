"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Header.module.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <Image src="/icons/hamburger.svg" width={20} height={20} alt="menu" />
        </div>

        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/icons/Torino.svg"
              width={146}
              height={44}
              alt="torino-logo"
            />
          </Link>
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
          <li className={styles.activeLink}>
            <Link href="/" onClick={() => setIsOpen(false)}>
              <p>
                {isOpen && <img src="/icons/home.svg" />}
                صفحه اصلی
              </p>
            </Link>
          </li>
          <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
              <p>
                {isOpen && <img src="/icons/airplane-square.svg" />}
                خدمات گردشگری
              </p>
            </Link>
          </li>
          <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
              <p>
                {isOpen && <img src="/icons/volume-low.svg" />}
                درباره ما
              </p>
            </Link>
          </li>
          <li>
            <Link href="#" onClick={() => setIsOpen(false)}>
              <p>
                {isOpen && <img src="/icons/call.svg" />}
                تماس با ما
              </p>
            </Link>
          </li>
        </ul>
        <div className={styles.authButton}>
          <button className={styles.mobileLoginBtn}>
            <Image
              src="/icons/signInButton.svg"
              width={40}
              height={40}
              alt="login"
            />
          </button>
          <button className={styles.loginBtn}>
            <Image
              src="/icons/profile.svg"
              width={24}
              height={24}
              alt="login"
            />
            <span>ورود | ثبت نام</span>
          </button>
        </div>
      </nav>
      <div className={styles.heroCover}>
        <Image
          src="/images/heroCover.jpg"
          width={2000}
          height={1000}
          alt="cover-torino"
        />
      </div>
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </header>
  );
}

export default Header;

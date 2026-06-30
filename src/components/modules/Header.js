"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import AuthModal from "../templates/AuthModal";
import SendOtpForm from "./SendOtpForm";
import CheckOtpForm from "./CheckOtpForm";

import styles from "@/styles/Header.module.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("one");
  const [phone, setPhone] = useState("");
  const [showOption, setShowOption] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  //check for token
  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: () => fetch("/api/auth/check-me").then((res) => res.json()),
  });
  const isLoggedIn = data?.isLoggedIn ?? false;
  const user = data?.user ?? {};

  //opens hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //opens login modal
  const loginHandler = () => {
    router.push("?modal=login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = async () => {
    const res = await axios.post("/api/auth/logout");
    if (res.data.status === "success") {
      queryClient.invalidateQueries(["auth"]);
    }
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
          {isLoggedIn ? (
            <div className={styles.userContainer} ref={dropdownRef}>
              <div
                className={styles.userBtn}
                onClick={() => setShowOption((showOption) => !showOption)}
              >
                <Image
                  src="/icons/profile.svg"
                  width={24}
                  height={24}
                  alt="login"
                />
                <p>{user?.name || user?.mobile}</p>
                <Image
                  src="/icons/arrow-down.svg"
                  width={24}
                  height={24}
                  alt="arrow-down"
                />
              </div>
              {showOption && (
                <ul className={styles.userOptions}>
                  <li className={styles.disabledRow}>
                    <Image
                      src="/icons/profile-2.svg"
                      width={28}
                      height={28}
                      alt="profile"
                    />
                    <p>{user?.name || user?.mobile}</p>
                  </li>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setShowOption((showOption) => !showOption)}
                  >
                    <li>
                      <Image
                        src="/icons/profile-3.svg"
                        width={20}
                        height={20}
                        alt="profile"
                      />
                      <p>اطلاعات حساب کاربری</p>
                    </li>
                  </Link>
                  <li onClick={logoutHandler}>
                    <Image
                      src="/icons/logout.svg"
                      width={20}
                      height={20}
                      alt="logout"
                    />
                    <p>خروج از حساب کاربری</p>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div>
              <button className={styles.mobileLoginBtn} onClick={loginHandler}>
                <Image
                  src="/icons/signInButton.svg"
                  width={40}
                  height={40}
                  alt="login"
                />
              </button>
              <button className={styles.loginBtn} onClick={loginHandler}>
                <Image
                  src="/icons/profile.svg"
                  width={24}
                  height={24}
                  alt="login"
                />
                <span>ورود | ثبت نام</span>
              </button>
            </div>
          )}
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

      <AuthModal>
        {step === "one" && (
          <SendOtpForm setStep={setStep} setPhone={setPhone} />
        )}
        {step === "two" && <CheckOtpForm setStep={setStep} phone={phone} />}
      </AuthModal>
    </header>
  );
}

export default Header;

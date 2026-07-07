"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import AuthModal from "../templates/AuthModal";
import SendOtpForm from "./SendOtpForm";
import CheckOtpForm from "./CheckOtpForm";
import ActiveLink from "../elements/ActiveLink";

//style & icons
import styles from "@/styles/Header.module.css";
import HamburgerIcon from "../../../public/icons/HamburgerIcon";
import HomeIcon from "../../../public/icons/HomeIcon";
import AirplaneIcon from "../../../public/icons/AirplaneSquareIcon";
import VolumeLowIcon from "../../../public/icons/VolumeLowIcon";
import CallIcon from "../../../public/icons/CallIcon";
import ProfileIcon from "../../../public/icons/ProfileIcon";
import ArrowDownIcon from "../../../public/icons/ArrowDownIcon";
import Profile3Icon from "../../../public/icons/Profile3Icon";
import LogoutIcon from "../../../public/icons/LogoutIcon";
import SignInButtonIcon from "../../../public/icons/SignInButtonIcon";

function Header() {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("one");
  const [phone, setPhone] = useState("");
  const [showOption, setShowOption] = useState(false);
  const dropdownRef = useRef(null);

  //check for token
  const { data, isPending } = useQuery({
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

  //clear searchparams if isLoggedIn
  // useEffect(() => {
  //   if (isLoggedIn && searchParams.get("modal") === "login") {
  //     router.replace(pathname);
  //   }
  // }, [isLoggedIn, searchParams, pathname, router]);

  //closing drop-down
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //log-out function
  const logoutHandler = async () => {
    const res = await axios.post("/api/auth/logout");
    if (res.data.status === "success") {
      setShowOption((showOption) => !showOption);
      queryClient.setQueryData(["auth"], {
        isLoggedIn: false,
        user: null,
      });
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <HamburgerIcon />
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
          <li
          // className={styles.activeLink}
          >
            <ActiveLink
              href="/"
              activeClassName={styles.activeItem}
              onClick={() => setIsOpen(false)}
            >
              <p>
                {isOpen && <HomeIcon />}
                صفحه اصلی
              </p>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/info#tourism-services"
              activeClassName={styles.activeItem}
              onClick={() => setIsOpen(false)}
            >
              <p>
                {isOpen && <AirplaneIcon />}
                خدمات گردشگری
              </p>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/info#about-us"
              activeClassName={styles.activeItem}
              onClick={() => setIsOpen(false)}
            >
              <p>
                {isOpen && <VolumeLowIcon />}
                درباره ما
              </p>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/info#contact-us"
              activeClassName={styles.activeItem}
              onClick={() => setIsOpen(false)}
            >
              <p>
                {isOpen && <CallIcon />}
                تماس با ما
              </p>
            </ActiveLink>
          </li>
        </ul>
        <div className={styles.authButton}>
          {isLoggedIn ? (
            <div className={styles.userContainer} ref={dropdownRef}>
              <div
                className={styles.userBtn}
                onClick={() => {
                  if (isLoggedIn) {
                    setShowOption((showOption) => !showOption);
                  }
                }}
              >
                <ProfileIcon />
                <p>{user?.name || user?.mobile}</p>
                <ArrowDownIcon />
              </div>
              {showOption && (
                <ul className={styles.userOptions}>
                  <li className={styles.disabledRow}>
                    <ProfileIcon />
                    <p>{user?.name || user?.mobile}</p>
                  </li>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setShowOption((showOption) => !showOption)}
                  >
                    <li>
                      <Profile3Icon />
                      <p>اطلاعات حساب کاربری</p>
                    </li>
                  </Link>
                  <li onClick={logoutHandler}>
                    <LogoutIcon />
                    <p>خروج از حساب کاربری</p>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div>
              <button
                className={styles.mobileLoginBtn}
                onClick={loginHandler}
                disabled={isPending}
              >
                <SignInButtonIcon />
              </button>
              <button
                className={styles.loginBtn}
                onClick={loginHandler}
                disabled={isPending}
              >
                <ProfileIcon />
                <span>ورود | ثبت نام</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

      {!isLoggedIn && !isPending && (
        <Suspense fallback={null}>
          <AuthModal>
            {step === "one" && (
              <SendOtpForm
                setStep={setStep}
                setPhone={setPhone}
                phone={phone}
              />
            )}
            {step === "two" && <CheckOtpForm setStep={setStep} phone={phone} />}
          </AuthModal>
        </Suspense>
      )}
    </header>
  );
}

export default Header;

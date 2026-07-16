"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "@/styles/AuthModal.module.css";

function AuthModal({ children, setStep, setPhone }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isOpen = searchParams.get("modal") === "login";

  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      router.replace(pathname);
      setStep("one");
      setPhone("");
    }
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      {children}
    </div>
  );
}

export default AuthModal;

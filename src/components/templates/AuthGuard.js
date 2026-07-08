"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useGetUserData } from "@/services/queries";

export default function AuthGuard({ children }) {
  const router = useRouter();

  const { data, isPending } = useGetUserData();

  const isLoggedIn = data?.isLoggedIn;

  useEffect(() => {
    if (!isPending && (!data || !isLoggedIn)) {
      router.push("/");
    }
  }, [data, isPending, router]);

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>در حال بررسی سطح دسترسی...</p>
      </div>
    );
  }

  return isLoggedIn ? children : null;
}

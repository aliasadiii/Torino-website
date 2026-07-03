"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: () => fetch("/api/auth/check-me").then((res) => res.json()),
  });

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
        <p>در حال بررسی دسترسی...</p>
      </div>
    );
  }

  return isLoggedIn ? children : null;
}

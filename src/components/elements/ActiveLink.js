"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
  activeClassName,
  className,
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className || ""} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
}

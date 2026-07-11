"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
  activeClassName,
  className,
  onClick,
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className || ""} ${isActive ? activeClassName : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

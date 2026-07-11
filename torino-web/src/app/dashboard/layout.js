import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import DashboardSidebar from "@/components/modules/DashboardSidebar";

import styles from "@/styles/DashboardLayout.module.css";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/");
  }

  return (
    <div className={styles.layoutContainer}>
      <DashboardSidebar />
      {children}
    </div>
  );
}

import DashboardSidebar from "@/components/modules/DashboardSidebar";

import styles from "@/styles/DashboardLayout.module.css";
import AuthGuard from "@/components/templates/AuthGuard";

export default async function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className={styles.layoutContainer}>
        <DashboardSidebar />
        {children}
      </div>
    </AuthGuard>
  );
}

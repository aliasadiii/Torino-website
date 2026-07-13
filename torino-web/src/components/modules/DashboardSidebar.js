import ActiveLink from "@/components/elements/ActiveLink";

//style & icons
import styles from "@/styles/DashboardSidebar.module.css";
import ConvertCardIcon from "../../../public/icons/ConvertCardIcon";
import SunFogIcon from "../../../public/icons/SunFogIcon";
import ProfileIcon from "../../../public/icons/ProfileIcon";

function DashboardSideBar() {
  return (
    <div className={styles.container}>
      <ActiveLink
        href="/dashboard/profile"
        activeClassName={styles.activeMenuItem}
        className={styles.menuItem}
      >
        <ProfileIcon />
        <span>پروفایل</span>
      </ActiveLink>
      <ActiveLink
        href="/dashboard/my-tours"
        activeClassName={styles.activeMenuItem}
        className={styles.menuItem}
      >
        <SunFogIcon />
        <span>تورهای من</span>
      </ActiveLink>
      <ActiveLink
        href="/dashboard/transactions"
        activeClassName={styles.activeMenuItem}
        className={styles.menuItem}
      >
        <ConvertCardIcon />
        <span>تراکنش ها</span>
      </ActiveLink>
    </div>
  );
}

export default DashboardSideBar;

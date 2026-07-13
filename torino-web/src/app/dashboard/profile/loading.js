import pageStyles from "@/styles/ProfilePage.module.css";
import styles from "@/styles/skeletons/ProfileLoading.module.css";

const userFields = Array.from({ length: 5 });
const bankFields = Array.from({ length: 2 });

function SkeletonLine({ className = "" }) {
  return (
    <span className={`${styles.skeleton} ${className}`} aria-hidden="true" />
  );
}

function ProfileInfoSkeleton() {
  return (
    <section className={styles.profileCard}>
      <div className={styles.profileDetails}>
        <SkeletonLine className={styles.profileTitle} />
        <SkeletonLine className={styles.profileValue} />
      </div>
      <div className={styles.profileEmail}>
        <SkeletonLine className={styles.profileValue} />
        <SkeletonLine className={styles.actionButton} />
      </div>
    </section>
  );
}

function UserInfoSkeleton() {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <SkeletonLine className={styles.sectionTitle} />
        <SkeletonLine className={styles.editButton} />
      </div>

      <div className={styles.fieldsGrid}>
        {userFields.map((_, index) => (
          <div className={styles.field} key={index}>
            <SkeletonLine className={styles.fieldLabel} />
            <SkeletonLine className={styles.fieldValue} />
          </div>
        ))}
      </div>
    </section>
  );
}

function UserBankInfoSkeleton() {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <SkeletonLine className={styles.sectionTitle} />
        <SkeletonLine className={styles.editButton} />
      </div>

      <div className={styles.bankGrid}>
        {bankFields.map((_, index) => (
          <div className={styles.field} key={index}>
            <SkeletonLine className={styles.fieldLabel} />
            <SkeletonLine
              className={index === 0 ? styles.accountValue : styles.shabaValue}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProfileLoading() {
  return (
    <div
      className={`${pageStyles.container} ${styles.container}`}
      role="status"
      aria-label="در حال بارگذاری اطلاعات پروفایل"
      aria-live="polite"
    >
      <ProfileInfoSkeleton />

      <div>
        <UserInfoSkeleton />
      </div>

      <div>
        <UserBankInfoSkeleton />
      </div>

      <span className={styles.screenReaderText}>
        در حال بارگذاری اطلاعات پروفایل...
      </span>
    </div>
  );
}

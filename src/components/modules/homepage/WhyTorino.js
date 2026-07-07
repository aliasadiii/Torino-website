import styles from "@/styles/homepage/WhyTorino.module.css";
import QuestionIcon from "../../../../public/icons/QuestionIcon";
import Slider from "@/components/elements/Slider";

function WhyTorino() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.title}>
          <div>
            <QuestionIcon />
          </div>
          <p>
            چرا <span>تورینو</span> ؟
          </p>
        </div>
        <div className={styles.info}>
          <h4>تور طبیعت گردی و تاریخی</h4>
          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
      </div>
      <div className={styles.left}>
        <Slider />
      </div>
    </div>
  );
}

export default WhyTorino;

import { getTransportationType, toShamsiDate } from "@/utils/tour";

import { TransportationIcons } from "@/constants/TransportationIcons";

import styles from "@/styles/MyToursPage.module.css";
import SunFogIcon from "../../../public/icons/SunFogIcon";

function TourCard({ tour }) {
  const {
    id,
    title,
    startDate,
    endDate,
    fleetVehicle,
    price,
    origin,
    destination,
  } = tour;

  const Icon = TransportationIcons[fleetVehicle] || null;

  const isFinished = new Date(endDate) < new Date();
  const statusText = isFinished ? "به اتمام رسیده" : "در حال برگزاری";
  const statusClass = isFinished ? styles.badgeSuccess : styles.badgeWarning;

  return (
    <div className={styles.tourCard}>
      <div className={statusClass + " " + styles.tourBadge}>{statusText}</div>

      <div className={styles.tourTitle}>
        <div className={styles.tourName}>
          <SunFogIcon />
          <p>{title}</p>
        </div>
        <div className={styles.tourVehicle}>
          {Icon && <Icon />}
          <p>
            سفر با <span>{getTransportationType(fleetVehicle)}</span>
          </p>
        </div>
      </div>
      <div className={styles.tourDate}>
        <div className={styles.tourStart}>
          <p>{`${origin.persianName} به ${destination.persianName}`}</p>
          <span>{toShamsiDate(startDate)}</span>
        </div>
        <div className={styles.tourEnd}>
          <p>تاریخ برگشت</p>
          <span>{toShamsiDate(endDate)}</span>
        </div>
      </div>
      <div className={styles.tourInfo}>
        <div className={styles.tourNumber}>
          <p>شماره تور</p>
          <span>{id?.split("-")[0].toUpperCase()}</span>
        </div>
        <div className={styles.tourPrice}>
          <p>مبلغ پرداخت شده</p>
          <span>{price.toLocaleString("en-US")} تومان</span>
        </div>
      </div>
    </div>
  );
}

export default TourCard;

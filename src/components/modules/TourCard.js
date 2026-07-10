import { getTransportationType, toShamsiDate } from "@/utils/tour";

import styles from "@/styles/MyToursPage.module.css";
import SunFogIcon from "../../../public/icons/SunFogIcon";
import AirplaneIcon from "../../../public/icons/AirplaneIcon";
import BusIcon from "../../../public/icons/BusIcon";
import ShipIcon from "../../../public/icons/ShipIcon";
import TrainIcon from "../../../public/icons/TrainIcon";
import CarSuvIcon from "../../../public/icons/CarSuvIcon";
import VanIcon from "../../../public/icons/VanIcon";

const transportationIcons = {
  bus: BusIcon,
  van: VanIcon,
  SUV: CarSuvIcon,
  airplane: AirplaneIcon,
  ship: ShipIcon,
  train: TrainIcon,
};

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

  const Icon = transportationIcons[fleetVehicle] || null;

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
          <span>{id.split("-")[0].toUpperCase()}</span>
        </div>
        <div className={styles.tourPrice}>
          <p>مبلغ پرداخت شده</p>
          <span>{price.toLocaleString("en-US")},000 تومان</span>
        </div>
      </div>
    </div>
  );
}

export default TourCard;

import Image from "next/image";

import { dateDetails, getTransportationType, toShamsiDate } from "@/utils/tour";
import ReserveButton from "../elements/ReserveButton";

import { TransportationIcons } from "@/constants/TransportationIcons";

import styles from "@/styles/TourDetailPage.module.css";
import UserTickIcon from "../../../public/icons/UserTickIcon";
import MapIcon from "../../../public/icons/MapIcon";
import MedalStarIcon from "../../../public/icons/MedalStarIcon";
import RoutingIcon from "../../../public/icons/RoutingIcon";
import CalendarStartIcon from "../../../public/icons/CalendarStartIcon";
import CalendarEndIcon from "../../../public/icons/CalendarEndIcon";
import ProfileUserIcon from "../../../public/icons/ProfileUserIcon";
import SecurityIcon from "../../../public/icons/SecurityIcon";

function TourDetailPage({ tour }) {
  const {
    id,
    image,
    title,
    startDate,
    endDate,
    fleetVehicle,
    price,
    origin,
    capacity,
    insurance,
  } = tour;

  const { durationText } = dateDetails(startDate, endDate);
  const Icon = TransportationIcons[fleetVehicle] || null;

  return (
    <div className={styles.outsideContainer}>
      <main className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={title}
              unoptimized
              className={styles.tourImage}
              fill
            />
          </div>
          <div className={styles.tourInfo}>
            <div className={styles.tourTitle}>
              <h2>{title}</h2>
              <p>{durationText}</p>
            </div>
            <div className={styles.tourFeature}>
              <p>
                <UserTickIcon />

                <span>تورلیدر از مبدا</span>
              </p>
              <p>
                <MapIcon />
                <span>برنامه سفر</span>
              </p>
              <p>
                <MedalStarIcon />
                <span>تضمین کیفیت</span>
              </p>
            </div>
            <div className={styles.tourReserve}>
              <ReserveButton path="/checkout" id={id}>
                رزرو و خرید
              </ReserveButton>
              <div>
                <p>{price.toLocaleString("en-US")} </p>
                <span>تومان</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tourDetailsBox}>
          <div className={styles.detailsItem}>
            <div>
              <RoutingIcon />
              <span>مبدا</span>
            </div>
            <p>{origin?.persianName}</p>
          </div>
          <div className={styles.detailsItem}>
            <div>
              <CalendarStartIcon />
              <span>تاریخ رفت</span>
            </div>
            <p>{toShamsiDate(startDate)}</p>
          </div>
          <div className={styles.detailsItem}>
            <div>
              <CalendarEndIcon />
              <span>تاریخ برگشت</span>
            </div>
            <p>{toShamsiDate(endDate)}</p>
          </div>
          <div className={styles.detailsItem}>
            <div>
              {<Icon />}
              <span>حمل و نقل</span>
            </div>
            <p>{getTransportationType(fleetVehicle)}</p>
          </div>
          <div className={styles.detailsItem}>
            <div>
              <ProfileUserIcon />
              <span>ظرفیت</span>
            </div>
            <p>{`حداکثر ${capacity} نفر`}</p>
          </div>
          {insurance.exist && (
            <div className={styles.detailsItem}>
              <div>
                <SecurityIcon />
                <span>بیمه</span>
              </div>
              <p>{insurance?.amount}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TourDetailPage;

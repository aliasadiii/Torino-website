import { cookies } from "next/headers";

import api from "@/configs/api";

import ServerError from "@/components/modules/ServerError";
import CheckoutPage from "@/components/templates/CheckoutPage";
import Button from "@/components/elements/Button";

import styles from "@/styles/CheckoutPage.module.css";

export const metadata = {
  title: "تسویه حساب",
  description: "تکمیل فرآیند خرید و پرداخت تور",
};

async function Checkout() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await api.get("basket", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return <CheckoutPage tour={res?.data} />;
  } catch (error) {
    const status = error?.response?.status;

    if (status === 404) {
      return (
        <div className={styles.emptyBasket}>
          <h1>در حال حاظر سبد خرید شما خالی است !</h1>
          <Button path="/#tours-list">رزرو و خرید تور </Button>
        </div>
      );
    }

    if (status >= 500) {
      return <ServerError />;
    }

    return <div>خطایی رخ داده است</div>;
  }
}

export default Checkout;

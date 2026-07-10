"use client";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { DatePicker } from "zaman";
import toast from "react-hot-toast";

import { useGetUserData } from "@/services/queries";
import { checkoutOrder } from "@/services/tour";
import { formatDate } from "@/utils/formatDate";
import { dateDetails } from "@/utils/tour";

import styles from "@/styles/CheckoutPage.module.css";
import ProfileIcon from "../../../public/icons/ProfileIcon";

function CheckoutPage({ tour }) {
  const router = useRouter();
  const { price, title, startDate, endDate } = tour;
  const { durationText } = dateDetails(startDate, endDate);

  const { data } = useGetUserData();
  const user = data?.user ?? {};

  const { register, control, handleSubmit } = useForm();

  const { mutate, isPending } = useMutation({ mutationFn: checkoutOrder });

  const submitHandler = async (data) => {
    mutate(
      {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
        birthDate: formatDate(data?.birthDate),
      },
      {
        onSuccess: (data) => {
          toast.success("ارسال به درگاه پرداخت...");
          // router.push("/payment?status=success");
          setTimeout(() => {
            router.push("/payment?status=success");
            router.refresh();
          }, 2000); //for develop only
          // location.href = "https://payGate.com";
        },

        onError: (error) => {
          toast.error(
            "خرید با خطا مواجه شد لطفا بعد از چند دقیقه دوباره تلاش کنید !",
          );
        },
      },
    );
  };

  return (
    <div className={styles.outsideContainer}>
      <div className={styles.container}>
        <form
          id="checkout-form"
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
        >
          <h3 className={styles.profileHeader}>
            <ProfileIcon />
            <span>مشخصات مسافر</span>
          </h3>
          <input
            type="text"
            placeholder="نام"
            defaultValue={user?.firstName || ""}
            {...register("firstName")}
          />
          <input
            type="text"
            placeholder="نام خانوادگی"
            defaultValue={user?.lastName || ""}
            {...register("lastName")}
          />
          <input
            type="number"
            placeholder="کدملی"
            defaultValue={user?.nationalCode || ""}
            {...register("nationalCode")}
          />
          <select
            className={styles.genderSelector}
            {...register("gender")}
            defaultValue={user?.gender}
          >
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>

          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                onChange={(e) => onChange(e.value)}
                inputAttributes={{
                  placeholder: `تاریخ تولد`,
                }}
                defaultValue={
                  user?.birthDate ? new Date(user.birthDate) : value
                }
                accentColor="#28a745"
                customShowDateFormat="DD MMMM YYYY"
                round="x2"
              />
            )}
          />
        </form>
        <div className={styles.tourBox}>
          <div className={styles.tourTitle}>
            <h4>{title}</h4>
            <span>{durationText}</span>
          </div>
          <div className={styles.tourPrice}>
            <h4>قیمت نهایی</h4>
            <p>
              {price.toLocaleString("en-US")}
              <span> تومان</span>
            </p>
          </div>
          <button type="submit" form="checkout-form" disabled={isPending}>
            ثبت و خرید نهایی
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

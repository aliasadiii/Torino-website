"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "zaman";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

import { userInfoSchema } from "@/schema/form";
import { convertToPersianDateTime, formatDate } from "@/utils/formatDate";

import styles from "@/styles/ProfilePage.module.css";
import EditIcon from "../../../../public/icons/EditIcon";

function UserInfo({ user, sendUserMutation }) {
  const [edit, setEdit] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInfoSchema),
  });

  const submitHandler = async (data) => {
    const payload = {
      ...data,
      birthDate: data.birthDate
        ? formatDate(data.birthDate)
        : user?.birthDate || null,
    };
    sendUserMutation.mutate(payload, {
      onSuccess: () => {
        setEdit(false);
        toast.success("تغییرات با موفقیت اعمال شد");
      },
      onError: () => {
        toast.error("ویرایش اطلاعات با خطا مواجه شد.");
      },
    });
  };

  const cancelHandler = () => {
    reset();
    setEdit(false);
  };

  return (
    <div className={styles.profileInfo} style={{ marginTop: "35px" }}>
      {edit ? (
        <form
          className={styles.editForm + " " + styles.extraForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <h3 className={styles.profileHeader}>ویرایش اطلاعات شخصی</h3>

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
            type="text"
            placeholder="کدملی"
            defaultValue={user?.nationalCode || ""}
            {...register("nationalCode")}
          />
          <select
            className={styles.genderSelector}
            {...register("gender")}
            defaultValue={user?.gender}
          >
            <option value="">انتخاب جنسیت</option>
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
                className={styles.datePicker}
              />
            )}
          />

          {errors && (
            <div className={styles.errorsBox}>
              {errors.firstName && (
                <p className={styles.errorText}>{errors.firstName.message}</p>
              )}
              {errors.lastName && (
                <p className={styles.errorText}>{errors.lastName.message}</p>
              )}
              {errors.nationalCode && (
                <p className={styles.errorText}>
                  {errors.nationalCode.message}
                </p>
              )}
              {errors.gender && (
                <p className={styles.errorText}>{errors.gender.message}</p>
              )}
              {errors.birthDate && (
                <p className={styles.errorText}>{errors.birthDate.message}</p>
              )}
            </div>
          )}

          <div className={styles.buttons}>
            <button type="submit" disabled={sendUserMutation.isPending}>
              تایید
            </button>
            <button type="button" onClick={cancelHandler}>
              انصراف
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.profileHeader}>
            <h3>اطلاعات شخصی</h3>
            <div className={styles.editButton} onClick={() => setEdit(true)}>
              <EditIcon />
              <span>ویرایش اطلاعات</span>
            </div>
          </div>
          <div className={styles.profileDetails + " " + styles.userInfo}>
            <div className={styles.profileItem}>
              <p>نام و نام خانوادگی</p>
              <span>
                {user?.firstName || "---"} {user?.lastName || "---"}
              </span>
            </div>
            <div className={styles.profileItem}>
              <p>کدملی</p>
              <span>{user?.nationalCode || "---"}</span>
            </div>
            <div className={styles.profileItem}>
              <p>جنسیت</p>
              <span>
                {user?.gender === "male"
                  ? "مرد"
                  : user?.gender === "female"
                    ? "زن"
                    : "---"}
              </span>
            </div>
            <div className={styles.profileItem}>
              <p>تاریخ تولد</p>
              <span>
                {user?.birthDate
                  ? convertToPersianDateTime(user.birthDate)
                  : "---"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserInfo;

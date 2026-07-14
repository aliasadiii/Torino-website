"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

import { userBankInfoSchema } from "@/schema/form";

import styles from "@/styles/ProfilePage.module.css";
import EditIcon from "../../../../public/icons/EditIcon";

function UserBankInfo({ user, sendUserMutation }) {
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userBankInfoSchema),
  });

  const submitHandler = async (data) => {
    sendUserMutation.mutate(
      {
        payment: {
          shaba_code: data.shaba_code?.trim().toUpperCase() || "",
          debitCard_code: data.debitCard_code?.trim() || "",
          accountIdentifier: data.accountIdentifier?.trim() || "",
        },
      },
      {
        onSuccess: () => {
          setEdit(false);
          toast.success("تغییرات با موفقیت اعمال شد");
        },
        onError: () => {
          toast.error("ویرایش اطلاعات با خطا مواجه شد.");
        },
      },
    );
  };

  const cancelHandler = () => {
    setEdit(false);
    reset();
  };

  return (
    <div className={styles.profileInfo} style={{ marginTop: "35px" }}>
      {edit ? (
        <form
          className={styles.editForm + " " + styles.extraForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <h3 className={styles.profileHeader}>ویرایش اطلاعات حساب بانکی</h3>
          <input
            type="text"
            placeholder="شماره شبا، مانند IR..."
            defaultValue={user?.payment?.shaba_code || ""}
            {...register("shaba_code")}
          />
          <input
            type="text"
            inputMode="numeric"
            maxLength={16}
            placeholder="شماره کارت"
            defaultValue={user?.payment?.debitCard_code || ""}
            {...register("debitCard_code")}
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="شماره حساب"
            defaultValue={user?.payment?.accountIdentifier || ""}
            {...register("accountIdentifier")}
          />

          {errors && (
            <div className={styles.errorsBox}>
              {errors.shaba_code && (
                <p className={styles.errorText}>{errors.shaba_code.message}</p>
              )}
              {errors.debitCard_code && (
                <p className={styles.errorText}>
                  {errors.debitCard_code.message}
                </p>
              )}
              {errors.accountIdentifier && (
                <p className={styles.errorText}>
                  {errors.accountIdentifier.message}
                </p>
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
            <h3>اطلاعات حساب بانکی</h3>
            <div className={styles.editButton} onClick={() => setEdit(true)}>
              <EditIcon />
              <span>ویرایش اطلاعات</span>
            </div>
          </div>
          <div className={styles.profileDetails + " " + styles.userInfo}>
            <div className={styles.profileItem}>
              <p>شماره شبا</p>
              <span>{user?.payment?.shaba_code || "---"}</span>
            </div>
            <div className={styles.profileItem}>
              <p>شماره کارت</p>
              <span>{user?.payment?.debitCard_code || "---"}</span>
            </div>
            <div className={styles.profileItem}>
              <p>شماره حساب</p>
              <span>{user?.payment?.accountIdentifier || "---"}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserBankInfo;

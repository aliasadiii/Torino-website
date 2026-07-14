"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { profileInfoSchema } from "@/schema/form";

import styles from "@/styles/ProfilePage.module.css";
import EditIcon from "../../../../public/icons/EditIcon";

function ProfileInfo({ user, sendUserMutation }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileInfoSchema),
  });

  const [edit, setEdit] = useState(false);

  const submitHandler = async (email) => {
    if (email.email === user.email) {
      setEdit(false);
      return;
    }

    sendUserMutation.mutate(email, {
      onSuccess: () => {
        setEdit(false);
        toast.success("تغییرات با موفقیت اعمال شد");
      },
      onError: () => {
        toast.error("ویرایش اطلاعات با خطا مواجه شد.");
      },
    });
  };

  return (
    <div className={styles.profileInfo}>
      <h3 className={styles.profileHeader}>اطلاعات حساب کاربری</h3>
      <div className={styles.profileDetails}>
        <div className={styles.profileItem}>
          <p>شماره موبایل :</p>
          <span>{user?.mobile}</span>
        </div>
        {edit ? (
          <form
            className={styles.editForm}
            onSubmit={handleSubmit(submitHandler)}
            noValidate
          >
            <div>
              <input
                type="email"
                placeholder="آدرس ایمیل"
                defaultValue={user?.email || ""}
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email?.message}</p>
              )}
            </div>
            <button type="submit" disabled={sendUserMutation.isPending}>
              تایید
            </button>
          </form>
        ) : (
          <div className={styles.profileItem}>
            <div className={styles.profileItem}>
              <p>ایمیل :</p>
              <span>{user?.email || "---"}</span>
            </div>
            <div className={styles.editButton} onClick={() => setEdit(true)}>
              <EditIcon />
              <span>{user?.email ? "ویرایش" : "افزودن"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;

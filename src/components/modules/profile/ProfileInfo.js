"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import EditIcon from "../../../../public/icons/EditIcon";

// import styles from "@/styles/profile/ProfilePage.module.css";
import styles from "@/styles/profile/ProfileInfo.module.css";

function ProfileInfo({ user, sendUserMutation }) {
  const { register, handleSubmit, setError } = useForm();
  const [edit, setEdit] = useState(false);

  const submitHandler = async (email) => {
    if (!email.email) {
      setEdit(false);
      return;
    }
    try {
      sendUserMutation.mutateAsync(email);
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
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
          >
            <input
              type="email"
              placeholder="آدرس ایمیل"
              defaultValue={user?.email || ""}
              {...register("email")}
            />
            <button type="submit">تایید</button>
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

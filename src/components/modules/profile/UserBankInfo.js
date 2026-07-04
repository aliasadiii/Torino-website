import { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "@/styles/profile/ProfileInfo.module.css";
import EditIcon from "../../../../public/icons/EditIcon";

function UserBankInfo({ user, sendUserMutation }) {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit, reset, setError } = useForm();

  const submitHandler = async (data) => {
    console.log({});
    try {
      sendUserMutation.mutateAsync({
        payment: { ...data },
      });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
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
            type="number"
            placeholder="شماره شبا"
            defaultValue={user?.payment?.shaba_code || ""}
            {...register("shaba_code")}
          />
          <input
            type="number"
            placeholder="شماره کارت"
            defaultValue={user?.payment?.debitCard_code || ""}
            {...register("debitCard_code")}
          />
          <input
            type="number"
            placeholder="شماره حساب"
            defaultValue={user?.payment?.accountIdentifier || ""}
            {...register("accountIdentifier")}
          />

          <div className={styles.buttons}>
            <button type="submit">تایید</button>
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

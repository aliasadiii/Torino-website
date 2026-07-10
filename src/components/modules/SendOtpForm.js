"use client";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/form";
import toast from "react-hot-toast";

import styles from "@/styles/LoginModal.module.css";

function SendOtpForm({ setStep, setPhone, phone, sendOtpMutation }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //close login
  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      router.replace(pathname);
    }
  };

  //login process
  const submitHandler = async ({ phoneNumber }) => {
    sendOtpMutation.mutate(phoneNumber, {
      onSuccess: (data, phoneNumber) => {
        setPhone(phoneNumber);
        setStep("two");
        toast.success(`کد با موفقیت ارسال شد :${data?.res?.data?.code}`, {
          duration: 5000,
        });
        //for develop only
      },
      onError: (error) => {
        setError("otpError", { message: `${error?.res?.data?.message}` });
      },
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.close} onClick={closeModal}>
        +
      </p>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h2>ورود به تورینو</h2>
        <label htmlFor="phoneNumber">شماره موبایل خود را وارد کنید</label>
        <input
          className={styles.input}
          id="phoneNumber"
          type="number"
          defaultValue={phone || ""}
          placeholder="4253***0912"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber?.message}</span>}
        {errors.otpCode && <span>{errors.otpCode?.message}</span>}
        {errors.otpError && <span>{errors.otpError?.message}</span>}

        <button type="submit" className={styles.enterBtn}>
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
}

export default SendOtpForm;

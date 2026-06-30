"use client";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/form";

import styles from "@/styles/LoginModal.module.css";
import { sendOtp } from "@/services/auth";

function SendOtpForm({ setStep, setPhone }) {
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
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,

    onSuccess: (data, phoneNumber) => {
      // console.log(data.res.data.code);
      setPhone(phoneNumber);
      setStep("two");

      setError("otpCode", {
        message: `کد ارسال شده :${data?.res?.data?.code}`,
      }); //for develop only //replace with a toast later
    },

    onError: (error) => {
      setError("otpError", { message: `${error?.res?.data?.message}` });
    },
  });

  const submitHandler = async ({ phoneNumber }) => {
    sendOtpMutation.mutate(phoneNumber);
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
          placeholder="4253***0912"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber?.message}</span>}
        {errors.otpCode && <span>{errors.otpCode?.message}</span>}
        {errors.otpError && <span>{errors.otpError?.message}</span>}

        <button type="submit">ارسال کد تایید</button>
      </form>
    </div>
  );
}

export default SendOtpForm;

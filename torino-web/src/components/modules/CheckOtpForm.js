"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { checkOtp } from "@/services/auth";
import { formatTime } from "@/utils/formatDate";

import styles from "@/styles/LoginModal.module.css";
import LineArrowLeftIcon from "../../../public/icons/LineArrowLeftIcon";

function CheckOtpForm({ setStep, phone, setPhone, sendOtpMutation }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(90);

  //check otp process
  const checkOtpMutation = useMutation({
    mutationFn: checkOtp,

    onSuccess: async (data) => {
      setOtpError("");
      setStep("one");
      const { accessToken, refreshToken, user } = data.res.data;
      toast.success("با موفقیت وارد شدید");

      //setting token in cookie
      const response = await axios.post("/api/auth/set-cookie", {
        accessToken,
        refreshToken,
      });
      const statusCheck = response.data.status;
      //setting data in [auth]
      if (statusCheck === "success") {
        queryClient.setQueryData(["user"], {
          isLoggedIn: true,
          user,
        });
        setPhone("");
        router.replace(pathname);
      } else toast.error("لطفا دوباره تلاش کنید");
    },

    onError: () => {
      setOtpError("کد وارد شده فاقد اعتبار است!");
    },
  });

  //submit form data
  const submitHandler = (event) => {
    event.preventDefault();
    if (otp.length < 5) {
      setOtpError("کد ارسال شده را وارد کنید !");
      return;
    }
    checkOtpMutation.mutate({ mobile: phone, code: otp });
  };

  //count down for counter
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  //resend otp code
  const resendOtpHandler = () => {
    setTimer(90);
    setOtp("");
    console.log(phone);
    sendOtpMutation.mutate(phone, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(`کد جدید ارسال شد :${data?.res?.data?.code}`, {
          duration: 5000,
        });
        //for develop only
      },
    });
  };

  return (
    <div className={styles.container}>
      <LineArrowLeftIcon
        className={styles.stepBack}
        onClick={() => setStep("one")}
      />
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>کد تایید را وارد کنید.</h2>
        <p className={styles.message}>
          کد تایید به شماره <span>{phone}</span> ارسال شد
        </p>
        <OTPInput
          containerStyle={styles.otpBox}
          inputStyle={styles.otpInput}
          inputType="tel"
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderSeparator={<span></span>}
          renderInput={(props) => <input {...props} />}
        />

        <div className={styles.counterWrapper}>
          {timer > 0 ? (
            <p className={styles.counter}>
              {formatTime(timer)} تا ارسال مجدد کد
            </p>
          ) : (
            <button
              type="button"
              onClick={resendOtpHandler}
              className={styles.resendBtn}
            >
              ارسال مجدد کد
            </button>
          )}
        </div>

        {otpError && (
          <span style={{ paddingTop: "5px", fontSize: "15px" }}>
            {otpError}
          </span>
        )}
        <button
          type="submit"
          style={{ marginTop: "20px" }}
          disabled={checkOtpMutation.isPending || checkOtpMutation.isSuccess}
          className={`${checkOtpMutation.isPending ? styles.disabledBtn : ""} + ${styles.enterBtn}`}
        >
          ورود به تورینو
        </button>
      </form>
    </div>
  );
}

export default CheckOtpForm;

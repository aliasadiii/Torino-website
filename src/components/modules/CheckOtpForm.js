"use client";

import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import OTPInput from "react-otp-input";
import { checkOtp } from "@/services/auth";

import styles from "@/styles/LoginModal.module.css";

function CheckOtpForm({ setStep, phone }) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  //check otp process
  const checkOtpMutation = useMutation({
    mutationFn: checkOtp,

    onSuccess: async (data) => {
      setOtpError("");

      const { accessToken, refreshToken, user } = data.res.data;

      //setting token in cookie
      const response = await axios.post("/api/auth/set-cookie", {
        accessToken,
        refreshToken,
      });
      const statusCheck = response.data.status;
      //setting data in [auth]
      if (statusCheck === "success") {
        queryClient.setQueryData(["auth"], {
          isLoggedIn: true,
          user,
        });
        router.replace(window.location.pathname);
        router.refresh();
      } else setOtpError("لطفا دوباره تلاش کنید");
    },

    onError: () => {
      setOtpError("کد وارد شده فاقد اعتبار است!");
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    if (otp.length < 5) {
      setOtpError("کد ارسال شده را وارد کنید !");
      return;
    }
    checkOtpMutation.mutate({ mobile: phone, code: otp });
  };

  return (
    <div className={styles.container}>
      <img
        src="/icons/Line-arrow-left.svg"
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
        <p className={styles.counter}>1:25 تا ارسال مجدد کد</p>
        {otpError && (
          <span style={{ paddingTop: "5px", fontSize: "15px" }}>
            {otpError}
          </span>
        )}
        <button
          type="submit"
          style={{ marginTop: "20px" }}
          disabled={checkOtpMutation.isPending || checkOtpMutation.isSuccess}
          className={checkOtpMutation.isPending ? styles.disabledBtn : ""}
        >
          ورود به تورینو
        </button>
      </form>
    </div>
  );
}

export default CheckOtpForm;

import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OTPInput() {
  const [otp, setOtp] = useState("");

  return (
    <OtpInput
      id="otpCode"
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
  );
}

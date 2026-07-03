import { object, string } from "yup";

const loginSchema = object({
  phoneNumber: string()
    .trim()
    .required("شماره موبایل خود را وارد کنید.")
    .matches(/^09\d{9}$/, "فرمت شماره اشتباه است"),
});

export { loginSchema };

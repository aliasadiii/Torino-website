import { date, mixed, object, string } from "yup";

const loginSchema = object({
  phoneNumber: string()
    .trim()
    .required("شماره موبایل خود را وارد کنید.")
    .matches(/^09\d{9}$/, "فرمت شماره اشتباه است"),
});

const profileInfoSchema = object({
  email: string().trim().email("فرمت ایمیل اشتباه است"),
});

const userInfoSchema = object({
  firstName: string()
    .trim()
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد")
    .matches(/^[a-zA-Z\u0600-\u06FF\s]*$/, "نام فقط می‌تواند شامل حروف باشد"),

  lastName: string()
    .trim()
    .max(50, "نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد")
    .matches(
      /^[a-zA-Z\u0600-\u06FF\s]*$/,
      "نام خانوادگی فقط می‌تواند شامل حروف باشد",
    ),

  nationalCode: string()
    .trim()
    .matches(/^\d{10}$/, {
      message: "کد ملی باید دقیقاً ۱۰ رقم باشد",
      excludeEmptyString: true,
    }),

  gender: mixed()
    .oneOf(["male", "female", ""], "جنسیت انتخاب‌شده معتبر نیست")
    .nullable(),

  birthDate: date()
    .nullable()
    .typeError("تاریخ تولد معتبر نیست")
    .max(new Date(), "تاریخ تولد نمی‌تواند در آینده باشد"),
});

const userBankInfoSchema = object({
  shaba_code: string()
    .trim()
    .uppercase()
    .matches(/^IR\d{24}$/, {
      message: "شماره شبا باید با IR شروع شود و شامل ۲۴ رقم باشد",
      excludeEmptyString: true,
    }),

  debitCard_code: string()
    .trim()
    .matches(/^\d{16}$/, {
      message: "شماره کارت باید دقیقاً ۱۶ رقم باشد",
      excludeEmptyString: true,
    }),

  accountIdentifier: string()
    .trim()
    .matches(/^\d+$/, {
      message: "شماره حساب فقط باید شامل عدد باشد",
      excludeEmptyString: true,
    })
    .max(30, "شماره حساب نمی‌تواند بیشتر از ۳۰ رقم باشد"),
});

export { loginSchema, profileInfoSchema, userInfoSchema, userBankInfoSchema };

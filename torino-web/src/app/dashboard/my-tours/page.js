import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/configs/api";

import ServerError from "@/components/modules/ServerError";
import MyToursPage from "@/components/templates/MyToursPage";

export const metadata = {
  title: "تورهای من",
  description: "مشاهده تورهای رزرو شده و اطلاعات مربوط به آن‌ها",
};

async function MyTours() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      redirect("/");
    }

    const res = await api.get("user/tours", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return <MyToursPage tours={res?.data} />;
  } catch (error) {
    const status = error?.response?.status;

    if (status >= 500) {
      return <ServerError />;
    }

    if (status === 401 || status === 403) {
      toast.error("وارد حساب کاربری خود شوید !");
      redirect("/");
    }

    return <div>خطایی رخ داده است</div>;
  }
}

export default MyTours;

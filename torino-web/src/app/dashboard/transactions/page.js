import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/configs/api";

import TransactionPage from "@/components/templates/TransactionPage";
import ServerError from "@/components/modules/ServerError";

export const metadata = {
  title: "تراکنش‌ها",
  description: "مشاهده تاریخچه پرداخت‌ها و تراکنش‌های مالی",
};

async function Transactions() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      redirect("/");
    }
    const res = await api.get("user/transactions", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return <TransactionPage transactions={res?.data || []} />;
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

export default Transactions;

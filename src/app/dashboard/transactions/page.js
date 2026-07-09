import { cookies } from "next/headers";

import api from "@/configs/api";

import TransactionPage from "@/components/templates/TransactionPage";
import ServerError from "@/components/modules/ServerError";

async function Transactions() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await api.get("user/transactions", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return <TransactionPage transactions={res?.data} />;
  } catch (error) {
    const status = error?.response?.status;

    if (status >= 500) {
      return <ServerError />;
    }

    return <div>خطایی رخ داده است</div>;
  }
}

export default Transactions;

import { checkServerAuth } from "@/utils/auth-server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const { isLoggedIn, user } = await checkServerAuth();

  if (!isLoggedIn) {
    redirect("/");
  }

  return <>{children}</>;
}

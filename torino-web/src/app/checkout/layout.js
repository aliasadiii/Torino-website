import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function checkoutLayout({ children }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/");
  }

  return children;
}

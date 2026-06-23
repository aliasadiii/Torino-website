import { redirect } from "next/navigation";

function DashboardPage() {
  redirect("/dashboard/profile");
}

export default DashboardPage;

import ProfilePage from "@/components/templates/ProfilePage";
import { checkServerAuth } from "@/utils/auth-server";

export const metadata = {
  title: "پروفایل کاربری",
  description: "مشاهده و ویرایش اطلاعات حساب کاربری",
};

async function Profile() {
  const { user } = await checkServerAuth();

  return <ProfilePage user={user} />;
}

export default Profile;

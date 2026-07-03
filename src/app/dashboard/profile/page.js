import ProfilePage from "@/components/templates/ProfilePage";
import { checkServerAuth } from "@/utils/auth-server";

async function Profile() {
  const { user } = await checkServerAuth();

  return <ProfilePage user={user} />;
}

export default Profile;

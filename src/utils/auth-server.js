import api from "@/configs/api";
import { cookies } from "next/headers";
import { checkCookie } from "./check-cookie";

export async function checkServerAuth() {
  //check cookie for user access level
  const { isLoggedIn, error } = await checkCookie();

  if (!isLoggedIn) {
    return {
      isLoggedIn,
      user: null,
      error,
    };
  }

  if (isLoggedIn) {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
      //getting user profile
      const profileResponse = await api.get("user/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userProfile = profileResponse.data;
      return { isLoggedIn, user: userProfile };
    } catch (error) {
      //fallback for any reason
      return {
        isLoggedIn,
        user: null,
        error,
        message: "internal server error",
      };
    }
  }
}


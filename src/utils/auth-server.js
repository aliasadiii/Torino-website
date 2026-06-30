import api from "@/configs/api";
import { cookies } from "next/headers";

export async function checkServerAuth() {
  //getting tokens from cookie
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return {
      isLoggedIn: false,
      user: null,
    };
  }

  if (!accessToken && refreshToken) {
    try {
      //getting accessToken
      const refreshResponse = await api.post("auth/refresh-token", {
        refreshToken: refreshToken,
      });
      accessToken = refreshResponse.data.accessToken;

      if (accessToken) {
        //setting token
        const cookieStore = await cookies();
        cookieStore.set("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 1 * 60 * 60, // 1 hour
          path: "/",
        });

        //getting user profile
        const profileResponse = await api.get("user/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userProfile = profileResponse.data;

        return { isLoggedIn: true, user: userProfile };
      }
    } catch (error) {
      return {
        error: error.message,
        isLoggedIn: false,
        user: null,
      };
    }
  }

  if (accessToken) {
    try {
      //getting user profile and accessToken status check
      const profileResponse = await api.get("user/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userProfile = profileResponse.data;
      return {
        isLoggedIn: true,
        user: userProfile,
      };
    } catch (error) {
      //if accessToken wasn't valid (expired)
      // accessToken status check
      if (error?.response?.status === 401 && refreshToken) {
        try {
          //getting accessToken
          const refreshResponse = await api.post("auth/refresh-token", {
            refreshToken: refreshToken,
          });
          accessToken = refreshResponse.data.accessToken;

          if (accessToken) {
            //setting token
            const cookieStore = await cookies();
            cookieStore.set("accessToken", accessToken, {
              httpOnly: true,
              maxAge: 1 * 60 * 60, // 1 hour
              path: "/",
            });

            //getting user profile
            const profileResponse = await api.get("user/profile", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            const userProfile = profileResponse.data;

            return { isLoggedIn: true, user: userProfile };
          }
        } catch (error) {
          return {
            error: error.message,
            isLoggedIn: false,
            user: null,
          };
        }
      }
      return {
        error: error.message,
        isLoggedIn: false,
      };
    }
  }

  //fallback for any reason
  return { isLoggedIn: false, user: null };
}

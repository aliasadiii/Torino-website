import api from "@/configs/api";
import { cookies } from "next/headers";

export async function checkCookie() {
  //getting tokens from cookie
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return { isLoggedIn: false, error: "invalid access" };
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

        return { isLoggedIn: true, error: false };
      }
    } catch (error) {
      return {
        error: error.message,
        isLoggedIn: false,
      };
    }
  }

  if (accessToken) {
    try {
      //accessToken status check at server
      await api.get("user/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        isLoggedIn: true,
        error: false,
      };
    } catch (error) {
      //if accessToken wasn't valid (expired)
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

            return { isLoggedIn: true, error: false };
          }
        } catch (error) {
          return {
            error: error.message,
            isLoggedIn: false,
          };
        }
      }
      return {
        error: error.message,
        status: 500,
        message: "something went wrong",
      };
    }
  }
}

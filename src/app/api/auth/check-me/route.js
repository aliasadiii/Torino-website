import api from "@/configs/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  let accessToken = await request.cookies.get("accessToken")?.value;
  const refreshToken = await request.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json({
      isLoggedIn: false,
    });
  } else if (!accessToken && refreshToken) {
    try {
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

        return NextResponse.json({ isLoggedIn: true, user: userProfile });
      }
    } catch (error) {
      return NextResponse.json({
        error: error.message,
        isLoggedIn: false,
      });
    }
  } else if (accessToken) {
    try {
      //getting user profile
      const profileResponse = await api.get("user/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userProfile = profileResponse.data;

      return NextResponse.json({
        isLoggedIn: true,
        user: userProfile,
      });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
        isLoggedIn: false,
      });
    }
  }
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import api from "@/configs/api";
import { checkCookie } from "@/utils/check-cookie";

export async function PUT(req) {
  //check cookie for user access level
  const { isLoggedIn, error } = await checkCookie();

  if (!isLoggedIn) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized access",
      error,
    });
  }

  if (isLoggedIn) {
    try {
      //getting tokens from cookie
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
      //getting data from request
      const reqBody = await req.json();
      //sending data to api
      const userResponse = await api.put("user/profile", reqBody, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(userResponse.data);
      return NextResponse.json({
        status: 201,
        data: userResponse.data.user,
        message: userResponse.data.message,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        error: error.message,
        status: 500,
        message: "something went wrong",
      });
    }
  }
}

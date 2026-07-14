import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { checkCookie } from "@/utils/check-cookie";
import api from "@/configs/api";

export async function POST(req) {
  //check cookie for user access level
  const { isLoggedIn, error } = await checkCookie();

  if (!isLoggedIn) {
    return NextResponse.json(
      {
        isLoggedIn: false,
        message: "Unauthorized access",
        error,
      },
      { status: 401 },
    );
  }

  if (isLoggedIn) {
    try {
      //getting tokens from cookie
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;

      //getting data from request
      const reqBody = await req.json();
      console.log(reqBody);

      //sending data to api
      const res = await api.post("order", reqBody, {
        headers: { Authorization: `bearer ${accessToken}` },
      });

      return NextResponse.json(
        {
          res: res.data,
        },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "server side error",
          error: error.message,
        },
        { status: 500 },
      );
    }
  }
}

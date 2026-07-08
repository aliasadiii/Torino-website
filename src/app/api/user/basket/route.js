import api from "@/configs/api";
import { checkCookie } from "@/utils/check-cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req) {
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

      //getting tourId from request
      const { id } = await req.json();

      //sending tourId to api
      const res = await api.put(
        `basket/${id}`,
        {},
        {
          headers: { Authorization: `bearer ${accessToken}` },
        },
      );

      console.log(res.data);

      return NextResponse.json(
        {
          res: res.data,
        },
        { status: 201 },
      );
    } catch (error) {
      console.log(error);
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

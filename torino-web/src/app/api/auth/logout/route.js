import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  cookieStore.set("refreshToken", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({
    status: "success",
    message: "cookie deleted successfully",
  });
}

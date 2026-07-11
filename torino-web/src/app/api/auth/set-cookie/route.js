import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { accessToken, refreshToken } = await req.json();
  //set tokens in cookie
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1 * 60 * 60, // 1 hour
    path: "/",
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return NextResponse.json({ status: "success" });
}

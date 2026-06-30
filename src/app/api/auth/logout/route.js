import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const accessToken = await request.cookies.get("accessToken");
  const refreshToken = await request.cookies.get("refreshToken");
  const cookieStore = await cookies();

  if (accessToken) {
    cookieStore.delete(`accessToken`);
  }
  if (refreshToken) {
    cookieStore.delete(`refreshToken`);
  }
  return NextResponse.json({
    status: "success",
    message: "cookie deleted successfully",
  });
}

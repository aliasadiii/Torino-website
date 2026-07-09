import { checkServerAuth } from "@/utils/auth-server";
import { NextResponse } from "next/server";

export async function GET() {
  const authResult = await checkServerAuth();
  return NextResponse.json(authResult);
}

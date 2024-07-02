import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  // return NextResponse.redirect(new URL(RedirectToPage(user.data), req.url));
  return NextResponse.next();
}
import { NextResponse, NextRequest } from "next/server";
// import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
// import type { JWT } from 'next-auth/jwt';
// This function can be marked `async` if using `await` inside
export const config = {
  matcher: ["/admin-login", "/dashboard/:path*", "/sign-up", "/user/:path*"],
};
export async function middleware(request: NextRequest) {
  //   return NextResponse.redirect(new URL('/', request.url))
  const userData = request.cookies.get("userData");
  console.log(userData, "cookie", userData ? true : false);
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (token && url.pathname.startsWith("/admin-login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }
  if (
    userData &&
    (url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/admin-login"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    !userData &&
    (url.pathname.startsWith("/user/profile"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log(token, "not in if");
  return NextResponse.next();
  // return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more

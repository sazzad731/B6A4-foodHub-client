import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { TDecodedUser } from "@/types";

const PUBLIC_ROUTES = ["/", "/meals", "/login", "/register", "/providers"];
const ROLE_ROUTES = {
  CUSTOMER: ["/dashboard/cart", "/dashboard/checkout", "/dashboard/orders", "/dashboard/profile"],
  PROVIDER: ["/dashboard/menu", "/dashboard/orders", "/dashboard/profile"],
  ADMIN: ["/dashboard/users", "/dashboard/categories", "/dashboard/orders"],
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwtDecode<TDecodedUser>(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const isDashboardRoute = pathname.startsWith("/dashboard");
    if (!isDashboardRoute) {
      return NextResponse.next();
    }

    const userRole = decoded.role as keyof typeof ROLE_ROUTES;
    const allowedRoutes = ROLE_ROUTES[userRole] || [];

    const isAllowedRoute = allowedRoutes.some((route) =>
      pathname === route || pathname.startsWith(route + "/")
    ) || pathname === "/dashboard";

    if (!isAllowedRoute && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};

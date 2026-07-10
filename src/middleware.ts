import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PATHS = [
  "/dashboard",
  "/agenda",
  "/pacientes",
  "/especialistas-admin",
  "/servicios-admin",
  "/productos-admin",
  "/inventario",
  "/finanzas",
  "/reportes",
  "/configuracion",
];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminPath = ADMIN_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAdminPath && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (request.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/agenda/:path*",
    "/pacientes/:path*",
    "/especialistas-admin/:path*",
    "/servicios-admin/:path*",
    "/productos-admin/:path*",
    "/inventario/:path*",
    "/finanzas/:path*",
    "/reportes/:path*",
    "/configuracion/:path*",
    "/login",
  ],
};
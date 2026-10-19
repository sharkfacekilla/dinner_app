import { NextResponse, type NextRequest } from "next/server";

// Runs before every page request:
// 1. Builds a Content-Security-Policy with a fresh nonce, so only scripts Next.js itself
//    rendered for this request can run (blocks injected scripts).
// 2. Sends visitors without a session cookie to /login. This is only a convenience redirect;
//    the real check is requireUser() in the pages, data functions and server actions.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("session");

  if (!hasSession && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  // Behind the reverse proxy the original scheme arrives in x-forwarded-proto
  const isHttps =
    request.headers.get("x-forwarded-proto") === "https" || request.nextUrl.protocol === "https:";
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: data: blob:;
    font-src 'self';
    connect-src 'self'${isDev ? " ws:" : ""};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${isHttps ? "upgrade-insecure-requests;" : ""}
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

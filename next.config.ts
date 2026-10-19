import type { NextConfig } from "next";

const securityHeaders = [
  // Don't let browsers guess file types (stops some upload/script tricks)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Never allow the app inside someone else's iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Don't leak page URLs (which contain recipe ids) to image hosts
  { key: "Referrer-Policy", value: "no-referrer" },
  // Turn off browser features the app doesn't use; cooking mode needs the screen wake lock
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=(self)",
  },
  // Browsers only honour this over HTTPS; tells them to never use plain HTTP for this site
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "pg"],
  poweredByHeader: false, // don't advertise "X-Powered-By: Next.js"
  experimental: {
    // Photos are shrunk in the browser first (usually < 1 MB); the server accepts up to 8 MB
    // (lib/images.ts) plus room for the form overhead. Bigger requests are cut off while streaming.
    serverActions: { bodySizeLimit: "9mb" },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

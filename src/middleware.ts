import createMiddleware from "next-intl/middleware";

export const locales = ["fr", "en"] as const;

export default createMiddleware({
  locales,
  defaultLocale: "fr",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

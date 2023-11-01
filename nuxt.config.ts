export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      titleTemplate: "%s - Riya immobilier",
      htmlAttrs: {
        lang: "fr",
      },
      bodyAttrs: {
        "data-sidebar": "dark",
        "data-layout-mode": "light",
      },
      link: [
        { rel: "shortcut icon", href: "/images/favicon.ico" },
        {
          href: "/css/bootstrap.min.css",
          id: "bootstrap-style",
          rel: "stylesheet",
          type: "text/css",
        },
        { href: "/css/icons.min.css", rel: "stylesheet", type: "text/css" },
        { href: "/css/app.min.css", id: "app-style", rel: "stylesheet", type: "text/css" },
      ],
      script: [
        { src: "/libs/jquery/jquery.min.js", body: true },
        { src: "/libs/bootstrap/js/bootstrap.bundle.min.js", body: true },
        { src: "/libs/node-waves/waves.min.js", body: true },
        { src: "/js/app.js", body: true },
      ],
    },
  },
  runtimeConfig: {
    public: {},
  },
  modules: ["@pinia/nuxt", "nuxt-sanctum-auth", "@element-plus/nuxt", 'dayjs-nuxt'],
  dayjs: {
    locales: ['fr'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'fr',
  },
  nuxtSanctumAuth: {
    token: false,
    baseUrl: process.env.API_URL,
    endpoints: {
      csrf: "/sanctum/csrf-cookie",
      login: "/api/login",
      logout: "/api/logout",
      user: "/api/user",
    },
    csrf: {
      headerKey: "X-XSRF-TOKEN",
      cookieKey: "XSRF-TOKEN",
      tokenCookieKey: "nuxt-sanctum-auth-token",
    },
    redirects: {
      home: "/",
      login: "/login",
      logout: "/",
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: false,
  },
  serverHandlers: [
    { route: "/", handler: "~/server/middleware/requestLogger.ts" },
    { route: "/", handler: "~/server/middleware/secondLogger.ts" }
  ]
})

import { defineEventHandler } from "h3"
import winstonLogger from "~/composables/winstonLogger"

/**
 * seems to never run currently
 */
export default defineEventHandler((event) => {
    winstonLogger().debug("DOES THIS WORK??")
})

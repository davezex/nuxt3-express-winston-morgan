import winstonLogger from "~/composables/winstonLogger"
import { fromNodeMiddleware } from "h3"

export default fromNodeMiddleware ((req, res) => {
    // Run only at the start it seems
    winstonLogger().info(`fromNodeMiddleware: ${req.method} ${req.path} ${res.statusCode}`)
})

import express from "express"
import morgan from "morgan"
import winstonLogger from "~/composables/winstonLogger"
import * as fs from "fs"

/**
 * main logging middleware
 * added also to serverHandlers in nuxt config
 */
export default fromNodeMiddleware(() => {
    const app = express()
    const logger = winstonLogger()

    /**
     * creating morgan instance with a specific output message format
     * this does not output into a file
     */
    const morganFileInstance = morgan(
        ':method :url :status :res[content-length] - :response-time ms',
        { stream: fs.createWriteStream('./logs/morganLogs.log', { flags: 'a' } ) }
    )
    const morganConsoleInstance = morgan('MORGAN :method :url :status :res[content-length] - :response-time ms')
    app.use(morganFileInstance)
    app.use(morganConsoleInstance)

    app.all("*", (req, res) => {
        const method = req.method
        const statusCode = res.statusCode

        switch (method.toUpperCase()) {
            case "GET":
                logger.info(`Req: ${method} ${req.url}`)
                logger.info(`Res: ${statusCode}, ${res.req.path}, ${res.req.body}, ${res.req.method}`)
                break
            case "POST":
                logger.debug(`Req: ${method} ${req.url}`)
                logger.debug(`Res: ${statusCode}, ${res.json}`)
                break
            case "PUT":
                logger.warn(`Req: ${method} ${req.url}`)
                logger.warn(`Res: ${statusCode}, ${res.headersSent}, ${res.charset}`)
                break
            case "DELETE":
                logger.error(`Req: ${method} ${req.url}`)
                logger.error(`Res: ${statusCode}, ${res.headersSent}, ${res.charset}`)
                break
            default:
                logger.verbose(`Req: ${method} ${req.url}`)
                logger.verbose(`Res: ${statusCode}, ${res.headersSent}, ${res.charset}`)
        }

        res.end()
    })

    const PORT = 5000
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
})

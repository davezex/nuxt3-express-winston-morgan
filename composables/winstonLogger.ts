import { createLogger, format, transports, addColors } from "winston"

/**
 * creating winston logger instance
 */
export default function winstonLogger () {
    const loggerLevels = {
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6,
        },
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: "blue",
            verbose: "aqua",
            debug: 'magenta',
            silly: "pink"
        }
    }

    addColors(loggerLevels.colors)


    /**
     * output log format
     * how the output log should look, what it should contain
     */
    const loggerOutputFormat = format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.colorize({ all: true }),
        format.printf(({level, message, timestamp }) => {
            return `${timestamp} [${level}] - ${message}`
        }),
    )

    /**
     * where the logger should output the logs
     * currently set to display in console and files in the logs directory
     */
    const loggerTransports = [
        new transports.Console(),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new transports.File({ filename: 'logs/all.log' }),
    ]

    return createLogger({
        levels: loggerLevels.levels,
        format: loggerOutputFormat,
        transports: loggerTransports
    })
}
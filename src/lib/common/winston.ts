import { createLogger, format, transports } from "winston";
const { combine, timestamp,  printf, errors } = format;

import fs from "fs";
import path from "path";

const logDir = "log";
export const jsonLogDir = path.join(logDir, '/json.log');

const addTagsIfHasNot = format((info) => {
    info.tags = info.tags ?? [];
    return info;
});

const addOriginIfHasNot = format((info) => {
    info.origin = info.origin ?? null;
    return info;
});

if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}

const textFormat = combine(
    timestamp({format:"DD-MM-YYYY HH:mm:ss"}),
    errors({ stack: true }),
    addOriginIfHasNot(),
    printf(({ level, message, timestamp, stack, origin }) => {
        let header = (level != "info") ? `[${level.toUpperCase()}]: ` : '';
        let full = `${header}${message} [${origin}] (${timestamp})`;
        if (stack) {
            full += `
            ${stack}`
        };
        return full;
    })
)

const jsonFormat = combine(
    timestamp(),
    errors({ stack: true }),
    addTagsIfHasNot(),
    addOriginIfHasNot(),
    format.json()
)

const logger = createLogger({
    level: 'info',
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
        new transports.File({ filename: path.join(logDir, '/error.log'), level: 'error', format: textFormat }),
        new transports.File({ filename: path.join(logDir, '/all.log'), format: textFormat }),
        new transports.File({ filename: jsonLogDir, format: jsonFormat})
    ],
});

export default logger;

export type Log = {level: string, timestamp: string, message: string, tags: string[], origin: string | null, cause?: {code: string}};